import { StatusCodes } from "http-status-codes";

import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config({ path: `../.env` });
//UTILS
import { compare } from "../utils/bcrypt.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

import { getFromCache } from "../middleware/cache.js";
import { Users, RefreshToken } from "../models/index.js";

export default {
	/*
	 * @auth
	 * @public
	 * @method POST
	 * @work login
	 */
	login: async (req, res) => {
		const myInfo = await Users.findOne({
			attributes: ["id", "password"],
			where: { user_name: req.body.user_name.trim() },
		});
		if (!myInfo) throw Error("اسم المستخدم غير صحيح");

		const validPassword = await compare(req.body.password, myInfo.password);
		if (!validPassword) throw Error("كلمة المرور غير صحيحة ");

		let deviceId = uuidv4();
		let token = generateToken(
			{
				userId: myInfo.id,
				deviceId,
			},
			process.env.TOKEN_SECRET_KEY,
			process.env.TOKEN_EXPIRES_IN
		);
		const refreshToken = generateToken(
			{
				userId: myInfo.id,
				deviceId,
			},
			process.env.REFRESH_TOKEN_SECRET_KEY,
			process.env.REFRESH_TOKEN_EXPIRES_IN
		);

		await RefreshToken.create({
			u_id: myInfo.id,
			refresh_token: refreshToken,
			deviceId,
			ip: req.ip,
		});
		res.status(StatusCodes.OK).json({
			success: true,
			data: {
				token,
				refreshToken,
			},
		});
	},

	singUp: async (req, res) => {
		let myInfo = await Users.findOne({
			attributes: ["id", "password"],
			where: { user_name: req.body.user_name.trim() },
		});
		if (myInfo) throw Error("اسم المستخدم موجود سابقا");
		let deviceId = uuidv4();
		myInfo = await Users.create({ ...req.body });
		let token = generateToken(
			{
				userId: myInfo.id,
				deviceId,
			},
			process.env.TOKEN_SECRET_KEY,
			process.env.TOKEN_EXPIRES_IN
		);
		const refreshToken = generateToken(
			{
				userId: myInfo.id,
				deviceId,
			},
			process.env.REFRESH_TOKEN_SECRET_KEY,
			process.env.REFRESH_TOKEN_EXPIRES_IN
		);

		await RefreshToken.create({
			u_id: myInfo.id,
			refresh_token: refreshToken,
			deviceId,
			ip: req.ip,
		});
		res.status(StatusCodes.OK).json({
			success: true,
			data: {
				token,
				refreshToken,
			},
		});
	},
	/*
	 * @auth
	 * @public
	 * @method GET
	 * @work logout
	 */
	logout: async (req, res) => {
		RefreshToken.destroy({
			force: true,
			where: { u_id: req.user.id, deviceId: req.user.deviceId.trim() },
		});
		res.status(StatusCodes.OK).json({
			success: true,
			msg: "تم تسجيل الخروج بنجاح ",
		});
	},
	/*
	 * @auth
	 * @public
	 * @method PUT
	 * @work refresh token
	 */
	refreshToken: async (req, res) => {
		let { refreshToken } = req.body;
		if (!refreshToken) throw Error("حقل التوكين مطلوب");

		let decodedToken = verifyToken(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET_KEY
		);

		if (
			!decodedToken ||
			getFromCache(`refreshTokenNotValid_${decodedToken.userId}`)
		)
			throw Error("forbidden token");

		//! permission
		const myInfo = await Users.findOne({
			attributes: ["id"],
			where: { id: decodedToken.userId },
		});
		if (!myInfo)
			throw new Error("user is not found , please re sign up and try again ");
		let deviceId = uuidv4();
		let token = generateToken(
			{
				userId: myInfo.id,
				deviceId,
			},
			process.env.TOKEN_SECRET_KEY,
			process.env.TOKEN_EXPIRES_IN
		);
		const newRefreshToken = generateToken(
			{
				userId: myInfo.id,
				deviceId,
			},
			process.env.REFRESH_TOKEN_SECRET_KEY,
			process.env.REFRESH_TOKEN_EXPIRES_IN
		);

		await RefreshToken.destroy({
			where: { u_id: myInfo.id, deviceId: decodedToken.deviceId },
		});
		await RefreshToken.create({
			u_id: myInfo.id,
			refresh_token: refreshToken,
			deviceId,
			ip: req.ip,
		});

		res.status(StatusCodes.OK).json({
			success: true,
			data: {
				token,
				refreshToken: newRefreshToken,
			},
		});
	},
};

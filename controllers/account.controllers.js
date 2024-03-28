import { StatusCodes } from "http-status-codes";

import { Op } from "sequelize";
import _ from "lodash";

import useragent from "useragent";
// import sharp

//UTILS
import { compare } from "../utils/bcrypt.js";
//MODELS
//CONTROLLER
import Users from "../models/user.model.js";
import fileProcessing from "../utils/fileprocissing.js";

export default {
	/*
	 * @account
	 * @private
	 * @method GET
	 * @work get profile
	 */
	getProfile: async (req, res) => {
  

		let response = await Users.findOne({
			attributes: {
				exclude: ["updatedAt", "password"],
			},
			raw: true,
			where: {
				id: req.user.id,
			},
		});
        if(!response)
        throw new Error("الحساب غير موجود")

		if (response.avatar) {
			const imageName = response.avatar.split(".")[0];
			response.avatar = {
				path: `${process.env.LINK}/images/${response.avatar}`,
				compressed: `${process.env.LINK}/images/${imageName}_comp.webp`,
			};
		}

		res.status(StatusCodes.OK).json({
			success: true,
			data: {
				...response,
			},
		});
	},

	/*
	 * @account
	 * @private
	 * @method PUT
	 * @work update my profile
	 */
	update: async (req, res) => {
		let user = await Users.findOne({
			attributes: ["id"],
			where: {
				id: { [Op.ne]: req.user.id },
				user_name: req.body.user_name.trim(),
			},
			paranoid: false,
		});
		if (user) throw Error("اسم المستخدم موجود سابقا");

		await Users.update({ ...req.body }, { where: { id: req.user.id } });

		res
			.status(StatusCodes.OK)
			.json({ success: true, message: "تمت عملية التعديل بنجاح" });
	},
	 
	/*
	 * @account
	 * @public
	 * @method PUT
	 * @work change password
	 */
	changePassword: async (req, res) => {
		if (req.body.password == req.body.newPassword)
			throw Error("الرجاء ادخال كلمة مرور مختلفة عن الكلمة السابقة ");
		let userInfo = await Users.findOne({
			where: {
				id: req.user.id,
			},
		});
		const validPassword = await compare(req.body.password, userInfo.password);

		if (!validPassword) {
			throw Error("كلمة المرور غير صحيحة ");
		}

		userInfo.password = req.body.newPassword;
		userInfo.save();
		res.status(StatusCodes.OK).json({ success: true,message:"تمت عملية التعديل بنجاح" });
	},

	/*
	 * @category admins
	 * private admin
	 * @method DELETE
	 * @work delete category
	 */

	upload: async (req, res) => {
		if (req.files) throw new Error("الملف المرفع يحتوي نسق غير صحيح");
		if (!req.file) throw new Error("الملف غير صحيح");

		let userInfo = await Users.findOne({
			raw: true,
			attributes: ["avatar"],
			where: { id: req.user.id },
		});

		let result = await fileProcessing.fileSave([req.file]).then((file) => {
			return {
				file_name: file[0].file_name,
				originalname: file[0].originalname,
			};
		});
		const imageName = result.file_name.split(".")[0];
		let avatars = {
			path: `${process.env.LINK}/images/${result.file_name}`,
			compressed: `${process.env.LINK}/images/${imageName}_comp.webp`,
		};

		await fileProcessing.deleteFile(userInfo.avatar);
		await Users.update(
			{ avatar: result.file_name },
			{ where: { id: req.user.id } }
		);
		res.status(StatusCodes.OK).send({
			success: true,
			links: avatars,
			msg: "تمت عملية الرفع بنجاح",
		});
	},
	/*
	 * @category admins
	 * private admin
	 * @method DELETE
	 * @work delete category
	 */
	deleteImage: async (req, res) => {
		let userInfo = await Users.findOne({
			raw: true,
			attributes: ["avatar"],
			where: { id: req.user.id },
		});
		if (!userInfo) throw new Error("الصورة المدخلة غير موجودة");

		await fileProcessing.deleteFile(userInfo.avatar);
		await Users.update({ avatar: "" }, { where: { id: req.user.id } });

		res.status(StatusCodes.OK).send({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},
	deleteAccount: async (req, res) => {
		let result = await Users.destroy({ where: { id: req.user.id } });
		if (result == 0) throw new Error("الحساب المختار غير موجود");
		res.status(StatusCodes.OK).send({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},
};

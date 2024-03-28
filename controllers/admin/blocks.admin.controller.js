import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import { Blocks, RoadMaps } from "../../models/index.js";
import { Op } from "sequelize";
import fileProcessing from "../../utils/fileprocissing.js";

import BlockImages from "../../models/block_Images.model.js";
export default {
	/*
	 * @category admins
	 * private admin
	 * @method POST
	 * @work create category
	 */
	create: async (req, res, next) => {
		if (
			!(await RoadMaps.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.body.road_map_id, sharedBy: req.user.id },
			}))
		)
			throw new Error("رقم المسار المدخل غير صحيح");

		let check = await Blocks.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				name: req.body.name.trim(),
				road_map_id: req.body.road_map_id,
			},
		});
		if (check) throw new Error("الاسم موجود من قبل ل نفس المسار");

		await Blocks.create({
			...req.body,
			resources: JSON.stringify(req.body.resources),
		});
		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: "تمت عملية الانشاء بنجاح",
		});
	},
	/*
	 * @category admins
	 * private admin
	 * @method PUT
	 * @work update category
	 */

	update: async (req, res) => {
		if (
			!(await RoadMaps.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.body.road_map_id, sharedBy: req.user.id },
			}))
		)
			throw new Error("رقم المسار المدخل غير صحيح");
		if (
			!(await Blocks.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.params.id },
			}))
		)
			throw new Error("رقم المدخل غير صحيح");

		let check = await Blocks.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				name: req.body.name.trim(),
				id: { [Op.not]: req.params.id },
			},
			include: [
				{
					model: RoadMaps,
					required: true,
					attributes: [],
					as:"block_info",
					where: { sharedBy: req.user.id },
				},
			],
		});
		if (check) throw new Error("الاسم موجود من قبل");

		await Blocks.update(
			{ ...req.body, resources: JSON.stringify(req.body.resources) },
			{
				where: { id: req.params.id },
			}
		);
		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: "تمت العملية بنجاح",
		});
	},
	/*
	 * @category admins
	 * private admin
	 * @method DELETE
	 * @work delete category
	 */

	remove: async (req, res) => {
		let check = await Blocks.findOne({
			raw: true,
			attributes: ["id"],
			where: { id: req.params.id },
			nest: true,
		});

		if (!check) throw new Error("الرقم المدخل غير موجود");

		await Blocks.destroy({ where: { id: req.params.id } });

		res.status(StatusCodes.OK).json({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},

	getAll: async (req, res) => {
		if (
			!(await RoadMaps.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.params.id, sharedBy: req.user.id },
			}))
		)
			throw new Error("رقم المسار المدخل غير صحيح");
		let response = await Blocks.findAll({
			raw: true,
			attributes: { exclude: ["updatedAt"] },
			include: [
				{
					model: RoadMaps,
					required: true,
					attributes: [],
					as: "block_info",
					where: { sharedBy: req.user.id },
				},
			],
			nest: true,
			where: { road_map_id: req.params.id },
		});
		response = response.map((item) => {
		///	console.log(item);
			return {
				...item,
				resources: JSON.parse(item.resources),
			};
		});
		res.status(StatusCodes.OK).json({
			success: true,
			data: response,
		});
	},

	/*
	 * @category admins
	 * private admin
	 * @method DELETE
	 * @work delete category
	 */

	upload: async (req, res) => {
		if (!req.files) throw new Error("الملف المرفع يحتوي نسق غير صحيح");

		if (
			!(await Blocks.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.params.id },
			}))
		)
			throw new Error("رقم المدخل  غير صحيح");

		let imagesBulk = [];
		await Promise.all(
			req.files.map(async (file) => {
				await fileProcessing.fileSave([file]).then((file) => {
					imagesBulk.push({
						file_name: file[0].file_name,
						originalname: file[0].originalname,
						block_id: req.params.id,
					});
				});
			})
		);
		await BlockImages.bulkCreate(imagesBulk);

		res.status(StatusCodes.OK).send({
			success: true,
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
		let check = await BlockImages.findOne({
			raw: true,
			attributes: ["file_name"],
			where: { id: req.params.id },
		});
		if (!check) throw new Error("الصورة المدخلة غير صحيح");

		await fileProcessing.deleteFile(check.file_name);
		await BlockImages.destroy({
			where: { id: req.params.id },
		});
		// await emptyRedis();
		res.status(StatusCodes.OK).send({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},
};

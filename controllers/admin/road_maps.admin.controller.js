import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import { Categories, RoadMaps } from "../../models/index.js";
import { Op } from "sequelize";
export default {
	/*
	 * @category admins
	 * private admin
	 * @method POST
	 * @work create category
	 */
	create: async (req, res, next) => {
		if (
			!(await Categories.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.body.category },
			}))
		)
			throw new Error("رقم الصنف المدخل غير صحيح");

		let check = await RoadMaps.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				name: req.body.name.trim(),
				sharedBy: req.user.id,
			},
		});
		if (check) throw new Error("الاسم موجود من قبل");

		await RoadMaps.create({ ...req.body, sharedBy: req.user.id });
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
				where: { id: req.params.id },
			}))
		)
			throw new Error("رقم المدخل غير صحيح");
		if (
			!(await Categories.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.body.category },
			}))
		)
			throw new Error("رقم الصنف المدخل غير صحيح");

		let check = await RoadMaps.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				name: req.body.name.trim(),
				id: { [Op.not]: req.params.id },
				sharedBy: req.user.id,
			},
		});
		if (check) throw new Error("الاسم موجود من قبل");

		await RoadMaps.update(
			{ ...req.body },
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
		let check = await RoadMaps.findOne({
			raw: true,
			attributes: ["id"],
			where: { id: req.params.id },
			nest: true,
		});

		if (!check) throw new Error("المشروع المختار غير موجود");

		await RoadMaps.destroy({ where: { id: req.params.id } });

		res.status(StatusCodes.OK).json({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},
	getAll: async (req, res) => {
		let check = await RoadMaps.findAll({
			raw: true,
			attributes: { exclude: ["sharedBy", "updatedAt", "category"] },
			include: [
				{
					model: Categories,
					required: true,
					as: "categoryInfo",
					attributes: { exclude: ["createdAt"] },
				},
			],
			where: { sharedBy: req.user.id },
			nest: true,
		});
		res.status(StatusCodes.OK).json({
			success: true,
			data: check,
		});
	},
};

import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { Blocks, Categories, RoadMaps, Users } from "../models/index.js";

export default {
	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */
	categories: async (req, res) => {
		let response = await Categories.findAll({
			raw: true,
			nest: true,
			attributes: { exclude: ["createdAt"] },
		});
		res.status(StatusCodes.OK).send({
			success: true,
			data: response,
		});
	},

	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */

	getUserProfile: async (req, res) => {
		let response = await Users.findOne({
			attributes: {
				exclude: ["updatedAt", "password"],
			},
			raw: true,
			where: {
				user_name: req.params.user_name.trim(),
			},
		});
		if (!response) throw new Error("الحساب غير موجود");

		if (response.avatar) {
			const imageName = response.avatar.split(".")[0];
			response.avatar = {
				path: `${process.env.LINK}/images/${response.avatar}`,
				compressed: `${process.env.LINK}/images/${imageName}_comp.webp`,
			};
		}
		let road_maps = await RoadMaps.findAll({
			raw: true,
			nest: true,
			attributes: { exclude: ["sharedBy", "category"] },
			include: [
				{
					model: Blocks,
					as: "road_map_blocks",
					required: true,
					attributes: { exclude: ["road_map_id"] },
				},
				{
					model: Categories,
					as: "categoryInfo",
					required: true,
					attributes: { exclude: ["createdAt"] },
				},
			],
			where: { sharedBy: response.id },
		});
		road_maps = road_maps.map((item) => {
			return {
				...item,
				road_map_blocks: {
					...item.road_map_blocks,
					resources: JSON.parse(item.road_map_blocks.resources),
				},
			};
		});

		const mergedRoadMaps = road_maps.reduce((acc, curr) => {
			const existingRoadMap = acc.find((item) => item.id === curr.id);

			if (!existingRoadMap)
				acc.push({
					..._.omit(curr, ["road_map_blocks"]),
					blocks: [curr.road_map_blocks],
				});
			else existingRoadMap.blocks.push(curr.road_map_blocks);

			return acc;
		}, []);
		res.status(StatusCodes.OK).json({
			success: true,
			data: {
				...response,
				road_maps: mergedRoadMaps,
			},
		});
	},
	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */
	getAllRoadMaps: async (req, res) => {
		let whereContent = {};
		if (req.query.search) {
			let search = req.query.search.trim();
			whereContent = {
				[Op.or]: [
					{
						name: {
							[Op.like]: `%${search}%`,
						},
					},
					{
						description: {
							[Op.like]: `%${search}%`,
						},
					},
				],
			};
		}
		let { page, size, category } = req.query;

		if (category) {
			if (
				!(await Categories.findOne({
					raw: true,
					attributes: ["id"],
					where: { id: category },
				}))
			)
				throw new Error("رقم التصنيف غير صحيح");
			whereContent.category = category;
		}

		let { count, rows } = await RoadMaps.findAndCountAll({
			limit: +size,
			offset: (+page - 1) * +size,
			raw: true,
			nest: true,
			attributes: { exclude: ["sharedBy", "category"] },
			include: [
				{
					model: Categories,
					as: "categoryInfo",
					required: true,
					attributes: { exclude: ["createdAt"] },
				},
			],

			where: {
				...whereContent,
			},
		});

		rows = await Promise.all(
			rows.map(async (item) => {
				let road_map_blocks = await Blocks.findAll({
					raw: true,
					nest: true,
					attributes: { exclude: ["road_map_id"] },
					where: { road_map_id: item.id },
				});

				let blocks = road_map_blocks.map((item) => {
					return {
						...item,
						resources: JSON.parse(item.resources),
					};
				});
				return {
					...item,
					blocks,
				};
			})
		);

		let response = {
			success: true,
			data: {
				data: rows,
				current_page: +page,
				last_page:
					Math.round(count / +size) === 0 ? 1 : Math.round(count / +size),
				per_page: +size,
				prev_page: +page == 1 ? null : +page - 1,
				total: count,
			},
		};
		res.status(StatusCodes.OK).send(response);
	},
};

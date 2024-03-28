import Joi from "joi";  

import { getErrorMessages, message } from "../../utils/getMessageError.js";
 

import detectBad from "../../utils/modifyText/detectBad.js";
import { getRegular } from "../../utils/regularExpression.js";
export const schema = {
	body: {
		update: Joi.object({
			name: Joi.string()
				.required()
				.min(2)
				.max(50)
				.trim()
				.messages(getErrorMessages("name"))
				.custom((value, helpers) => {
					let checkResult = detectBad(value);
					if (checkResult === "error") return helpers.message(message);
					else return checkResult;
				}),

			user_name: Joi.string()
				.trim()
				.pattern(getRegular("username"))
				.min(3)
				.max(30)
				.required()
				.messages(getErrorMessages("user_name"))
				.custom((value, helpers) => {
					let checkResult = detectBad(value);
					if (checkResult === "error") return helpers.message(message);
					else return checkResult;
				}),
		}),

		changePassword: Joi.object({
			password: Joi.string()
				.required()
				.min(8)
				.max(50)
				.messages(getErrorMessages("password"))
				.custom((value, helpers) => {
					let checkResult = detectBad(value);
					if (checkResult === "error") return helpers.message(message);
					else return checkResult;
				}),
			newPassword: Joi.string()
				.required()
				.min(8)
				.max(50)
				.messages(getErrorMessages("newPassword"))
				.custom((value, helpers) => {
					let checkResult = detectBad(value);
					if (checkResult === "error") return helpers.message(message);
					else return checkResult;
				}),
		}),
	},
	query: {
		limit: Joi.object({
			size: Joi.number().integer().required().min(1).max(1e3),

			page: Joi.number().integer().required().min(1).max(1e4),
		}),
	},	params: Joi.object({
		id: Joi.number().integer().required().min(1).max(1e7),
	}),
	query: Joi.object({}),
	empty: Joi.object({}),
};

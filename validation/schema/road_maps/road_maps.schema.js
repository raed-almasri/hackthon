import Joi from "joi";

import detectBad from "../../../utils/modifyText/detectBad.js";
import { getErrorMessages, message } from "../../../utils/getMessageError.js";

export const schema = {
		body: Joi.object({
		name: Joi.string()
			.trim()
			.min(3)
			.max(250)
			.required()
			.messages(getErrorMessages("name"))
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		description: Joi.string()
			.trim()
			.min(3)
			.max(500)
			.required()
			.messages(getErrorMessages("description"))
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}), 
		category: Joi.number().integer().required().min(1).max(1e7),
	}),
	params: Joi.object({
		id: Joi.number().integer().required().min(1).max(1e7),
	}),
	query: Joi.object({}),
	empty: Joi.object({}),
};

import Joi from "joi";

import detectBad from "../../utils/modifyText/detectBad.js";
import { getRegular } from "../../utils/regularExpression.js";
import { getErrorMessages, message } from "../../utils/getMessageError.js";
export const schema = {
	logIn: Joi.object({
		user_name: Joi.string()
			.trim()
			.min(3)
			.max(50)
			.required()
			.messages(getErrorMessages("user_name"))
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		password: Joi.string()
			.min(8)
			.max(50)
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			})
			.messages(getErrorMessages("password")),
	}),
	signUp: Joi.object({
		name: Joi.string()
			.trim()
			.min(3)
			.max(50)
			.required()
			.messages(getErrorMessages("name"))
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		user_name: Joi.string()
			.trim()
			.min(3)
			.max(50)
			.required()
			.messages(getErrorMessages("user_name"))
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		password: Joi.string()
			.min(8)
			.max(50)
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			})
			.messages(getErrorMessages("password")),
	}),
};

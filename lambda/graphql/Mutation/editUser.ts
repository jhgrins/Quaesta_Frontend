import CryptoJS from "crypto-js";

import { UserInputError } from "apollo-server-errors";

import { getItemFromDynamoDBResult, getItemsByIndex, updateItem } from "../../db";
import { Context } from "../index";
import { checkIsLoggedIn } from "../utils";

interface Args {
	type: string;
	value: string;
}

const editUser = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	if (args.type === "email") {
		await validateEmail(args.value);
	}
	if (args.type === "username") {
		await validateUsername(args.value);
	}
	if (args.type === "password") {
		args.value = CryptoJS.AES.encrypt(
			args.value,
			(process.env.PASSWORD_KEY as string) || "PASSWORD"
		).toString();
	}
	const queryOutput = await updateItem(
		"users",
		context.userId as string,
		args.type,
		args.value
	);
	return getItemFromDynamoDBResult(queryOutput);
};

const validateEmail = async (email: string) => {
	const queryOutput = await getItemsByIndex("users", "email", email);
	if (queryOutput.Count && queryOutput.Count > 0) {
		throw new UserInputError("User Already Exists");
	}
};

const validateUsername = async (username: string) => {
	if (username.length > 12) {
		throw new UserInputError("Username Longer Than 12 Characters");
	}
	const queryOutput = await getItemsByIndex("users", "username", username);
	if (queryOutput.Count && queryOutput.Count > 0) {
		throw new UserInputError("User Already Exists");
	}
};

export default editUser;

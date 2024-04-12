import { ERROR_TYPE } from "../../types/Errors";

export const permissionError: ERROR_TYPE = {code: 403, message:"User not perrmision"};

export const loginError: ERROR_TYPE = {code: 401, message:"Bad credentials"};

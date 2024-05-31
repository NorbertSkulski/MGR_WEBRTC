export const permissionError = { code: 403, message: "User not perrmision" };
export const loginError = { code: 401, message: "Bad credentials" };
export const requerstError = (err) => ({ code: 500, message: err });

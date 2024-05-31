function checkIsUser(user) {
    return Boolean(user) && Boolean(user.uuid);
}
export { checkIsUser };

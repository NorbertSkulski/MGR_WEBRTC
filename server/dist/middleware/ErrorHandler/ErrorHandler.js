export const ErrorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    if (!err) {
        next();
    }
    res.status(err.code).json(err.message);
};

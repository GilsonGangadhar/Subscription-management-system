const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };

    error.message = err.message;
    console.log(err);

    // objectId error
    if (err.name === "CastError") {
      const message = "Resource not found";

      error = new Error(message);
      error.statusCode = 404;
    }

    // duplicate key error
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    //validation error
    if (err.name === "ValidationError") {
      const message = Object.keys(err.errors).map((er) => er.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Server Error" });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;

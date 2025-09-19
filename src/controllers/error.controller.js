import { ApiError } from "../utility/apiError.js";

// DB error handlers
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ApiError(400, message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue ? JSON.stringify(err.keyValue) : "duplicate value";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ApiError(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors || {}).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(400, message);
};

// JWT errors
const handleJWTError = () => new ApiError(401, "Invalid token. Please log in again!");
const handleJWTExpiredError = () => new ApiError(401, "Your token has expired! Please log in again!");
const handleExistingError = () => new ApiError(400, "Data already exists. Please try again with different data.");

// Send error for development
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.statusCode < 500 ? "fail" : "error",
      success: false,
      message: err.message,
      errors: err.errors || [],
      stack: err.stack,
    });
  }

  console.error(err);
  res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

// Send error for production
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.statusCode < 500 ? "fail" : "error",
        success: false,
        message: err.message,
      });
    }

    console.error("ERROR 💥", err);
    return res.status(500).json({
      status: "error",
      success: false,
      message: "Something went very wrong!",
    });
  }

  // Rendered website
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }

  console.error("ERROR 💥", err);
  res.status(500).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

// Main error middleware
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.isOperational = err.isOperational !== undefined ? err.isOperational : false;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.name === "ExistingError") error = handleExistingError();

    sendErrorProd(error, req, res);
  }
};

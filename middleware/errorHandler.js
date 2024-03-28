import { StatusCodes } from "http-status-codes";
export let errorHandler = (error, req, res, next) => {
  
    let statusCode = error.statusCode || StatusCodes.BAD_REQUEST;
    let errorMessage = error.message || "Internal Server Error"; 
    // Send the error response to the client
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export const sendSuccess = (res, data, message = 'success', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message: message,
        total: Array.isArray(data) ? data.length : 1,
        data: data
    });
};

export const sendError = (res, message = 'error', statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message: message,
        total: 0,
        data: []
    });
};
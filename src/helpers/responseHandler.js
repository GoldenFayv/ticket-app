export const successResponse = (
  response,
  message,
  data = null,
  statusCode = 200,
) => {
  return response.status(statusCode).json({
    status: "__ok__",
    message,
    data,
  });
};

export const failureResponse = (
  response,
  message,
  errors = null,
  statusCode = 400,
) => {
  return response.status(statusCode).json({
    status: "__error__",
    message,
    errors,
  });
};

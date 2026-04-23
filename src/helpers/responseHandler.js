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

export const validationErrorResponse = (
  response,
  error,
  message = "Validation failed",
) => {
  const issues = error?.issues ?? error?.errors ?? [];

  return response.status(422).json({
    status: "__validationError__",
    message,
    errors: issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    })),
  });
};

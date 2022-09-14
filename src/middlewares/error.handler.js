const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      statusCode: err.output.statusCode,
      error: {
        name: err.output.payload.error,
        msg: err.output.payload.message,
        detail: err.data ? err.data.message : null,
      },
      data: null,
    });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    error: {
      name: err.name,
      msg: err.message,
      detail: err.parent ? err.parent.detail : null,
    },
    data: null,
  });
};
export { logErrors, boomErrorHandler, errorHandler };

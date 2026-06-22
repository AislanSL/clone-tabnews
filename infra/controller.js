import {
  InternalServerError,
  MethodNotAllwedError,
  ValidationError,
  NotFoundError
} from "./errors";

function onNoMatchHandle(request, response) {
  const publicErrorObject = new MethodNotAllwedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandle(error, request, response) {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.error(publicErrorObject);
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandle,
    onError: onErrorHandle,
  },
};

export default controller;

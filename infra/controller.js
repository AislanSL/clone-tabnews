import { InternalServerError, MethodNotAllwedError } from "./errors";

function onNoMatchHandle(request, response) {
  const publicErrorObject = new MethodNotAllwedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandle(error, request, response) {
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

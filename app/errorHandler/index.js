import {
    NotFoundException,
    UnAuthorizedException,
    ValidationException,
    ModelNotFoundException,
    UnAuthenticatedException
} from "../../app/exceptions";

import { HTTP_INTERNAL_SERVER_ERROR } from "../../constants/HttpCode"

const errorHandler = (error, req, res, next) => {
    error.message = error.message;
    if (
        error instanceof NotFoundException ||
        error instanceof ModelNotFoundException
    ) {
        res.status(error.status || HTTP_NOT_FOUND).json({
            message: error.message,
        });

        return;
    }

    if (error instanceof ValidationException) {
        res.status(error.status || HTTP_UNPROCESSABLE_ENTITY).json({
            errors: error.errors,
            message: error.message,
        });

        return;
    }

    if (error instanceof UnAuthorizedException) {
        res.status(error.status || HTTP_UNAUTHORIZED).json({
            message: error.message,
        });

        return;
    }

    if (error instanceof UnAuthenticatedException) {
        res.status(error.status || 403).json({
            message: error.message,
        });

        return;
    }
    res.status(error.status || HTTP_INTERNAL_SERVER_ERROR).json({
        message: error.message,
        errors: error,
    });
};

export default errorHandler;
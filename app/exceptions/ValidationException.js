import { HTTP_UNPROCESSABLE_ENTITY } from "../../constants/HttpCode"

export default class ValidationException extends Error {
    constructor(errors) {
        super("Validation errors.")

        this.status = HTTP_UNPROCESSABLE_ENTITY
        this.errors = errors
    }
}
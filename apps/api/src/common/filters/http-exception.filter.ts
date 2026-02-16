import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { ApiResponse } from "@best-mono/shared";

type ExceptionResponseBody = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

function isExceptionResponseBody(
  value: unknown,
): value is ExceptionResponseBody {
  return typeof value === "object" && value !== null;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      let message: string | undefined;

      if (typeof exceptionResponse === "string") {
        message = exceptionResponse;
      } else if (isExceptionResponseBody(exceptionResponse)) {
        const rawMessage = exceptionResponse.message;

        if (Array.isArray(rawMessage)) {
          message = rawMessage.join(", ");
        } else {
          message = rawMessage;
        }
      }

      const body: ApiResponse<null> = {
        success: false,
        code: HttpStatus[status] ?? "ERROR",
        message,
      };

      return response.status(status).json(body);
    }

    const body: ApiResponse<null> = {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Unexpected error occurred",
    };

    return response.status(500).json(body);
  }
}

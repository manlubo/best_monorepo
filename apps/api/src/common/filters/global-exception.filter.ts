import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";

import {
  ApiResponse,
  AppException,
  getHttpStatus,
  ErrorCode,
} from "@best-mono/shared";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof AppException) {
      const status = getHttpStatus(exception.code);

      const body: ApiResponse<null> = {
        success: false,
        code: exception.code,
        message: exception.message,
      };

      return response.status(status).json(body);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      const body: ApiResponse<null> = {
        success: false,
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: exception.message,
      };

      return response.status(status).json(body);
    }

    const body: ApiResponse<null> = {
      success: false,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: "Unexpected error occurred",
    };

    return response.status(500).json(body);
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, map } from "rxjs";

import {
  ApiResponse,
  SuccessStatusMap,
  SuccessCode,
  isApiResponse,
} from "@best-mono/shared";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const http = context.switchToHttp();
    const response = http.getResponse();

    return next.handle().pipe(
      map((data) => {
        if (isApiResponse<T>(data)) {
          return data;
        }

        const status = response.statusCode;

        const code = SuccessStatusMap[status] ?? SuccessCode.OK;

        return {
          success: true,
          code,
          data,
        };
      }),
    );
  }
}

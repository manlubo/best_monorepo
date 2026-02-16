import { Controller, Get } from "@nestjs/common";
import type { HealthResponse } from "@best-mono/shared";
import { AppException, ErrorCode } from "@best-mono/shared";

@Controller()
export class AppController {
  @Get("health")
  health(): HealthResponse {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("error")
  error() {
    throw new AppException(ErrorCode.BAD_REQUEST, "잘못된 요청입니다.");
  }
}

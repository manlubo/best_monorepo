import { Controller, Get } from "@nestjs/common";
import type { HealthResponse } from "@best-mono/shared";
import { AppException, ErrorCode } from "@best-mono/shared";
import { AppService } from "@/app.service";

@Controller({ version: "1" })
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("health")
  health(): HealthResponse {
    return this.appService.health();
  }

  @Get("error")
  error() {
    throw new AppException(ErrorCode.BAD_REQUEST, "잘못된 요청입니다.");
  }
}

import { Controller, Get } from "@nestjs/common";
import type { ApiResponse, HealthResponse } from "@best-mono/shared";

@Controller()
export class AppController {
  @Get("health")
  health(): ApiResponse<HealthResponse> {
    return {
      success: true,
      code: "OK",
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    };
  }
}

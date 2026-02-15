import { Controller, Get } from "@nestjs/common";
import { HealthResponse } from "@best-mono/shared";

@Controller()
export class AppController {
  @Get("health")
  health(): HealthResponse {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}

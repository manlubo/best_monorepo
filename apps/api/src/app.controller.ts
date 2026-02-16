import { Controller, Get, NotFoundException } from "@nestjs/common";
import type { HealthResponse } from "@best-mono/shared";

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
    throw new NotFoundException("User not found");
  }
}

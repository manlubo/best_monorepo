import { HealthResponse } from "@best-mono/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  health(): HealthResponse {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}

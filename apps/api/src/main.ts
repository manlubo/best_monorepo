import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { ResponseInterceptor } from "@/common/interceptors/response.interceptor";
import { GlobalExceptionFilter } from "@/common/filters/global-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // API 응답 포맷 통일
  app.useGlobalInterceptors(new ResponseInterceptor());
  // API 예외 처리 통일
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().catch(console.error);

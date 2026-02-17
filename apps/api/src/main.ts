import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { ResponseInterceptor } from "@/common/interceptors/response.interceptor";
import { GlobalExceptionFilter } from "@/common/filters/global-exception.filter";
import { ConfigService } from "@nestjs/config";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>("PORT");

  await app.listen(port);
}

bootstrap().catch(console.error);

import { Injectable, BadRequestException } from "@nestjs/common";
import { z } from "zod";
import type { PipeTransform } from "@nestjs/common";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodTypeAny) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: "Validation failed",
        errors: z.treeifyError(result.error),
      });
    }

    return result.data;
  }
}

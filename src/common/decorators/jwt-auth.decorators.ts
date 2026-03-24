import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

export const JwtAuth = (summary: string) => {
    return applyDecorators(
        ApiOperation({ summary }),
        ApiBearerAuth('jwt'),
        UseGuards(AuthGuard('jwt'))
    )
};
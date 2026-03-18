import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
    .setTitle("Feedback Board API")
    .setVersion("1.0")
    .setDescription("Collecting the user feedback")
    .build();


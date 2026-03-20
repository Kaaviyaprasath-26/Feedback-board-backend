import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
    .setTitle("Feedback Board API")
    .setVersion("1.0")
    .setDescription("Collecting the user feedback")
    .addBearerAuth({
        type:'http',
        scheme:'bearer',
        bearerFormat:'JWT',
        name:'Authorization',
        in:'header',
        description:'Jwt Token'
    },'jwt')
    .build();


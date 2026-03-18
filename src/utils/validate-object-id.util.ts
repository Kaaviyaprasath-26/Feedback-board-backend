import { BadRequestException } from "@nestjs/common";
import { Types } from "mongoose";

export const ValidateObjectId = (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid feedback ID');
    }
};
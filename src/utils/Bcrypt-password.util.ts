import * as bcrypt from "bcrypt";

export const BcryptPasswordCompare = async (currentPassword: string, dbPassword: string): Promise<boolean> => {
    return await bcrypt.compare(currentPassword, dbPassword);
};

export const BcryptPasswordHash = async (password: string) => {
    return await bcrypt.hash(password, 10)
};
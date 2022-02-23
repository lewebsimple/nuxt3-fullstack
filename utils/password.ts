import { compareSync, hashSync } from "bcrypt";

export const encryptPassword = (password: string): string => hashSync(password, 10);

export const verifyPassword = (password: string, encrypted: string): boolean => compareSync(password, encrypted);

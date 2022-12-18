import { StudentType } from "../types/customTypes";
import { signJwt } from "../utils/jwt";

export const signAccessToken = (student: StudentType): string => {
    const payload = student;

    const accessTokenPrivateKey = signJwt(payload, 'accessTokenPrivateKey');
    return accessTokenPrivateKey;
}
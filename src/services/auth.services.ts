import { StudentModel } from "../models/student.model";
import { StudentType } from "../types/customTypes";
import { signJwt } from "../utils/jwt";

export const signAccessToken = (student: StudentType): string => {
    const payload = student;

    const accessTokenPrivateKey = signJwt(payload, 'accessTokenPrivateKey');
    return accessTokenPrivateKey;
}

export const findStudentByRegNo = async (regNo: string) => {
    return StudentModel.findOne({ where: { regNo }});
}

export const findStudentByUniqueId = async (uniqueId: string) => {
    return StudentModel.findOne({ where: { student_uniqueId: uniqueId }}); 
}
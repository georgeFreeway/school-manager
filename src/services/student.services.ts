import { StudentModel } from "../models/student.model";
import { StudentType } from "../types/customTypes";
import * as argon from 'argon2';

export const registerStudents = async (student: StudentType) => {
    const hash = await argon.hash(student.password);
    student.password = hash;
    return StudentModel.create(student);
}

export const findStudentByEmail = async (email: string) => {
    return StudentModel.findOne({ where: { email }});
}

export const findStudentByPhone = async (phone: number) => {
    return StudentModel.findOne({ where: { telephone: phone }});
}
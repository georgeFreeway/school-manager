import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/connect";
import { StudentType } from "../types/customTypes";
import { v4 as uuidv4 } from "uuid";

//other models
import { SessionModel } from "./session.model";

class Student extends Model<StudentType> {};

export const StudentModel = sequelize.define<Student>('students', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('student', 'lecturer', 'HOD'),
        allowNull: false,
        defaultValue: "student"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regNo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => Math.floor(Math.random() * 1000000),
        unique: true
    },
    dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => uuidv4()
    },
    passwordResetCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, { freezeTableName: true, tableName: "students", timestamps: true });

StudentModel.hasOne(SessionModel);
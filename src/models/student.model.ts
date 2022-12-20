import { Model, DataTypes, InferAttributes } from "sequelize";
import { sequelize } from "../utils/connect";
import { v4 as uuidv4 } from "uuid";
import { StudentType } from "../types/customTypes";

export class Student extends Model<StudentType> {
    declare id: number;
    declare firstname: string;
    declare lastname: string;
    declare email: string;
    declare password: string;
    declare telephone: number;
    declare regNo: string;
    declare dateOfBirth: string;
    declare isVerified: boolean;
    declare student_uniqueId: string;
    declare verificationCode: string;
    declare passwordResetCode: string | null;

};

const regNoGenerator = async () => {
    let condition = true;
    let regNo;
    while(condition){
        const randomNo = Math.floor(Math.random() * 1000000);
        const year = new Date().getFullYear();
        regNo = `${year}/${randomNo}`;
        const alreadyExist = await StudentModel.findOne({where:{regNo:regNo}});
        if(!alreadyExist){
            condition = false;
            break;
        }
    } 
    return regNo;
}

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
        defaultValue: () => (regNoGenerator()),
        unique: true
    },
    student_uniqueId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => uuidv4()
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
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, { freezeTableName: true, tableName: "students", timestamps: true });

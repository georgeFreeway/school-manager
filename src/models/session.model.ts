import { DataTypes, Model } from "sequelize";
import { StudentSession } from "../types/customTypes";
import { sequelize } from "../utils/connect";

class Session extends Model<StudentSession> {};

export const SessionModel = sequelize.define<Session>('sessions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { freezeTableName: true, tableName: 'sessions', timestamps: true });
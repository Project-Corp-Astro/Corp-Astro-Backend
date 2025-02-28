import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";
import Employee from "./employee.model";

class Attendance extends Model {
  public id!: number;
  public empId!: number;
  public clockInTime!: Date;
  public clockInLocation!: {
    latitude: number;
    longitude: number;
    locationName: string;
  };
  public clockInImage!: string;
  public clockOutTime!: Date | null;
  public clockOutLocation!: {
    latitude: number;
    longitude: number;
    locationName: string;
  } | null;
  public clockOutImage!: string | null;
}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "employees", key: "empId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    clockInTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clockInLocation: {
      type: DataTypes.JSON,
      allowNull: false, // Now stores latitude, longitude, and locationName
    },
    clockInImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clockOutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    clockOutLocation: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    clockOutImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PRESENT", "ABSENT", "HALF-DAY"),
      defaultValue: "PRESENT",
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "attendance",
    timestamps: true,
  }
);

Employee.hasMany(Attendance, { foreignKey: "empId" });
Attendance.belongsTo(Employee, { foreignKey: "empId" });

export default Attendance;

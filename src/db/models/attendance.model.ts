// import { DataTypes, Model } from "sequelize";
// import sequelizeConnection from "../config";
// import Employee from "./employee.model";

// class Attendance extends Model {
//   public id!: number;
//   public empId!: number;
//   public clockInTime!: Date;
//   public clockInLocation!: {
//     latitude: number;
//     longitude: number;
//     locationName: string;
//   };
//   public clockInImage!: string;
//   public clockOutTime!: Date | null;
//   public clockOutLocation!: {
//     latitude: number;
//     longitude: number;
//     locationName: string;
//   } | null;
//   public clockOutImage!: string | null;
// }

// Attendance.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     empId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: { model: "employees", key: "empId" },
//       onDelete: "CASCADE",
//       onUpdate: "CASCADE",
//     },
//     clockInTime: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     clockInLocation: {
//       type: DataTypes.JSON,
//       allowNull: false, // Now stores latitude, longitude, and locationName
//     },
//     clockInImage: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     clockOutTime: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     clockOutLocation: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     clockOutImage: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("ONTIME", "LATE", "ABSENT"),
//       defaultValue: "ABSENT",
//     },
//   },
//   {
//     sequelize: sequelizeConnection,
//     tableName: "attendance",
//     timestamps: true,
//   }
// );

// Employee.hasMany(Attendance, { foreignKey: "empId" });
// Attendance.belongsTo(Employee, { foreignKey: "empId" });

// export default Attendance;
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
  public breakInTime!: Date | null;
  public breakInLocation!: {
    latitude: number;
    longitude: number;
    locationName: string;
  } | null;
  public breakInImage!: string | null;
  public breakOutTime!: Date | null;
  public breakOutLocation!: {
    latitude: number;
    longitude: number;
    locationName: string;
  } | null;
  public breakOutImage!: string | null;
  public clockOutTime!: Date | null;
  public clockOutLocation!: {
    latitude: number;
    longitude: number;
    locationName: string;
  } | null;
  public clockOutImage!: string | null;
  public status!: "ONTIME" | "LATE" | "ABSENT";
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
      allowNull: false,
    },
    clockInImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breakInTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    breakInLocation: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    breakInImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    breakOutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    breakOutLocation: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    breakOutImage: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.ENUM("ONTIME", "LATE", "ABSENT"),
      defaultValue: "ABSENT",
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

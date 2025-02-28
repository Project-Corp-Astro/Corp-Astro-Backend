import { DataTypes, Model } from "sequelize";
import sequelizeConnection  from "../config";

class Employee extends Model {
  public empId!: string;
  public name!: string;
  public email!: string;
  public password!: string; // Add this line
}

Employee.init(
  {
    empId: { 
      type: DataTypes.STRING, 
      primaryKey: true,
      allowNull: true
    },
   
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "employees",
    timestamps: false,
  }
);

export default Employee;

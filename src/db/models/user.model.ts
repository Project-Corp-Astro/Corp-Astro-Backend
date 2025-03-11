import { DataTypes, Model } from "sequelize";
import sequelizeConnection  from "../config";

class User extends Model {
  public userId!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string; // e.g., "astrologer", "business", "individual"
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
import { DataTypes, Model } from "sequelize";
import sequelizeConnection  from "../config";

class Chart extends Model {
  public chartId!: string;
  public userId!: string;
  public chartType!: string; // e.g., "natal", "divisional", "transit"
  public chartData!: object; // JSON object containing chart details
}

Chart.init(
  {
    chartId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    chartType: { type: DataTypes.STRING, allowNull: false },
    chartData: { type: DataTypes.JSONB, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "charts",
    timestamps: true,
  }
);

export default Chart;
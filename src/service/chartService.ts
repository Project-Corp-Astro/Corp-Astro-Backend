import Chart from "../db/models/chart.model";
import { generateNatalChart } from "../utils/swissEphemerisWrapper";

class ChartService {
  async generateNatalChart(userId: string, birthDetails: any) {
    if (!userId) {
      throw new Error("userId is required");
    }

    // Generate chart data using Swiss Ephemeris
    const chartData = await generateNatalChart(birthDetails);

    // Save chart to database
    const chart = await Chart.create({
      userId, // Ensure userId is correctly passed
      chartType: "natal",
      chartData,
    });

    return chart;
  }

  async getChartById(chartId: string) {
    return await Chart.findByPk(chartId);
  }
}

export default new ChartService();
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppDispatch } from "../../../app/hooks";
import { getAdminSalesChart } from "../../../features/admin/adminThunk";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const formatLabel = (entry: any, filter: string) => {
  if (filter === "daily") {
    return entry._id.date; // Directly use the formatted date "YYYY-MM-DD"
  }
  if (filter === "monthly") {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[entry._id.month - 1]} ${entry._id.year}`;
  }
  if (filter === "yearly") {
    return entry._id.year.toString();
  }
  return "Unknown";
};


const AdminSalesBarChart: React.FC = () => {
  const [filter, setFilter] = useState<"daily" | "monthly" | "yearly">(
    "monthly"
  );
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Earnings",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const result = await dispatch(
          getAdminSalesChart(filter)
        ).unwrap();
        if (!result || !Array.isArray(result)) return;

        console.log(result)
        setChartData({
          labels: result.map((entry: any) => formatLabel(entry, filter)),
          datasets: [
            {
              label: `Earnings ₹(${filter})`,
              data: result.map((entry: any) => entry.totalEarnings),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, [filter, dispatch]);

  return (
    <Card className="p-4 mt-5">
      <CardHeader>
        <CardTitle>Earnings Overview ({filter})</CardTitle>
      </CardHeader>

      {/* Toggle Buttons for Daily, Monthly, Yearly */}
      <div className="p-4 mb-4 w-48">
        <Select onValueChange={(value) => setFilter(value as "daily" | "monthly" | "yearly")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bar Chart */}
      <Bar data={chartData} />
    </Card>
  );
};

export default AdminSalesBarChart;

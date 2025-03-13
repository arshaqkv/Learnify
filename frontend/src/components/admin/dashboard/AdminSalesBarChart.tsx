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
    return entry._id.date; // Example: "2024-03-01"
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
        const result = await dispatch(getAdminSalesChart(filter)).unwrap();
        if (!result || !Array.isArray(result)) return;
  
        // Generate all possible months/years
        let labels: string[] = [];
        let earningsMap = new Map();
  
        result.forEach((entry: any) => {
          const label = formatLabel(entry, filter);
          labels.push(label);
          earningsMap.set(label, entry.totalEarnings);
        });
  
        if (filter === "monthly") {
          const currentYear = new Date().getFullYear();
          const allMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((month) => `${month} ${currentYear}`);
  
          labels = allMonths;
        } else if (filter === "yearly") {
          const currentYear = new Date().getFullYear();
          labels = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString()).reverse();
        }
  
        setChartData({
          labels,
          datasets: [
            {
              label: `Earnings ₹(${filter})`,
              data: labels.map((label) => earningsMap.get(label) || 0),
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

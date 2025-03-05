import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { getAdminSalesReport } from "../../../features/admin/adminThunk";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Button } from "../../../components/ui/button";
import { Download, FileDown } from "lucide-react";

const AdminSalesReport = () => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<any>([]);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [companyRevenue, setCompanyRevenue] = useState(0);

  const generateDateLabel = () => {
    const today = new Date();

    if (filter === "daily") {
      return `Date: ${today.toLocaleDateString()}`;
    } else if (filter === "monthly") {
      return `Month: ${today.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`;
    } else if (filter === "yearly") {
      return `Year: ${today.getFullYear()}`;
    } else if (startDate && endDate) {
      return `Date Range: ${new Date(
        startDate
      ).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
    }

    return "All Time"; // Default case
  };

  const fetchData = async () => {
    const result = await dispatch(
      getAdminSalesReport({ filter, startDate, endDate })
    );
    if (getAdminSalesReport.fulfilled.match(result)) {
      const { orders, totalRevenue, companyRevenue } = result.payload;
      setOrders(orders);
      setTotalRevenue(totalRevenue);
      setCompanyRevenue(companyRevenue);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, filter]);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Learnify - Sales Report", 14, 15);

    // Add selected date range
    const dateLabel = generateDateLabel();

    doc.text(dateLabel, 14, 25);

    // Add table
    autoTable(doc, {
      startY: 30,
      head: [
        [
          "SI no",
          "Order ID",
          "Course Title",
          "User",
          "Instructor",
          "Date",
          "Price",
          "Payment",
        ],
      ],
      body: orders.map((order: any, index: number) => [
        `${index + 1}`,
        order?.orderId,
        order.course.courseTitle,
        order.userId.firstname,
        order.course.courseCreator,
        order.transactionDate
          ? new Date(order.transactionDate).toLocaleDateString()
          : "N/A",
        `Rs.${order.course.coursePrice}`,
        order.paymentType.toUpperCase(),
      ]),
    });

    // Add total revenue and company revenue
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Revenue: Rs.${totalRevenue}`, 14, finalY);
    doc.text(
      `Company Revenue (20%): Rs.${companyRevenue.toFixed(2)}`,
      14,
      finalY + 8
    );

    // Save PDF
    doc.save("Learnify_Sales_Report.pdf");
  };

  // Function to generate Excel file
  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();

    const dateLabel = generateDateLabel();

    // Convert orders to JSON format for Excel
    const worksheetData = [
      [{ v: "Learnify - Sales Report", s: { font: { bold: true, sz: 14 } } }],
      [{ v: dateLabel }],
      [], // Empty row for spacing
      [
        "SI no",
        "Order ID",
        "Course Title",
        "User",
        "Instructor",
        "Date",
        "Price (₹)",
        "Payment",
      ],
      ...orders.map((order: any, index: number) => [
        `${index + 1}`,
        order?.orderId,
        order.course.courseTitle,
        order.userId.firstname,
        order.course.courseCreator,
        order.transactionDate
          ? new Date(order.transactionDate).toLocaleDateString()
          : "N/A",
        `₹${order.course.coursePrice}`,
        order.paymentType.toUpperCase(),
      ]),
      [], // Empty row
      ["Total Revenue", `₹${totalRevenue}`],
      ["Company Revenue (20%)", `₹${companyRevenue.toFixed(2)}`],
    ];

    // Convert JSON to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Set column widths
    worksheet["!cols"] = [
      { wch: 25 },
      { wch: 25 },
      { wch: 45 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
      { wch: 10 },
      { wch: 15 },
    ];

    // Add sheet to workbook and save file
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    XLSX.writeFile(workbook, "Learnify_Sales_Report.xlsx");
  };

  return (
    <Card className="shadow-md rounded-lg border">
      <CardHeader className="flex justify-between items-center p-6 border-b">
        <CardTitle className="text-2xl font-semibold">Sales Report</CardTitle>
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="p-2 border rounded-md"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded-md"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button
              variant={"outline"}
              className="px-4 py-2 transition"
              onClick={fetchData}
              disabled={!startDate && !endDate}
            >
              Submit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Total Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>SI no</TableHead>
              <TableHead>Order Id</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any, index: number) => (
              <TableRow key={order._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{order?.orderId}</TableCell>
                <TableCell className=" truncate">
                  {order.course.courseTitle}
                </TableCell>
                <TableCell>{order.userId.firstname}</TableCell>
                <TableCell>{order.course.courseCreator}</TableCell>
                <TableCell className="text-center">
                  {order.transactionDate
                    ? new Date(order.transactionDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>₹{order.course.coursePrice}</TableCell>
                <TableCell className="text-center">
                  {order.paymentType.toUpperCase()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 border-t">
        <div className="text-lg font-semibold">
          <h3>Total Revenue: ₹{totalRevenue}</h3>
          <h3>Company Revenue (20%): ₹{companyRevenue.toFixed(2)}</h3>
        </div>
        <div className="flex gap-3">
          <Button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={generatePDF}
          >
            <Download />
            Download PDF
          </Button>
          <Button
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={generateExcel}
          >
            <FileDown />
            Download Excel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminSalesReport;

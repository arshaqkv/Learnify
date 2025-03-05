import {
  Card,
  CardContent,
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
import Pagination from "../../../components/common/Pagination";
import { Badge } from "../../../components/ui/badge";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  getAllOrders,
  GetApprovedInstructors,
} from "../../../features/admin/adminThunk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";

const PurchaseManagement = () => {
  const [orders, setOrders] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getOrders = async () => {
      const [orderResult, instructorResult] = await Promise.all([
        dispatch(
          getAllOrders({
            page,
            limit: 10,
            instructor: selectedInstructor,
            paymentStatus: selectedPayment,
          })
        ),
        dispatch(GetApprovedInstructors()),
      ]);

      if (getAllOrders.fulfilled.match(orderResult)) {
        const { orders, total, totalPages } = orderResult.payload;
        setOrders(orders);
        setTotalPages(totalPages);
        setTotalOrders(total);
      }

      setInstructors(instructorResult.payload.instructors);
    };
    getOrders();
  }, [dispatch, page, selectedInstructor, selectedPayment]);

  const handlefilter = () =>{
    setSelectedInstructor("")
    setSelectedPayment("")
    window.location.reload()
  }
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl">All Purchases</CardTitle>

        <div className="flex gap-1">
          <Select onValueChange={setSelectedInstructor}>
            <SelectTrigger>
              <SelectValue placeholder="Select Instructor" />
            </SelectTrigger>
            <SelectContent>
              {instructors.map((instructor) => (
                <SelectItem
                  key={instructor._id}
                  value={`${instructor.firstname + " " + instructor.lastname}`}
                >
                  {`${instructor.firstname} ${instructor.lastname}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedPayment}>
            <SelectTrigger>
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button
           variant={"outline"}
            onClick={handlefilter}
            className=" text-white bg-red-600 rounded"
          >
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Total Purchases {totalOrders}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Course Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {order.course.courseTitle}
                </TableCell>
                <TableCell className="w[200px] overflow-hidden">
                  {order.userId.firstname}
                </TableCell>
                <TableCell>{order.course.courseCreator}</TableCell>
                <TableCell className=" text-center">
                  {order.transactionDate
                    ? new Date(order.transactionDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>₹{order.course.coursePrice}</TableCell>
                <TableCell className=" text-center">
                  {order.paymentType.toUpperCase()}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      order.paymentStatus === "pending"
                        ? "bg-orange-400"
                        : order.paymentStatus === "completed"
                        ? "bg-green-400"
                        : "bg-red-500"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </CardContent>
    </Card>
  );
};

export default PurchaseManagement;

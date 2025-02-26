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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ordersPerInstructor } from "../../../features/auth/authThunk";
import { LoaderCircle } from "lucide-react";
import { endLoading, startLoading } from "../../../features/auth/authSlice";

const StudentPurchases = () => {
  const [orders, setOrders] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getOrders = async () => {
      dispatch(startLoading())
      const result = await dispatch(ordersPerInstructor({ page, limit: 5 }));
      if (ordersPerInstructor.fulfilled.match(result)) {
        const { orders, total, totalPages } = result.payload;
        setOrders(orders);
        setTotalPages(totalPages);
        setTotalOrders(total);
      }
      dispatch(endLoading())
    };
    getOrders();
  }, [dispatch, page]);

  if (loading) {
    return (
      <div className="text-center text-xl mt-10 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin  mx-auto text-blue-600" />
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-center">Purchases</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Total Purchases {totalOrders}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.course.courseTitle}</TableCell>
                <TableCell className="w[200px] overflow-hidden">
                  {order.userId.firstname}
                </TableCell>
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
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </CardContent>
    </Card>
  );
};

export default StudentPurchases;

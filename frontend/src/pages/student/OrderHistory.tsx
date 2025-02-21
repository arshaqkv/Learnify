import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getOrders } from "../../features/auth/authThunk";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Avatar } from "../../components/ui/avatar";
import avatar from "../../assets/avatar.jpg";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await dispatch(getOrders());
      if (getOrders.fulfilled.match(result)) {
        setOrders(result.payload.orders);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "failed":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 w-full h-full flex flex-col rounded-2xl bg-white ">
      <p className="text-3xl font-bold text-center text-gray-900 mb-6">
        Order History
      </p>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order: any) => (
          <Card
            key={order?.orderId}
            className="p-4 mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h1 className="text-blue-500 text-lg font-semibold">
              {order?.orderId}
            </h1>
            <Link to={`/courses/course-details/${order.course.courseId}`}>
              <div className="mt-3 flex items-center gap-4">
                <img
                  src={order.course.courseImage}
                  alt={order.course.courseTitle}
                  className="w-28 h-26 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h1 className="font-semibold text-xl text-gray-900">
                    {order.course.courseTitle}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {order.course.courseCategory}
                  </p>
                  <p className="text-gray-800 text-sm flex items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={
                          order?.course?.courseCreatorImage
                            ? order?.course?.courseCreatorImage
                            : avatar
                        }
                        className="object-cover"
                      />
                      <AvatarFallback className="">Avatar</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Instructor: </span>{" "}
                    {order.course.courseCreator}
                  </p>
                  <Badge className="mt-2">{order.course.courseLevel}</Badge>
                </div>
              </div>
            </Link>

            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <p className="text-gray-700">
                <span className="font-medium">Payment Status: </span>
                <span
                  className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusColor(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus.toUpperCase()}
                </span>
              </p>
              <p className="text-lg font-semibold text-gray-900">
                ₹{order.course.coursePrice}
              </p>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderHistory;

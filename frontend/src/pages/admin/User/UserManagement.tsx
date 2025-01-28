import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  blockUser,
  getallUsers,
  unblockUser,
} from "../../../features/admin/adminThunk";
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
import { Button } from "../../../components/ui/button";
import { UserRoundCheck, UserRoundX } from "lucide-react";
import { endLoading, startLoading } from "../../../features/admin/adminSlice";
import toast, { Toaster } from "react-hot-toast";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<any[]>([]);


  useEffect(() => {
    dispatch(startLoading());
    const getUsers = async () => {
      const response: any = await dispatch(getallUsers());
      const data = response.payload.students;
      setUsers(data);
    };
    getUsers();
    dispatch(endLoading());
  }, [dispatch]);

  const handleUserBlock = async (id: any) => {
    const result = await dispatch(blockUser(id));
    if (blockUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: true } : user
        )
      );
    } else if (blockUser.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  const handleUserUnblock = async (id: any) => {
    const result = await dispatch(unblockUser(id));
    if (unblockUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: false } : user
        )
      );
    } else if (unblockUser.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  return (
    <Card>
      <Toaster />
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Table>
            <TableCaption>Total Users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{`${user.firstname} ${user.lastname}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell
                    className={
                      user.isBlocked ? "text-red-400" : "text-green-400"
                    }
                  >
                    {user.isBlocked === true ? "Blocked" : "Active"}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {user.isBlocked === false ? (
                      <Button
                        onClick={() => handleUserBlock(user._id)}
                        variant="ghost"
                        size="sm"
                      >
                        <UserRoundX className="h-6 w-6" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUserUnblock(user._id)}
                        variant="ghost"
                        size="sm"
                      >
                        <UserRoundCheck className="h-6 w-6" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;

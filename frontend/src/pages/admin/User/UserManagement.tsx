import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
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
import { Search, UserRoundCheck, UserRoundX } from "lucide-react";
import { endLoading, startLoading } from "../../../features/admin/adminSlice";
import toast from "react-hot-toast";
import { Input } from "../../../components/ui/input";
import ResultNotFound from "../../../components/common/ResultNotFound";
import { Skeleton } from "../../../components/ui/skeleton";
import Pagination from "../../../components/common/Pagination";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.admin);
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalUsers: 0,
  });

  useEffect(() => {
    const getUsers = async () => {
      dispatch(startLoading());
      const response: any = await dispatch(
        getallUsers({ page, limit: 5, search })
      );
      if (response.payload) {
        const { users, pagination } = response.payload;
        setUsers(users);
        setPagination(pagination || { totalPages: 1 });
      }
      dispatch(endLoading());
    };
    getUsers();
  }, [dispatch, page, search]);

  const handleUserBlock = async (id: string) => {
    const result = await dispatch(blockUser(id));
    if (blockUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: true } : user
        )
      );
    } else {
      toast.error(result.payload as string);
    }
  };

  const handleUserUnblock = async (id: string) => {
    const result = await dispatch(unblockUser(id));
    if (unblockUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: false } : user
        )
      );
    } else {
      toast.error(result.payload as string);
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Users</CardTitle>
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search users"
            className="w-72 pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      {loading ? (
        <CardContent>
          {/* Skeleton Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-6 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-6 w-40" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-6 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-6 w-32" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-6 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-6 w-30" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : users.length > 0 ? (
        <CardContent>
          <Table>
            <TableCaption>Total Users: {pagination.totalUsers}</TableCaption>
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
                    {user.isBlocked ? "Blocked" : "Active"}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {user.isBlocked ? (
                      <Button
                        onClick={() => handleUserUnblock(user._id)}
                        variant="ghost"
                        size="sm"
                        title="Unblock"
                        className="hover:text-green-500"
                      >
                        <UserRoundCheck className="h-6 w-6" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUserBlock(user._id)}
                        variant="ghost"
                        size="sm"
                        title="Block"
                        className="hover:text-red-500"
                      >
                        <UserRoundX className="h-6 w-6" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <Pagination
            totalPages={pagination.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </CardContent>
      ) : (
        <ResultNotFound />
      )}
    </Card>
  );
};

export default UserManagement;

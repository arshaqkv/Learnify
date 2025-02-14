import { useEffect, useState } from "react";
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
import { Input } from "../../../components/ui/input";
import { ExternalLink, Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { endLoading, startLoading } from "../../../features/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import { getallInstructors } from "../../../features/admin/adminThunk";
import ResultNotFound from "../../../components/common/ResultNotFound";
import { Skeleton } from "../../../components/ui/skeleton";
import Pagination from "../../../components/common/Pagination";

const InstructorList = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.admin)
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [instructors, setInstructors] = useState<any>([]);
  const [totalInstructors, setTotalInstructors] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());
      const result = await dispatch(
        getallInstructors({ page, limit: 5, search })
      );
      const { instructors, total, totalPages } = result.payload;
      setInstructors(instructors);
      setTotalPages(totalPages);
      setTotalInstructors(total);
      dispatch(endLoading())
    };
    fetchData();
  }, [dispatch, page, search]);
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">
          All Instructors
        </CardTitle>
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search instructors"
            className="w-72 pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />
          
        </div>
      </CardHeader>
      {loading? (<CardContent>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({length:5}).map((_, i) => (
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
                <TableCell >
                  <Skeleton className="h-6 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>): 
      instructors.length > 0 ? (
        <CardContent>
            <Table>
              <TableCaption>Total Instructors {totalInstructors}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>

                  <TableHead>Applied Date</TableHead>
                  <TableHead>Application Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructors.map((data: any) => (
                  <TableRow key={data._id}>
                    <TableCell className="font-medium">
                      {data.instructor.firstname +
                        " " +
                        data.instructor.lastname}
                    </TableCell>
                    <TableCell className="w[200px] overflow-hidden">
                      {data.instructor.email}
                    </TableCell>

                    <TableCell>
                      {new Date(data.createdAt).toDateString()}
                    </TableCell>
                    <TableCell
                      className={
                        data.status === "approved"
                          ? "text-green-500"
                          : data.status === "rejected"
                          ? "text-red-500"
                          : "text-blue-500"
                      }
                    >
                      {data.status}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:text-blue-500"
                        title="view"
                        onClick={()=> navigate(`/admin/instructors/request/${data._id}`)}
                      >
                        <ExternalLink />
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* pagination */}
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage}/>
        </CardContent>
      ) : (
        <ResultNotFound />
      )}
    </Card>
  );
};
export default InstructorList;

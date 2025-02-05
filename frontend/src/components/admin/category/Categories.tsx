import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getAllCategories,
  removeCategory,
  toggleBlockCategory,
} from "../../../features/admin/adminThunk";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import {
  FilePenLine,
  Lock,
  LockOpen,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from "../../ui/alert-dialog";
import ResultNotFound from "../../common/ResultNotFound";
import { Input } from "../../ui/input";
import { endLoading, startLoading } from "../../../features/admin/adminSlice";
import { Skeleton } from "../../ui/skeleton";
import Pagination from "../../common/Pagination";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.admin);
  const [categories, setCategories] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategory, setTotalCategory] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      dispatch(startLoading());
      const response: any = await dispatch(
        getAllCategories({ page, limit: 5, search })
      );
      const { categories, totalCategory, totalPages } = response.payload;
      setCategories(categories);
      setTotalPages(totalPages);
      setTotalCategory(totalCategory);
      dispatch(endLoading());
    };
    getCategories();
  }, [dispatch, page, search]);


  const handleRemoveCategory = async () => {
    if (!selectedCategory) return;
    dispatch(startLoading());
    const result = await dispatch(removeCategory(selectedCategory));
    if (removeCategory.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setCategories((prev: any) =>
        prev.filter((category: any) => category._id !== selectedCategory)
      );
      setShowDialog(false);
    } else if (removeCategory.rejected.match(result)) {
      toast.error(result.payload as string);
    }
    dispatch(endLoading());
  };

  const handleCategoryBlock = async (id: string) => {
    const result = await dispatch(toggleBlockCategory(id));
    dispatch(startLoading());
    if (toggleBlockCategory.fulfilled.match(result)) {
      toast.success(result.payload.message);
    } else if (toggleBlockCategory.rejected.match(result)) {
      toast.error(result.payload as string);
    }
    dispatch(endLoading());
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">
          All Categories
        </CardTitle>
        <div className="flex gap-1">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <Input
              type="text"
              placeholder="Search categories"
              className="w-72 pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/admin/categories/add")}
          >
            Add Category
            <Plus />
          </Button>
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
                <TableCell className="flex gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      ) : categories.length > 0 ? (
        <CardContent>
            <Table>
              <TableCaption>Total Categories {totalCategory}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Category Desc</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category: any) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="max-w-1 overflow-hidden">
                      {category.description}
                    </TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toDateString()}
                    </TableCell>
                    <TableCell
                      className={
                        category.isDeleted ? "text-red-400" : "text-green-400"
                      }
                    >
                      {category.isDeleted === true ? "Inactive" : "Active"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:text-blue-500"
                        title={category.isDeleted ? "Unblock" : "Block"}
                        onClick={() => handleCategoryBlock(category._id)}
                      >
                        {category.isDeleted === true ? <LockOpen /> : <Lock />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:text-green-500"
                        title="Edit"
                        onClick={() =>
                          navigate(`/admin/categories/edit/${category._id}`)
                        }
                      >
                        <FilePenLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:text-red-500"
                        title="Delete"
                        onClick={() => {
                          setSelectedCategory(category._id);
                          setShowDialog(true);
                        }}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage}/>
        </CardContent>
      ) : (
        <ResultNotFound />
      )}

      {/* Remove confirmation dialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the category. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveCategory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default Categories;

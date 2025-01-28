import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  getAllCategories,
  removeCategory,
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
import { FilePenLine, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { endLoading, startLoading } from "../../../features/auth/authSlice";
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

const Categories = () => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<any>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const response: any = await dispatch(getAllCategories());
      const data = response.payload.categories;
      setCategories(data);
    };
    getCategories();
  }, [dispatch]);

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

  return (
    <Card>
      <Toaster />
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">
          All Categories
        </CardTitle>
        <Button
          variant="outline"
          onClick={() => navigate("/admin/category/add")}
        >
          Add Category
          <Plus />
        </Button>
      </CardHeader>
      <CardContent>
        <div>
          <Table>
            <TableCaption>Total Categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Category Desc</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: any) => (
                <TableRow key={category._id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="w[200px] overflow-hidden">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    {category.isDeleted === true ? "Inactive" : "Active"}
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigate(`/admin/category/edit/${category._id}`)
                      }
                    >
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
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
        </div>
      </CardContent>
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

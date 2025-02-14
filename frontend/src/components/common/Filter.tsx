import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getActiveCategories } from "../../features/auth/authThunk";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface SearchAndSortOptions {
  onCategoryChange: (checkedCategories: string[]) => void
  onDifficultyChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

interface Category {
  _id: string;
  name: string;
}

const Filter: React.FC<SearchAndSortOptions> = ({
  onCategoryChange,
  onDifficultyChange,
  onSortChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await dispatch(getActiveCategories());
        if (getActiveCategories.fulfilled.match(result)) {
          setCategories(result.payload.categories || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    let updatedCategories = checked
      ? [...selectedCategories, categoryId] // Add category if checked
      : selectedCategories.filter((id) => id !== categoryId); // Remove category if unchecked

    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories); // Pass updated list to parent component
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex flex-col items-center justify-between">
        <h1 className="mb-3 text-lg font-semibold md:text-xl">Filter Options</h1>
        
        <Select onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to high</SelectItem>
              <SelectItem value="high">High to low</SelectItem>
            </SelectGroup>

            <SelectGroup>
              <SelectLabel>Sort by name</SelectLabel>
              <SelectItem value="a-z">A - Z</SelectItem>
              <SelectItem value="z-a">Z - A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      <div>
        <h1 className="mt-3 mb-2 font-semibold">CATEGORY</h1>
        {categories.map((category) => (
          <div className="flex items-center my-2 space-x-2" key={category._id}>
            <Checkbox
              id={category._id}
              checked={selectedCategories.includes(category._id)}
              onCheckedChange={(checked) => handleCategoryChange(category._id, checked as boolean)}
            />
            <Label>{category?.name}</Label>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <Select onValueChange={onDifficultyChange}>
        <SelectTrigger>
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;

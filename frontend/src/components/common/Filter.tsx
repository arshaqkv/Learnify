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

const Filter = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await dispatch(getActiveCategories());
      if (getActiveCategories.fulfilled.match(result)) {
        setCategories(result.payload.categories);
      }
    };
    fetchCategories();
  }, [dispatch]);

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between flex-col">
        <h1 className="font-semibold text-lg md:text-xl mb-3">
          Filter Options
        </h1>
        <Select>
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
        <h1 className="font-semibold mb-2 mt-3">CATEGORY</h1>
        {categories.map((category) => (
          <div className="flex items-center space-x-2 my-2" key={category._id}>
            <Checkbox id={category?._id} />
            <Label>{category.name}</Label>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <Select>
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

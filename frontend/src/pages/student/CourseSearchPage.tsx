import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Filter from "../../components/common/Filter";
import SearchResult from "../../components/common/SearchResult";
import { getAllPublishedCourses } from "../../features/auth/authThunk";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import Pagination from "../../components/common/Pagination";
import ResultNotFound from "../../components/common/ResultNotFound";
import CourseSkeleton from "../../components/common/CourseSkeleton";

const CourseSearchPage = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(startLoading());
      try {
        const result = await dispatch(
          getAllPublishedCourses({
            page: currentPage,
            limit: 6,
            search: searchTerm,
            category: selectedCategories,
            level: selectedDifficulty,
            sort: selectedSort,
          })
        ).unwrap();
        setCourses(result.courses);
        setTotalPages(result.totalPages);
        setTotalCourses(result.totalCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        dispatch(endLoading());
      }
    };
    fetchCourses();
  }, [
    dispatch,
    searchTerm,
    selectedCategories,
    selectedDifficulty,
    selectedSort,
    currentPage,
  ]);

  const handleCategoryChange = (updatedCategories: string[]) => {
    setSelectedCategories(updatedCategories);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <form onSubmit={handleSearchSubmit} className="mb-6 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search your favourite courses..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-1.5 border border-gray-300 rounded-full shadow-lg focus:outline-none  "
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-e-full shadow-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </form>
      <div className="my-6">
        {searchTerm ? (
          <p>
            Showing result for
            <span className="text-blue-800 font-bold italic ml-1">
              {searchTerm}
            </span>
          </p>
        ) : (
          ""
        )}
        <p>Total Courses: {totalCourses}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter
          onCategoryChange={handleCategoryChange}
          onDifficultyChange={setSelectedDifficulty}
          onSortChange={setSelectedSort}
        />
        <div className="flex-1">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : !courses.length ? (
            <CourseNotFound />
          ) : (
            courses.map((course) => (
              <SearchResult key={course?._id} course={course} />
            ))
          )}
          {courses.length > 0 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSearchPage;


const CourseNotFound = () => {
  return <ResultNotFound />;
};

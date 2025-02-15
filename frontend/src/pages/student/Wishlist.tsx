import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getWishlist, removeFromWishlist } from "../../features/auth/authThunk";
import SearchResult from "../../components/common/SearchResult";
import CourseSkeleton from "../../components/common/CourseSkeleton";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { HeartOff } from "lucide-react";
import toast from "react-hot-toast";
import wishlist from '../../assets/wishlist.png'

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      dispatch(startLoading());
      const result = await dispatch(getWishlist());
      if (getWishlist.fulfilled.match(result)) {
        const { wishlist } = result.payload;
        setWishlist(wishlist);
      }
      dispatch(endLoading());
    };
    fetchWishlist();
  }, [dispatch]);

  const handleRemove = async (id: string) => {
    const result = await dispatch(removeFromWishlist(id));
    if (removeFromWishlist.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setWishlist((prev) => prev.filter((course) => course._id !== id));
    } else {
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 h-screen">
      <h2 className="text-center text-3xl font-bold">Wishlist</h2>
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <CourseSkeleton key={index} />
        ))
      ) : !wishlist.length ? (
        <WishlistNotFound />
      ) : (
        wishlist.map((course) => (
          <div
            key={course._id}
            className="flex justify-between items-center  py-4"
          >
            <SearchResult course={course} />
            <button
              onClick={() => handleRemove(course._id)}
              className="text-red-500 hover:text-red-700 p-2 transition-all"
            >
              <HeartOff size={24} fill="red" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;

const WishlistNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <img
          src={wishlist} // Replace with a relevant image path
          alt="Empty Wishlist"
          className="w-64 h-64 object-contain"
        />
        <p className="text-gray-500 text-lg mt-4 font-semibold">
          Your wishlist is empty. Start adding your favorite courses!
        </p>
      </div>
    );
  };
  
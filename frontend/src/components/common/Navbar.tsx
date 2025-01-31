import { GraduationCap, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authThunk";
import toast from "react-hot-toast";
import { endLoading } from "../../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  const handleLogout = async() =>{
    const result = await dispatch(logoutUser())
    if(logoutUser.fulfilled.match(result)){
      toast.success(result.payload.message)
      navigate('/login')
    }else if(logoutUser.rejected.match(result)){
      toast.error(result.payload as string)
    }
    dispatch(endLoading())
  }
  return (
    <div className="h-16 bg-white border-b p-4 ">
      <div className="max-w-7xl mx-auto md:flex justify-between items-center">
        <div className="flex items-center gap-2 justify-center">
          <GraduationCap size={"30"} />
          <h1 className="font-extrabold text-2xl "><Link to={'/'}>Learnify.</Link></h1>
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Menu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Welcome {user.lastName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                <Link to={'/profile'}>Profile</Link>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  My Courses
                  <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Wishlist
                  <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate('/login')} variant="outline">Login</Button>
            <Button onClick={() => navigate('/signup')}>Sign up</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

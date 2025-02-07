import { GraduationCap } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import avatar from "../../assets/avatar.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);


  
  
  return (
    <div className="h-16 bg-white border-b p-4 ">
      <div className="max-w-7xl mx-auto md:flex justify-between items-center">
        <div className="flex items-center gap-2 justify-center">
          <GraduationCap size={"30"} />
          <h1 className="font-extrabold text-2xl ">
            <Link to={"/"}>Learnify.</Link>
          </h1>
        </div>

        {user ? (
          <Link to={'/profile/dashboard'} >
            <Avatar className="hover:border-2">
              <AvatarImage src="" />
              <AvatarFallback>
                <img src={user.profileImage? user.profileImage: avatar} alt=""/>
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/login")} variant="outline">
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

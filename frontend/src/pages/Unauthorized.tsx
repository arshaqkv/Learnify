import { NavLink } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex justify-center text-lg">
      <div>
        <h1 className="text-2xl">
          You do not have permission to view this page.
        </h1>
        <NavLink to={"/login"} className="bg-slate-400">
          GO BACK TO LOGIN
          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
          eyJpZCI6IjY3OTUyODg5ZWFjMDdiYjE3ZWY3NmJmNyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM3ODI4NTYzLCJleHAiOjE3Mzc4Mjk0NjN9.
          1zI-RK2kHp2w8Ml0gD16DpZLJW6hFL9GgaWiWMfVMDo

          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTUyODg5ZWFjMDdiYjE3ZWY3NmJmNyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM3ODI4NTYzLCJleHAiOjE3Mzc4Mjk0NjN9.
          1zI-RK2kHp2w8Ml0gD16DpZLJW6hFL9GgaWiWMfVMDo
        </NavLink>
      </div>
    </div>
  );
};

export default Unauthorized;

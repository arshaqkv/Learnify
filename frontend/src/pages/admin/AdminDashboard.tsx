
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { startLoading } from "../../features/admin/adminSlice"
import { getallUsers, logoutAdmin } from "../../features/admin/adminThunk"
import { endLoading } from "../../features/auth/authSlice"
import { useEffect } from "react"

const AdminDashboard = () => {

  const dispatch = useAppDispatch()
  const { data, user } = useAppSelector(state => state.admin)

  useEffect(() =>{
    const getAllStudednts = async()=>{
      dispatch(getallUsers())
    
    }
    getAllStudednts()
  },[])

  if(data){
    console.log(data)
  }

  
  const handleLogout = () =>{
      dispatch(startLoading())
      const result = dispatch(logoutAdmin())
      if(logoutAdmin.fulfilled.match(result)){
        toast.success(result.payload.message)
        dispatch(endLoading())
      }else if(logoutAdmin.rejected.match(result)){
        toast.error(result.payload as string)
        dispatch(endLoading())
      }
  }
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user? `hello ${user.email}`: ''}
      <button onClick={handleLogout} className="bg-blue-700 rounded p-2">Logout</button>
    </div>
  )
}

export default AdminDashboard

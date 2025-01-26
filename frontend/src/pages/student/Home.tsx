import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../components/ui/button"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logoutUser } from "../../features/auth/authThunk"
import { endLoading } from "../../features/auth/authSlice"


const Home = () => {
  const dispatch = useAppDispatch()
  const notify = ()=> toast.error('This is a hot toast')
  const { user } = useAppSelector(state => state.auth)

  const handleLogout = async() =>{
    const result = await dispatch(logoutUser())
    if(logoutUser.fulfilled.match(result)){
      toast.success(result.payload.message)
      dispatch(endLoading())
    }else if(logoutUser.rejected.match(result)){
      toast.error(result.payload as string)
    }
  }

  
  return (
    <div>
      <Toaster />
      <h1>Home</h1>
      {user? 'hello ' + user?.firstName: 'please login'}
      <Button onClick={notify}>Click me</Button>
      {user? <button onClick={handleLogout}>Logout</button>: ''}
      <Toaster />
    </div>
  )
}

export default Home

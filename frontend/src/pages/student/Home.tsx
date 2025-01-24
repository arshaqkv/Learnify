import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../components/ui/button"
import GoogleLoginButton from "../../components/GoogleLoginButton"
import { config } from "../../config/config"


const Home = () => {

  const notify = ()=> toast('This is a hot toast')
  return (
    <div>
      <h1>Home</h1>
      <GoogleLoginButton />
      <Button onClick={notify}>Click me</Button>
      <Toaster />
    </div>
  )
}

export default Home

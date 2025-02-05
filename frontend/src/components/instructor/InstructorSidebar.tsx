import { SquareLibrary } from 'lucide-react'
import { Link } from 'react-router-dom'

const InstructorSidebar = () => {
  return (
    <div className='hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen'>
        <div className='space-y-4'>
            <Link>
                <SquareLibrary />
                <h1>Courses</h1>
            </Link>
        </div>
    </div>
  )
}

export default InstructorSidebar

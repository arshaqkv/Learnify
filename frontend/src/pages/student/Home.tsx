import { Link } from "react-router-dom"

const Home = () => {
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Welcome to Learnify</h2>
          <p className="text-lg mb-10">
            Your one-stop solution for managing and learning online courses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Courses</h3>
              <p className="text-gray-600 mb-4">Browse through our wide range of courses and start learning today.</p>
              <Link
                to="/courses"
                className="text-blue-600 hover:underline"
              >
                Explore Courses
              </Link>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Instructors</h3>
              <p className="text-gray-600 mb-4">Join our community of expert educators and teach students.</p>
              <Link
                to="/signup"
                className="text-blue-600 hover:underline"
              >
                Become a Teacher
              </Link>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Students</h3>
              <p className="text-gray-600 mb-4">Access resources to help you succeed in your learning journey.</p>
              <Link
                to="/signup"
                className="text-blue-600 hover:underline"
              >
                Join as a Student
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home

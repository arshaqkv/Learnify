import { Link } from "react-router-dom";
import Courses from "./Courses";
import courseImage from "../../assets/tech.avif";
import instructor from "../../assets/instructor.avif";
import learn from "../../assets/learn.avif";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold leading-tight">
            Learn, Grow, and Succeed with Learnify.
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Explore thousands of expert-led courses to enhance your skills and
            career opportunities.
          </p>
          <Link
            to="/courses/search"
            className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Courses Section */}
        <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg">
          <img
            src={courseImage}
            alt="Courses"
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">📚 Explore Courses</h3>
            <p className="text-gray-600">
              Discover a vast library of high-quality courses across various
              fields.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              Start Learning →
            </Link>
          </div>
        </div>

        {/* Instructors Section */}
        <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg">
          <img
            src={instructor}
            alt="Instructors"
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              👩‍🏫 Become an Instructor
            </h3>
            <p className="text-gray-600">
              Share your expertise and teach students worldwide on our platform.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              Join as Instructor →
            </Link>
          </div>
        </div>

        {/* Students Section */}
        <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg">
          <img
            src={learn}
            alt="Students"
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">🎓 Learn with Ease</h3>
            <p className="text-gray-600">
              Get access to top-quality learning resources and track your
              progress.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <Courses />
    </div>
  );
};

export default Home;

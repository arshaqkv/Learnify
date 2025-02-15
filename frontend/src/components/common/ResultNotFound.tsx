import { CircleAlert } from "lucide-react"
import notFound from '../../assets/result.not.found.webp'


const ResultNotFound = () => {
  return (
    <div className="flex flex-col justify-between items-center mt-8">
      <img
          src={notFound} // Replace with a relevant image path
          alt="No Result"
          className="w-48 h-48 object-contain"
        />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-20">No results found</h1>
    </div>
  )
}

export default ResultNotFound

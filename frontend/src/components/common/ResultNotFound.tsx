import { CircleAlert } from "lucide-react"


const ResultNotFound = () => {
  return (
    <div className="flex flex-col justify-between items-center mt-10">
      <CircleAlert className="text-red-500 h-16 w-16 mb-4"/>
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-20">No results found</h1>
    </div>
  )
}

export default ResultNotFound

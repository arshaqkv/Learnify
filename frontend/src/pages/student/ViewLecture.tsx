import { Accordion, AccordionItem } from "../../components/ui/accordion";

const ViewLecture = () => {
  return (
    <div className="grid grid-cols-4 h-screen">
      {/* Video Player */}
      <div className="col-span-3 bg-black p-4 flex items-center justify-center">
        <video controls className="w-full h-full max-w-4xl" />
      </div>
      
      {/* Sidebar: Course Content */}
      <div className="col-span-1 bg-white p-4 border-l border-gray-200 overflow-y-auto">
        <h2 className="text-lg font-semibold">Course Title</h2>
        <div className="my-2 h-2 bg-gray-300 rounded-full">
          <div className="h-2 bg-blue-500 rounded-full w-1/3"></div>
        </div>
        <p className="text-sm text-gray-500">30% completed</p>
        
        <Accordion>
          <AccordionItem title="📖 Lecture 1: Introduction">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
                <p className="text-sm">🎬 Video 1: Course Overview</p>
                <button className="p-1 border rounded-full hover:bg-gray-200">▶</button>
              </div>
              <div className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
                <p className="text-sm">🎬 Video 2: Getting Started</p>
                <button className="p-1 border rounded-full hover:bg-gray-200">▶</button>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem title="📖 Lecture 2: Fundamentals">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
                <p className="text-sm">🎬 Video 1: Basics Explained</p>
                <button className="p-1 border rounded-full hover:bg-gray-200">▶</button>
              </div>
              <div className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
                <p className="text-sm">🎬 Video 2: Hands-on Demo</p>
                <button className="p-1 border rounded-full hover:bg-gray-200">▶</button>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};


export default ViewLecture

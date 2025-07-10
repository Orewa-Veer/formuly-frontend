import { Search } from "lucide-react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import QuestionGrid from "./QuestionGrid";
const QuestionPage = () => {
  return (
    <div className="p-3  flex flex-col gap-4 w-full">
      {/* Top Panel */}
      <div className="flex w-full justify-between mx-auto mb-8">
        <div>
          <h1 className="text-4xl font-extrabold drop-shadow-2xl text-gray-900 mb-2">
            All Questions
          </h1>
          <p className="text-gray-600 italic">
            Find answers to your development questions
          </p>
        </div>
        <div>
          <Button className="bg-[#059669] text-white rounded font-medium">
            <Link to={"/app/popup"}> Ask Question</Link>
          </Button>
        </div>
      </div>
      {/* Top-Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="flex items-center flex-1  rounded-md">
          <Search className="relative left-8 top-1.75  h-4 w-4 -translate-y-1/2 text-muted-foreground " />
          <Input placeholder="Seach questiosn..." className="  px-10" />
        </div>

        <div className="flex justify-between gap-2">
          {" "}
          <Button className="flex bg-white/40 border-white/60 text-black border hover:bg-gray-200 ">
            <FaFilter className="" />
            <span>Filter</span>
          </Button>
          <Button className="flex bg-white/80 border-white text-black border hover:bg-gray-200 ">
            <FaSortAmountDown />
            <span>Sort</span>
          </Button>
        </div>
      </div>
      {/* Mid Section */}
      {/* Tags  */}

      {/* Discussion  */}
      <QuestionGrid />
    </div>
  );
};

export default QuestionPage;

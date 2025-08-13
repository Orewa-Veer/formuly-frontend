import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useSocket } from "../../../services/useSocket";
import { FilterDiscuss } from "../components/FilterDiscuss";
import QuestionGrid from "../components/QuestionGrid";
import { SortDiscuss } from "../components/SortDiscuss";

const QuestionPage = () => {
  const { socket, ready } = useSocket();

  useEffect(() => {
    if (!ready || !socket) return;
    socket.emit("questions:join");
  }, [ready, socket]);

  const [tit, setTit] = useState("");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = React.useState("");
  const [sort, setSort] = React.useState("");

  const handleClick = () => {
    setTitle(tit);
  };

  return (
    <div className="p-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 flex flex-col gap-4 w-full">
      {/* Top Panel */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-2xl text-gray-900 mb-1 sm:mb-2">
            All Questions
          </h1>
          <p className="text-gray-600 italic text-sm sm:text-base">
            Find answers to your development questions
          </p>
        </div>
        <Button className="bg-[#059669] text-white rounded font-medium w-full sm:w-auto">
          <Link to={"/app/popup"}>Ask Question</Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full">
        {/* Search Bar */}
        <div className="flex items-center w-full lg:flex-1 rounded-md gap-2">
          <Input
            placeholder="Search questions..."
            value={tit}
            onChange={(val) => setTit(val.target.value)}
            className="px-3 sm:px-6 flex-1"
          />
          <Button
            className="cursor-pointer bg-blue-500 text-white"
            onClick={handleClick}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <FilterDiscuss value={filter} setValue={(val) => setFilter(val)} />
          <SortDiscuss value={sort} setValue={(val) => setSort(val)} />
        </div>
      </div>

      {/* Questions Grid */}
      <QuestionGrid sortType={sort} filter={filter} title={title} />
    </div>
  );
};

export default QuestionPage;

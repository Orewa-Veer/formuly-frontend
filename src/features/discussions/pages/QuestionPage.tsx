import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../temp-components/ui/button";
import { Input } from "../../../temp-components/ui/input";
import { useSocket } from "../../../services/useSocket";
import { FilterDiscuss } from "../components/FilterDiscuss";
import QuestionGrid from "../components/QuestionGrid";
import { SortDiscuss } from "../components/SortDiscuss";
const QuestionPage = () => {
  const { socket, ready } = useSocket();
  useEffect(() => {
    if (!ready || !socket) return;

    console.log("This is the socket", socket);
    socket.emit("questions:join");
    return () => {};
  }, [ready, socket]);
  const [tit, setTit] = useState("");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = React.useState("");
  const [sort, setSort] = React.useState("");
  // console.log(tit);
  const handleClick = () => {
    setTitle(tit);
  };

  return (
    <div className="p-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 flex flex-col w-full gap-4 ">
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
      <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full justify-between">
        <div className="flex items-center flex-1 w-full rounded-md gap-2">
          <div className="flex flex-1  items-center">
            <Input
              placeholder="Seach questiosn..."
              value={tit}
              onChange={(val) => setTit(val.target.value)}
              className="  px-6"
            />
          </div>
          <Button
            className="cursor-pointer bg-blue-500 text-white "
            onClick={handleClick}
          >
            <Search />
          </Button>
        </div>

        <div className="flex justify-between gap-2">
          {" "}
          <FilterDiscuss value={filter} setValue={(val) => setFilter(val)} />
          <SortDiscuss value={sort} setValue={(val) => setSort(val)} />
        </div>
      </div>
      {/* Mid Section */}
      {/* Tags  */}

      {/* Discussion  */}
      <QuestionGrid sortType={sort} filter={filter} title={title} />
    </div>
  );
};

export default QuestionPage;

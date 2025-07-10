import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FilterDiscuss } from "./FilterDiscuss";
import QuestionGrid from "./QuestionGrid";
import { SortDiscuss } from "./SortDiscuss";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
const QuestionPage = () => {
  const [tit, setTit] = useState("");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = React.useState("");
  const [sort, setSort] = React.useState("");
  console.log(tit);
  const handleClick = () => {
    setTitle(tit);
  };

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
          <Input
            placeholder="Seach questiosn..."
            value={tit}
            onChange={(val) => setTit(val.target.value)}
            className="  px-10"
          />
          <button className="cursor-pointer " onClick={handleClick}>
            <Search />
          </button>
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

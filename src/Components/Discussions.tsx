import { useParams } from "react-router-dom";
import { useADiscuss } from "../useHooks/useDiscussion";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Bookmark } from "lucide-react";
import { Question } from "../models/Question";
import ReplySubmit from "./ReplySubmit";
import ReplyList from "./ReplyList";

const Discussions = () => {
  const params = useParams<{ id: string }>();
  if (!params.id) console.log("No id provided");

  const { data, loading, error } = useADiscuss<Question>(params.id);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>No data found</div>;
  return (
    <div className="pt-16 p-3 flex ">
      {" "}
      {/* Question*/}
      <div key={data._id} className="flex-1">
        <div className="backdrop-blur-lg  bg-white/50 border border-white/80 text-gray-800 rounded-3xl p-6 px-10   shadow-xl  flex gap-2">
          <div className="flex flex-col    space-y-5 items-center  p-3">
            <div className="flex flex-col space-y-5 items-center mt-10 p-3 pl-1">
              <GoTriangleUp className="size-10 text-gray-600  rounded-full border-gray-600 border-2" />
              <span className="text-gray-600 text-3xl font-bold">
                {data.upvotes.length}
              </span>
              <GoTriangleDown className="size-10 text-gray-600 rounded-full border-gray-600 border-2" />
            </div>
            <div>
              <Bookmark className="text-emerald-700 " />
            </div>
          </div>
          <div id="ques-wrap" className="flex-1 pl-6">
            <div className="flex  items-start justify-between">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold text-shadow-2xs text-shadow-gray-500 text-gray-800 font-iceland ">
                  {data.title}
                </h1>
                <p className="text-xs text-gray-600  mt-1 flex gap-3 items-center">
                  {/* <img
                      src={data.user.avatar}
                      className="w-8 h-8 rounded-full border border-gray-300"
                    /> */}
                  Asked by{" "}
                  <span className="font-medium">{data.user.username}</span> •{" "}
                  <span>{new Date(data.createdAt).toLocaleString()}</span>
                </p>
                <div id="show-tags" className=" flex gap-3">
                  {data.tags.map((tag) => (
                    <div
                      key={tag.name}
                      className="rounded-full px-2.5 py-0.5 text-xs bg-white/60 border-emerald-700/80 text-gray-700"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              {/* body */}
            </div>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed font-iceland">
              {data.body}
            </p>
            <div className="flex mt-6 gap-4 text-sm text-gray-600 justify-end ">
              <button className="hover:text-green-600 transition flex gap-1 items-center">
                <GoTriangleUp className="size-8" /> {data.upvotes.length}
              </button>
              {/* <button className="hover:text-pink-500 transition">
                  ❤️ {data.views}
                </button> */}
              <button className="hover:text-blue-500 transition">
                💬 {data.replyCounter} Replies
              </button>
            </div>
          </div>
        </div>

        <div>
          <ReplyList id={data._id} />
        </div>
        <div>
          <ReplySubmit discuss={data} />
        </div>
      </div>
      {/* side panel */}
      <div className="w-1/5  h-full   rounded-lg flex flex-col gap-5 py-6 ">
        {/* top */}
        <div className="flex-1 w-full h-fit bg-white/50 rounded-md border-white/80 backdrop-blur-md shadow-md p-3">
          <h2 className="text-2xl ">related tags</h2>
          {data.tags.map((tag) => (
            <div key={tag.name}>{tag.name}</div>
          ))}
        </div>
        {/* medium */}
        <div className="flex-1 w-full h-fit bg-white/50 rounded-md border-white/80 backdrop-blur-md shadow-md "></div>
        {/* bottom */}
        <div className="flex-1 h-fit w-full bg-white/50 rounded-md border-white/80 backdrop-blur-md shadow-md "></div>
      </div>
      {/* Reply List */}
    </div>
  );
};

export default Discussions;

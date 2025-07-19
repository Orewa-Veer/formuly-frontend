import { Bookmark } from "lucide-react";
import { useEffect } from "react";
import { GoTriangleUp } from "react-icons/go";
import { useParams } from "react-router-dom";
import { Question } from "../models/Question";
import { useSocket } from "../services/useSocket";
import { useADiscuss } from "../useHooks/useDiscussion";
import ReplyList from "./ReplyList";
import ReplySubmit from "./ReplySubmit";

const Discussions = () => {
  const params = useParams<{ id: string }>();
  if (!params.id) console.log("No id provided");

  const { data, loading, error } = useADiscuss<Question>(params.id);
  // console.log("this is the socket", socket);
  const { socket, ready } = useSocket();
  useEffect(() => {
    if (!ready || !socket) return;
    console.log("emmiting the discussion socket");
    socket.emit("discussion:join", params.id);
    return () => {
      socket.emit("discussion:leave", params.id);
    };
  }, [params.id, ready, socket]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="pt-16 p-1 md:p-3 flex  ">
      {" "}
      {/* Question*/}
      <div key={data._id} className="flex-1">
        {/* Question card  */}
        <div className="backdrop-blur-md  bg-white/40 border border-gray-300/60 text-gray-800 rounded-md p-0.5 md:p-4 px-2 md:px-6   shadow-lg  flex gap-2">
          {/* Left Side  */}
          <div className="flex flex-col    space-y-5 items-center  p-3 border-r-2 pr-0">
            <div className="flex  gap-2 items-center mt-10 p-3 pl-1">
              <span className="text-gray-600 text-3xl font-bold">
                {data.upvoteCounter}
              </span>
              <GoTriangleUp className="size-7 text-gray-600  rounded-full border-gray-600 border-2" />
              {/* <GoTriangleDown className="size-10 text-gray-600 rounded-full border-gray-600 border-2" /> */}
            </div>
            <div>
              <Bookmark className="text-emerald-700 " />
            </div>
          </div>
          {/* Right side  */}
          <div id="ques-wrap" className="flex-1 pl-6">
            <div className="flex  ">
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold text-shadow-2xs text-shadow-gray-500 text-gray-800 font-iceland ">
                  {data.title}
                </h1>
                <p className="text-xs text-gray-600  mt-1 pl-1 flex gap-3 items-center">
                  {/* <img
                      src={data.user.avatar}
                      className="w-8 h-8 rounded-full border border-gray-300"
                    /> */}
                  Asked by{" "}
                  <span className="font-medium">{data.user.username}</span> •{" "}
                  <span>{new Date(data.createdAt).toLocaleString()}</span>
                </p>
                {/* tags  */}
                <div id="show-tags" className=" flex gap-3 mt-2 pl-1">
                  {data.tags.map((tag) => (
                    <div
                      key={tag.name}
                      className="rounded-full px-1.5  text-xs bg-white/60 border border-emerald-700/80 text-gray-700"
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
                <GoTriangleUp className="size-8" /> {data.upvoteCounter}
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

        <div className="">
          <ReplyList id={data._id} />
        </div>
        <div className="mt-10 mb-5 flex items-center justify-center">
          <ReplySubmit discuss={data} />
        </div>
      </div>
      {/* side panel */}
      {/* Reply List */}
    </div>
  );
};

export default Discussions;

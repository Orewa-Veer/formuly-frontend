import { MessageSquare } from "lucide-react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";
import Service from "../../../services/genricServices";
import { useAuth } from "../../../services/useAuth";
import { useDiscussion } from "../../discussions/hooks/useDiscussion";
import Cards from "../../../Components/Cards";
import { Button } from "../../../Components/ui/button";
import { useEffect, useState } from "react";
import { Question } from "../../../types/Question";
import { useUpvotes } from "../hooks/useUpvotes";
const UserProfile = () => {
  const user = useAuth();
  useState();
  const { data, loading, error } = useDiscussion({ user: user?.user?._id });
  const { data: upvotes } = useUpvotes();
  const [feed, setFeed] = useState<Question[]>();
  const [active, setActive] = useState("discussion");
  useEffect(() => {
    if (data) setFeed(data.data);
  }, [data]);
  console.log(user);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!feed) return <div>Nothing to Show</div>;
  const handleUpvotes = (id: string) => {
    const upvote = new Service("/api/upvote/" + id);
    upvote.post();
  };
  const upvoteData = () => {
    setFeed(upvotes.data);
    setActive("upvote");
  };
  const discussData = () => {
    setFeed(data.data);
    setActive("discussion");
  };

  return (
    <div className=" md:mx-8 p-6">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://github.com/shadcn.png"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border shadow-md"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user?.user?.name}</h2>
          <p className="text-sm text-gray-500">@{user?.user?.username}</p>
          <p className="text-sm text-gray-400">Joined on Jan 2, 2025</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <h4 className="text-gray-600 text-sm">Discussions</h4>
          <p className="text-xl font-bold">{data.data.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <h4 className="text-gray-600 text-sm">Replies</h4>
          <p className="text-xl font-bold">128</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <h4 className="text-gray-600 text-sm">Upvoted</h4>
          <p className="text-xl font-bold">{upvotes.data.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        <Button
          variant={"ghost"}
          key={"discussion"}
          className={`pb-2 ${active === "discussion" ? "bg-gray-200" : ""} `}
          onClick={discussData}
        >
          Discussions
        </Button>
        <Button
          variant={"ghost"}
          key={"reply"}
          className={`pb-2 ${active === "reply" ? "bg-gray-200" : ""} `}
        >
          Replies
        </Button>
        <Button
          variant={"ghost"}
          key={"upvote"}
          className={`pb-2 ${active === "upvote" ? "bg-gray-200" : ""} `}
          onClick={upvoteData}
        >
          Upvoted
        </Button>
      </div>

      {/* Activity feed (example cards) */}
      {/* <div className="space-y-4">
        <div className="p-4 bg-white border rounded-xl shadow-sm">
          <h4 className="font-medium text-lg">
            🔥 How to handle socket disconnects on multiple tabs?
          </h4>
          <p className="text-sm text-gray-500">
            Posted 2 days ago in #WebSockets
          </p>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm">
          <h4 className="font-medium text-lg">
            🧠 Reply: You can track sockets by user ID and forcibly disconnect
            previous ones
          </h4>
          <p className="text-sm text-gray-500">
            Replied 1 day ago in #Discussions
          </p>
        </div>
      </div> */}
      {/* discussion  */}
      <div className="space-y-4">
        {" "}
        {feed.map((discuss) => (
          <Cards
            key={discuss._id}
            className={` border shadow-sm border-gray-300 rounded-b-md gap-3 bg-white  flex hover:shadow-md backdrop-blur-md hover:backdrop-blur-lg hover:-translate-y-0.5 transition duration-100`}
          >
            <div className={`border-r-3 `}>
              {/* upvotes */}
              <div className="flex flex-col gap-2 items-center justify-between p-3">
                <GoTriangleUp
                  className="rounded-full  border-2 text-gray-600 border-gray-600 size-6 cursor-pointer"
                  onClick={() => handleUpvotes(discuss._id)}
                />
                <span className="font-medium">{discuss.upvoteCounter}</span>
                <GoTriangleDown className="rounded-full  border-2 text-gray-600 border-gray-600 size-6" />
              </div>
              {/* replies */}
              <div className="flex items-center gap-1 mt-2" key={discuss._id}>
                <MessageSquare className="text-emerald-700 size-6" />{" "}
                <span>{discuss.replyCounter}</span>
              </div>
            </div>
            {/*top */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3 w-full">
                {/*text */}
                <div>
                  <h3 className="text-2xl font-bold tracking-wide text-gray-900 hover:text-primary cursor-pointer mb-2">
                    <Link
                      to={`/app/questions/${discuss._id}`}
                      key={discuss._id}
                    >
                      {discuss.title}
                    </Link>
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-3 line-clamp-2 italic"
                    dangerouslySetInnerHTML={{ __html: discuss.body }}
                  ></p>
                </div>
                {/*logo */}
                <div className=" flex gap-2 ml-4 ">
                  {/* <Button
                  className={`px-1.5 py-0.5 bg-gradient-to-br ${color.buttons}  text-black`}
                  onClick={() => {
                    if (users[0].bookmark.includes(discuss._id))
                      return users[0].bookmark.filter((book) => book != discuss._id);
                    users[0].bookmark.push(discuss.title);
                  }}
                >
                  <FaRegBookmark />
                </Button> */}
                  <Button className={`p-2 bg-gradient-to-br  text-black`}>
                    <IoShareSocial />
                  </Button>
                </div>
              </div>
              {/*mid */}
              <div className="flex flex-wrap gap-2 mb-4 w-full">
                {discuss.tags.map((cat) => (
                  <div
                    key={cat.name}
                    className={`bg-gradient-to-br   rounded-full items-center px-2.5 py-.75 font-semibold border text-xs`}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
              {/*bottom */}
              {/* <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-gray-500">
                  {" "}
                  <img src={discuss.user.avatar} alt="" />
                </div>
                <span className="font-medium text-sm">{discuss.user.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegEye /> <span>{discuss.views}</span>
              </div>
            </div> */}
              <div className="w-full p-2 text-sm font-semibold">
                {discuss.user.username}
              </div>
            </div>
          </Cards>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

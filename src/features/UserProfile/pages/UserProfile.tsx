import { MessageSquare } from "lucide-react";
import { GoTriangleUp } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";
import Service from "../../../services/genricServices";
import { useAuth } from "../../../services/useAuth";
import { useDiscussion } from "../../discussions/hooks/useDiscussion";
import Cards from "../../../components/Cards";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { Question } from "../../../types/Question";
import { useUpvotes } from "../hooks/useUpvotes";

const UserProfile = () => {
  const user = useAuth();
  const { data, loading, error } = useDiscussion({ user: user?.user?._id });
  const { data: upvotes } = useUpvotes();
  const [feed, setFeed] = useState<Question[]>([]);
  const [active, setActive] = useState<"discussion" | "reply" | "upvote">(
    "discussion"
  );

  useEffect(() => {
    if (data?.data) setFeed(data.data);
  }, [data]);

  if (loading) return <div className="text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;
  if (!feed.length) return <div className="text-gray-400">Nothing to show</div>;

  const handleUpvotes = (id: string) => {
    new Service("/api/upvote/" + id).post();
  };

  const upvoteData = () => {
    setFeed(upvotes?.data || []);
    setActive("upvote");
  };

  const discussData = () => {
    setFeed(data?.data || []);
    setActive("discussion");
  };

  return (
    <div className="md:mx-8 p-6 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <img
          src="https://github.com/shadcn.png"
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold">{user?.user?.name}</h2>
          <p className="text-gray-500">@{user?.user?.username}</p>
          <p className="text-gray-400 text-sm">Joined on Jan 2, 2025</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Discussions", value: data?.data?.length || 0 },
          { label: "Replies", value: 128 },
          { label: "Upvoted", value: upvotes?.data?.length || 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white text-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h4 className="text-gray-500 text-sm">{stat.label}</h4>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-4">
        {[
          { key: "discussion", label: "Discussions", action: discussData },
          { key: "reply", label: "Replies" },
          { key: "upvote", label: "Upvoted", action: upvoteData },
        ].map((tab) => (
          <Button
            key={tab.key}
            variant="ghost"
            className={`pb-2 rounded-none ${
              active === tab.key
                ? "border-b-2 border-emerald-500 text-emerald-500"
                : "text-gray-500"
            }`}
            onClick={tab.action}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {feed.map((discuss) => (
          <Cards
            key={discuss._id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex gap-4">
              {/* Voting */}
              <div className="flex flex-col items-center">
                <GoTriangleUp
                  className="text-gray-600 hover:text-emerald-600 cursor-pointer"
                  size={24}
                  onClick={() => handleUpvotes(discuss._id)}
                />
                <span className="font-semibold">{discuss.upvoteCounter}</span>
                <div className="flex items-center gap-1 mt-2 text-gray-500">
                  <MessageSquare size={16} /> {discuss.replyCounter}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold hover:text-emerald-600">
                  <Link to={`/app/questions/${discuss._id}`}>
                    {discuss.title}
                  </Link>
                </h3>
                <p
                  className="text-gray-600 text-sm mt-1 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: discuss.body }}
                ></p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {discuss.tags.map((cat) => (
                    <span
                      key={cat.name}
                      className="bg-emerald-50 text-emerald-600 text-xs px-2 py-1 rounded-full border border-emerald-200"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span>{discuss.user.username}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <IoShareSocial /> Share
                  </Button>
                </div>
              </div>
            </div>
          </Cards>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

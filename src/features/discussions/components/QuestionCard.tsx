import { MessageSquare } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Question } from "../../../types/Question";
import Cards from "../../../components/Cards";
import { Button } from "../../../components/ui/button";
import timeAgo from "@/services/timeAgo";

interface Props {
  discussions: Question[];
  bookmarks?: Set<string>;
  handleUpvotes: (discuss_id: string) => void;
  handleBookmark: (discuss_id: string) => void;
}

const QuestionCard = ({
  discussions,
  bookmarks,
  handleUpvotes,
  handleBookmark,
}: Props) => {
  return (
    <div className="flex flex-col  space-y-3 ">
      {discussions.map((discuss) => (
        <Cards
          key={discuss._id}
          className="flex-row overflow-hidden border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
        >
          {/* Left side - Votes & Replies */}
          <div className="flex flex-col  items-center justify-center w-16 border-r border-gray-200 p-3 ">
            {/* Upvotes */}
            <div className="flex flex-col bg-gray-100 px-2 py-3 rounded-md hover:bg-gray-200 items-center gap-1">
              <span className="font-semibold text-gray-800">
                {discuss.upvoteCounter}
              </span>
              <GoTriangleUp
               className="size-8 cursor-pointer text-gray-500 group-hover:text-emerald-600 transition-colors"
                onClick={() => handleUpvotes(discuss._id)}
              />
            </div>

            {/* Replies */}
            <div className="flex  items-center gap-1 mt-4">
              <MessageSquare className="text-emerald-600 w-5 h-5" />
              <span className="text-gray-700">{discuss.replyCounter}</span>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 flex flex-col min-w-0">
            {/* Title + Actions */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2   ">
                  <Link to={`/app/questions/${discuss._id}`}>
                    {discuss.title}
                  </Link>
                </h3>
               <div
      className="text-gray-600 text-sm mt-1 line-clamp-2   **:whitespace-normal
"
      dangerouslySetInnerHTML={{ __html: discuss.body }}
    />
  
              </div>

              {/* Buttons */}
              <div className="flex gap-2 ml-4 ">
                <Button
                  size="sm"
                  className={
                    bookmarks?.has(discuss._id)
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-emerald-600 border border-emerald-600"
                  }
                  onClick={() => handleBookmark(discuss._id)}
                >
                  <FaRegBookmark />
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <IoShareSocial />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {discuss.tags.map((cat) => (
                <span
                  key={cat.name}
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center  gap-2 mt-auto pt-3 text-sm font-medium text-gray-700">
              <div>{discuss.user.username}</div>
              <div className="text-xs text-gray-600">asked {timeAgo(`discuss.createdAt`)}</div>
            </div>
          </div>
        </Cards>
      ))}
    </div>
  );
};

export default QuestionCard;

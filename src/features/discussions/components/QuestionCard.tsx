import { MessageSquare } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Question } from "../../../types/Question";
import Cards from "../../../Components/Cards";
import { Button } from "../../../Components/ui/button";
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
  // console.log(bookmarks);
  // console.log(discussions);
  return (
    <div className="flex flex-col space-y-2.5">
      {" "}
      {discussions.map((discuss) => (
        <Cards
          key={discuss._id}
          className={` border shadow-sm rounded-b-md gap-3 bg-gradient-to-br  border-gray-200  flex hover:shadow-lg backdrop-blur-lg hover:backdrop-blur-xl hover:-translate-y-0.5 transition duration-100`}
        >
          <div className={`border-r-3 `}>
            {/* upvotes */}
            <div className="flex  gap-0.5 md:gap-2 items-center justify-between p-0.5  md:p-3">
              <span className="font-medium">{discuss.upvoteCounter}</span>
              <GoTriangleUp
                className="rounded-full  border-2 text-gray-600 border-gray-600 size-5 cursor-pointer"
                onClick={() => handleUpvotes(discuss._id)}
              />
              {/* <GoTriangleDown className="rounded-full  border-2 text-gray-600 border-gray-600 size-6" /> */}
            </div>
            {/* replies */}
            <div
              className="flex items-center gap-2 mt-2 p-0.5 md:p-3"
              key={discuss._id}
            >
              <span>{discuss.replyCounter}</span>
              <MessageSquare className="text-emerald-700 size-6" />{" "}
            </div>
          </div>
          {/*top */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3 w-full">
              {/*text */}
              <div>
                <h3 className="text-2xl font-bold tracking-wide text-gray-900 hover:text-primary cursor-pointer mb-2">
                  <Link to={`/app/questions/${discuss._id}`} key={discuss._id}>
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
                <Button
                  variant={"default"}
                  className={` ${
                    bookmarks?.has(discuss._id)
                      ? "bg-emerald-600 text-white"
                      : "text-emerald-600 bg-white"
                  } hover:bg-emerald-600 hover:text-white shadow-sm`}
                  onClick={() => handleBookmark(discuss._id)}
                >
                  <FaRegBookmark />
                </Button>
                <Button
                  variant={"default"}
                  className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm  "
                >
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
  );
};

export default QuestionCard;

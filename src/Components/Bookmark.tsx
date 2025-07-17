import { BookmarkIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bookmarks, Question } from "../models/Question";
import Service from "../services/genricServices";
import { useData } from "../useHooks/useData";
import useSocket from "../useHooks/useSocket";
import QuestionCard from "./QuestionCard";

const Bookmark = () => {
  const socket = useSocket();
  // Data fectchin
  const { data: book, error, loading } = useData<Bookmarks>("/api/bookmark");
  const [discussions, setDiscussions] = useState<Question[] | []>([]);
  // fetching discussions fromm it
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);
  useEffect(() => {
    if (book) setBookmarks(book);
  }, [book]);
  useEffect(() => {
    if (bookmarks) setDiscussions(book.map((b) => b.parent_id));
  }, [book]);

  // const { data, loading, error } = useDiscussion({});
  // useeffects
  const bookmarksSet = useMemo(
    () => new Set(bookmarks.map((b) => b.parent_id._id)),
    [bookmarks]
  );
  // useEffect(() => {
  //   const bookmarkedQuestions = data.filter((d) => bookmarks?.includes(d._id));
  //   setDiscussions(bookmarkedQuestions);
  // }, [data]);
  // socket handler
  useEffect(() => {
    if (!socket) return;
    socket.emit("bookmark:join");
    return () => {
      socket.emit("bookamrk:leave");
    };
  }, []);
  // handle functions
  const handleUpvotes = (id: string) => {
    const upvote = new Service("/api/upvote/" + id);
    upvote.post();
  };
  const handleBookmark = (discussId: string) => {
    const bookmark = new Service("/api/bookmark/" + discussId);
    bookmark.post().then((res) => {
      if (res.data.status === "added") {
        setBookmarks([...bookmarks, res.data.book]);
      } else {
        setBookmarks(bookmarks.filter((b) => b.parent_id._id !== discussId));
      }
    });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // if (!data) return <div> No Discussions</div>;
  if (!bookmarks) return;
  console.log(book);

  return (
    <div className="flex flex-col p-3  px-6 md:px-8 lg:px-10 xl:px-14">
      {/* Heading  */}
      <div>
        <h1 className="text-4xl font-bold text-shadow-sm     flex items-center text-emerald-700">
          <BookmarkIcon className="size-10 font-bold " />
          <span>Bookmarks</span>
        </h1>
        <p className="text-muted">All your bookmarks Apprear here</p>
      </div>
      {/* Questions grid  */}
      <div>
        <QuestionCard
          discussions={discussions}
          bookmarks={bookmarksSet}
          handleBookmark={handleBookmark}
          handleUpvotes={handleUpvotes}
        />
      </div>
    </div>
  );
};

export default Bookmark;

import { useEffect, useMemo, useState } from "react";
import { Bookmarks, Question } from "../../../types/Question";
import Service from "../../../services/genricServices";
import { useData } from "../../../useHooks/useData";
import { useDiscussion } from "../hooks/useDiscussion";
import { useSocket } from "../../../services/useSocket";
import QuestionCard from "./QuestionCard";

interface Props {
  sortType?: string;
  filter?: string;
  title?: string;
}
const QuestionGrid = ({ sortType = "", filter = "", title = "" }: Props) => {
  const [discussions, setDiscussions] = useState<Question[] | []>([]);
  const { data, loading, error } = useDiscussion({ sortType, filter, title });
  const { data: book } = useData<Bookmarks>("/api/bookmark");
  const [books, setBookmarks] = useState<Bookmarks[]>([]);
  const { socket, ready } = useSocket();

  useEffect(() => {
    if (book) setBookmarks(book);
    // console.log(book);
  }, [book]);
  // console.log(book);
  const bookmarksSet = useMemo(
    () => new Set(books.map((b) => b.parent_id._id)),
    [books]
  );
  const handleUpvotes = (id: string) => {
    const upvote = new Service("/api/upvote/" + id);
    upvote.post();
  };
  const handleBookmark = (discussId: string) => {
    const bookmark = new Service("/api/bookmark/" + discussId);
    bookmark.post().then((res) => {
      if (res.data.status === "added") {
        console.log(res.data.book.parent_id);
        setBookmarks([...books, res.data.book]);
      } else {
        setBookmarks(books.filter((b) => b.parent_id._id !== discussId));
      }
    });
  };
  // useEffect(() => {
  //   if (book) setBookmarks(book.map((b) => b.parent_id));
  // }, [book]);
  useEffect(() => {
    if (data) setDiscussions(data);
  }, [data]);
  useEffect(() => {
    if (!ready || !socket) return;
    const updateHandler = (discuss: Question) => {
      setDiscussions((prev) =>
        prev.map((d) => {
          if (d._id === discuss._id) {
            return discuss;
          } else {
            return d;
          }
        })
      );
    };
    socket.on("discussions:updated", updateHandler);
    return () => {
      socket?.off("discussions:updated", updateHandler);
    };
  }, [ready, socket]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div> No Discussions</div>;
  // console.log(data[0]._id);

  return (
    <>
      <QuestionCard
        discussions={discussions}
        bookmarks={bookmarksSet}
        handleUpvotes={handleUpvotes}
        handleBookmark={handleBookmark}
      />
    </>
  );
};

export default QuestionGrid;

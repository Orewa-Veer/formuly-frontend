import { BookmarkIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Bookmarks } from "../../types/Question";
import Service from "../../services/genricServices";
import { useSocket } from "../../services/useSocket";
import { useData } from "../../useHooks/useData";
import QuestionCard from "../discussions/components/QuestionCard";

const Bookmark = () => {
  const { data: book, error, loading } = useData<Bookmarks>("/api/bookmark");
  const { ready, socket } = useSocket();

  // Derived state directly from data
  const bookmarks = book?.data || [];
  const discussions = useMemo(
    () => bookmarks.map((b) => b.parent_id),
    [bookmarks]
  );
  const bookmarksSet = useMemo(
    () => new Set(bookmarks.map((b) => b.parent_id._id)),
    [bookmarks]
  );

  // Socket room join
  useEffect(() => {
    if (!ready || !socket) return;
    socket.emit("bookmark:join");
    return () => socket.emit("bookmark:leave");
  }, [ready, socket]);

  // Actions
  const handleUpvotes = async (id: string) => {
    try {
      await new Service(`/api/upvote/${id}`).post();
    } catch (err) {
      console.error("Upvote failed", err);
    }
  };

  const handleBookmark = async (discussId: string) => {
    try {
      const res = await new Service(`/api/bookmark/${discussId}`).post();
      // Optimistic update logic could be added here
    } catch (err) {
      console.error("Bookmark toggle failed", err);
    }
  };

  // UI states
  if (loading)
    return <div className="p-4 text-gray-500">Loading bookmarks...</div>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;
  if (bookmarks.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <BookmarkIcon className="mx-auto mb-2 size-10 text-gray-400" />
        <p>No bookmarks yet. Save questions to see them here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 sm:px-6 md:px-8 lg:px-12 ">
      {/* Heading */}
      <div className="mb-4 flex items-center gap-3">
        <BookmarkIcon className="size-8 text-emerald-700" />
        <div>
          <h1 className="text-3xl font-bold text-emerald-700">Bookmarks</h1>
          <p className="text-sm text-gray-500">Your saved discussions</p>
        </div>
      </div>

      {/* Grid of Questions */}
      <div className="">
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

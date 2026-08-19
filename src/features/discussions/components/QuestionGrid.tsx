import { useEffect, useMemo, useState } from "react";
import { Bookmarks, Question } from "../../../types/Question";
import Service from "../../../services/genricServices";
import { useData } from "../../../useHooks/useData";
import { useDiscussion } from "../hooks/useDiscussion";
import { useSocket } from "../../../services/useSocket";
import QuestionCard from "./QuestionCard";
import Paginations from "@/components/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { Search, MessageCircleQuestion, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  sortType?: string;
  filter?: string;
  title?: string;
  tagId?: string;
}

const QuestionGrid = ({
  sortType = "",
  filter = "",
  title = "",
  tagId = "",
}: Props) => {
  const [discussions, setDiscussions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);

  const { data, loading, error } = useDiscussion({
    sortType,
    filter,
    title,
    page,
    tagId,
  });

  const { data: book } = useData<Bookmarks>("/api/bookmark");

  const [books, setBookmarks] = useState<Bookmarks[]>([]);

  const { socket, ready } = useSocket();

  const [pageCount, setPageCount] = useState(1);

  /*
   * ----------------------------------------------------------
   * Reset pagination whenever the query changes
   * ----------------------------------------------------------
   */

  useEffect(() => {
    setPage(1);
  }, [sortType, filter, title, tagId]);

  /*
   * ----------------------------------------------------------
   * Update page count
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (data) {
      setPageCount(data.totalPages || 1);
    }
  }, [data]);

  /*
   * ----------------------------------------------------------
   * Sync bookmarks
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (book) {
      setBookmarks(book.data);
    }
  }, [book]);

  /*
   * ----------------------------------------------------------
   * Convert bookmarks into a Set for O(1) lookup
   * ----------------------------------------------------------
   */

  const bookmarksSet = useMemo(
    () => new Set(books.map((b) => b.parent_id._id)),
    [books],
  );

  /*
   * ----------------------------------------------------------
   * Sync discussions
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (data) {
      setDiscussions(data.data);
    }
  }, [data]);

  /*
   * ----------------------------------------------------------
   * Socket updates
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (!ready || !socket) return;

    const updateHandler = (discuss: Question) => {
      setDiscussions((prev) =>
        prev.map((discussion) =>
          discussion._id === discuss._id ? discuss : discussion,
        ),
      );
    };

    socket.on("discussions:updated", updateHandler);

    return () => {
      socket.off("discussions:updated", updateHandler);
    };
  }, [ready, socket]);

  /*
   * ----------------------------------------------------------
   * Upvote
   * ----------------------------------------------------------
   */

  const handleUpvotes = async (id: string) => {
    try {
      const upvote = new Service(`/api/upvote/${id}`);
      await upvote.post();
    } catch (err) {
      console.error("Failed to upvote discussion", err);
    }
  };

  /*
   * ----------------------------------------------------------
   * Bookmark
   * ----------------------------------------------------------
   */

  const handleBookmark = async (discussId: string) => {
    try {
      const bookmark = new Service(`/api/bookmark/${discussId}`);

      const res = await bookmark.post();

      setBookmarks((prev) =>
        res.data.status === "added"
          ? [...prev, res.data.book]
          : prev.filter((b) => b.parent_id._id !== discussId),
      );
    } catch (err) {
      console.error("Failed to update bookmark", err);
    }
  };

  /*
   * ----------------------------------------------------------
   * Loading
   * ----------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-white/80
              bg-white/60
              p-6
              shadow-lg
              shadow-gray-200/20
              backdrop-blur-xl
            "
          >
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-7 w-20 rounded-full bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-100" />
              </div>

              <div className="h-6 w-3/4 rounded bg-gray-200" />

              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-5/6 rounded bg-gray-100" />
              </div>

              <div className="flex gap-3 pt-2">
                <div className="h-8 w-20 rounded-lg bg-gray-100" />
                <div className="h-8 w-20 rounded-lg bg-gray-100" />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <Spinner />
            Loading questions...
          </div>
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------------------------
   * Error
   * ----------------------------------------------------------
   */

  if (error) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-[1.5rem]
          border
          border-red-100
          bg-red-50/70
          px-6
          py-14
          text-center
          backdrop-blur-xl
        "
      >
        <div
          className="
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-red-100
          "
        >
          <RefreshCcw className="h-6 w-6 text-red-500" />
        </div>

        <h3 className="text-base font-bold text-gray-900">
          Couldn't load the questions
        </h3>

        <p className="mt-2 max-w-md text-sm text-gray-500">
          {error.message || "Something went wrong while fetching discussions."}
        </p>
      </div>
    );
  }

  /*
   * ----------------------------------------------------------
   * No data
   * ----------------------------------------------------------
   */

  if (!data) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-[1.5rem]
          border
          border-white/80
          bg-white/60
          px-6
          py-16
          text-center
          shadow-lg
          shadow-gray-200/20
          backdrop-blur-xl
        "
      >
        <div
          className="
            mb-4
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-emerald-100
          "
        >
          <MessageCircleQuestion className="h-7 w-7 text-emerald-600" />
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          No discussions found
        </h3>

        <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          We couldn't find any questions matching your current search or
          filters.
        </p>
      </div>
    );
  }

  /*
   * ----------------------------------------------------------
   * Empty results
   * ----------------------------------------------------------
   */

  if (discussions.length === 0) {
    const hasFilters = title || filter || sortType || tagId;

    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-[1.5rem]
          border
          border-white/80
          bg-white/60
          px-6
          py-16
          text-center
          shadow-lg
          shadow-gray-200/20
          backdrop-blur-xl
        "
      >
        <div
          className="
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-100
            to-teal-100
          "
        >
          <Search className="h-7 w-7 text-emerald-600" />
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          {hasFilters ? "No questions match your search" : "No questions yet"}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          {hasFilters
            ? "Try changing your search term, filter, or sorting options."
            : "Be the first person to start a discussion with the community."}
        </p>

        {hasFilters && (
          <Button
            variant="outline"
            className="
              mt-5
              rounded-xl
              border-emerald-200
              bg-white/70
              text-emerald-700
              hover:bg-emerald-50
            "
            onClick={() => setPage(1)}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset results
          </Button>
        )}
      </div>
    );
  }

  /*
   * ----------------------------------------------------------
   * Render
   * ----------------------------------------------------------
   */

  return (
    <div className="space-y-6">
      {/* Question list */}

      <div className="space-y-4">
        <QuestionCard
          discussions={discussions}
          bookmarks={bookmarksSet}
          handleUpvotes={handleUpvotes}
          handleBookmark={handleBookmark}
        />
      </div>

      {/* Pagination */}

      {pageCount > 1 && (
        <div
          className="
            flex
            justify-center
            rounded-2xl
            border
            border-white/70
            bg-white/40
            px-4
            py-4
            backdrop-blur-md
          "
        >
          <Paginations
            page={page}
            onChange={(nextPage) => setPage(nextPage)}
            totalPages={pageCount}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionGrid;

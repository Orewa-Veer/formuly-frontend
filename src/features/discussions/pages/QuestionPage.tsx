import { Search, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useSocket } from "../../../services/useSocket";
import { FilterDiscuss } from "../components/FilterDiscuss";
import QuestionGrid from "../components/QuestionGrid";
import { SortDiscuss } from "../components/SortDiscuss";
import { FaArrowRight } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";

const QuestionPage = () => {
  const { socket, ready } = useSocket();

  useEffect(() => {
    if (!ready || !socket) return;

    socket.emit("questions:join");

    return () => {
      socket.emit("questions:leave");
    };
  }, [ready, socket]);

  const [tit, setTit] = useState("");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle(tit.trim());
  };

  const clearSearch = () => {
    setTit("");
    setTitle("");
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-emerald-50/40
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl" />

        <div className="absolute right-[-150px] top-[-100px] h-[28rem] w-[28rem] rounded-full bg-violet-300/15 blur-3xl" />

        <div className="absolute bottom-[-150px] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Small badge */}
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/80
                bg-white/60
                px-4
                py-2
                shadow-md
                shadow-emerald-100/30
                backdrop-blur-xl
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-100
                "
              >
                <IoIosRocket className="h-3.5 w-3.5 text-emerald-600" />
              </span>

              <span className="text-xs font-bold text-emerald-700">
                Explore the community
              </span>
            </div>

            <h1
              className="
                text-4xl
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-5xl
              "
            >
              Developer
              <span
                className="
                  ml-2
                  bg-gradient-to-r
                  from-emerald-500
                  via-teal-500
                  to-indigo-600
                  bg-clip-text
                  text-transparent
                "
              >
                Questions
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Find answers, explore discussions, and learn from developers
              tackling the same problems you are.
            </p>
          </div>

          {/* Ask Question */}

          <Button
            asChild
            className="
              group
              h-11
              w-full
              rounded-xl
              bg-gradient-to-r
              from-emerald-500
              to-teal-500
              px-6
              font-semibold
              text-white
              shadow-lg
              shadow-emerald-200
              transition-all
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-emerald-200
              sm:w-auto
            "
          >
            <Link to="/app/popup">
              Ask Question
              <FaArrowRight
                className="
                  ml-2
                  h-3.5
                  w-3.5
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>
          </Button>
        </div>

        {/* ===================================================
            SEARCH / FILTER PANEL
        ==================================================== */}

        <div
          className="
            mb-8
            rounded-[1.5rem]
            border
            border-white/80
            bg-white/60
            p-4
            shadow-lg
            shadow-gray-200/30
            backdrop-blur-xl
            sm:p-5
          "
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}

            <form onSubmit={handleClick} className="flex min-w-0 flex-1 gap-2">
              <div className="relative flex-1">
                <Search
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <Input
                  placeholder="Search questions..."
                  value={tit}
                  onChange={(e) => setTit(e.target.value)}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border-gray-200
                    bg-white/70
                    pl-11
                    pr-4
                    text-sm
                    shadow-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-emerald-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-100
                  "
                />
              </div>

              <Button
                type="submit"
                disabled={!tit.trim()}
                className="
                  h-11
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-teal-500
                  px-5
                  shadow-md
                  shadow-emerald-100
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Search className="h-4 w-4 sm:mr-2" />

                <span className="hidden sm:inline">Search</span>
              </Button>
            </form>

            {/* Divider */}

            <div className="hidden h-8 w-px bg-gray-200 lg:block" />

            {/* Filters */}

            <div className="flex flex-col gap-2 sm:flex-row">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white/50
                  px-3
                "
              >
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-gray-400" />

                <FilterDiscuss
                  value={filter}
                  setValue={(val) => setFilter(val)}
                />
              </div>

              <SortDiscuss value={sort} setValue={(val) => setSort(val)} />
            </div>
          </div>

          {/* Active search */}

          {title && (
            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-2
                border-t
                border-gray-200/70
                pt-4
              "
            >
              <span className="text-xs font-medium text-gray-500">
                Searching for
              </span>

              <button
                type="button"
                onClick={clearSearch}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-emerald-700
                  transition-colors
                  hover:bg-emerald-200
                "
              >
                "{title}"<span className="text-emerald-500">×</span>
              </button>
            </div>
          )}
        </div>

        {/* ===================================================
            QUESTION SECTION
        ==================================================== */}

        <div>
          {/* Section header */}

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {title ? "Search results" : "Latest questions"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {title
                  ? `Results matching "${title}"`
                  : "Discover what developers are discussing"}
              </p>
            </div>

            {(filter || sort) && (
              <div className="hidden items-center gap-2 sm:flex">
                {filter && (
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    Filter active
                  </span>
                )}

                {sort && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Sorted
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Questions */}

          <QuestionGrid sortType={sort} filter={filter} title={title} />
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;

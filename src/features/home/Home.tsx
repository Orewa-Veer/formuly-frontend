import { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Users } from "lucide-react";
import { FaArrowRight, FaCode, FaRegStar } from "react-icons/fa";
import { FaBullseye, FaRegMessage } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import { IoBulb } from "react-icons/io5";
import { MdElectricBolt, MdOutlinePeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

import { useSocket } from "../../services/useSocket";

const Tagis = [
  {
    name: "JavaScript",
    questions: 1234,
    color: "bg-orange-400",
    light: "bg-orange-100",
    text: "text-orange-600",
  },
  {
    name: "React",
    questions: 1200,
    color: "bg-blue-400",
    light: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    name: "Python",
    questions: 1000,
    color: "bg-green-400",
    light: "bg-green-100",
    text: "text-green-600",
  },
  {
    name: "Node.js",
    questions: 800,
    color: "bg-emerald-400",
    light: "bg-emerald-100",
    text: "text-emerald-600",
  },
  {
    name: "TypeScript",
    questions: 780,
    color: "bg-violet-400",
    light: "bg-violet-100",
    text: "text-violet-600",
  },
  {
    name: "CSS",
    questions: 600,
    color: "bg-indigo-400",
    light: "bg-indigo-100",
    text: "text-indigo-600",
  },
];

const features = [
  {
    title: "Smart Q&A System",
    description:
      "Advanced tagging and intelligent categorization makes it easier to discover the right answers.",
    icon: FaCode,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Expert Community",
    description:
      "Connect with developers across different experience levels and learn from people who have been there.",
    icon: MdOutlinePeopleAlt,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    title: "Knowledge Sharing",
    description:
      "Share solutions, explanations and ideas that help other developers grow alongside you.",
    icon: IoBulb,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    title: "Real-time Updates",
    description:
      "Stay connected with instant notifications for answers, mentions and discussions you follow.",
    icon: MdElectricBolt,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
];

const stats = [
  {
    value: "50K+",
    label: "Active Developers",
    icon: MdOutlinePeopleAlt,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    value: "125K+",
    label: "Questions Answered",
    icon: FaRegMessage,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    value: "98%",
    label: "Success Rate",
    icon: FaBullseye,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    value: "2.5K",
    label: "Expert Contributors",
    icon: FaRegStar,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const Home = () => {
  const { socket, ready } = useSocket();

  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || !socket) return;

    socket.emit("Latest:join");

    return () => {
      socket.emit("Latest:disconnected");
    };
  }, [ready, socket]);

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40">
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="absolute right-[-160px] top-[-120px] h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="absolute left-[45%] top-[850px] h-[350px] w-[350px] rounded-full bg-blue-300/10 blur-3xl" />

        <div className="absolute bottom-[700px] right-[-100px] h-[350px] w-[350px] rounded-full bg-orange-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative py-14 sm:py-20 lg:py-24">
          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              border
              border-white/80
              bg-white/55
              shadow-2xl
              shadow-emerald-100/30
              backdrop-blur-xl
            "
          >
            {/* Hero decorative blobs */}

            <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />

            <div className="pointer-events-none absolute bottom-[-180px] left-[-100px] h-[420px] w-[420px] rounded-full bg-violet-200/20 blur-3xl" />

            <div className="relative grid items-center gap-10 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-16 lg:py-20 xl:px-20">
              {/* -------------------------------------------------
                  HERO COPY
              -------------------------------------------------- */}

              <div>
                <div
                  className="
                    mb-7
                    inline-flex
                    items-center
                    gap-2.5
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50/80
                    px-4
                    py-2
                    shadow-sm
                  "
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <IoIosRocket className="h-3.5 w-3.5 text-emerald-600" />
                  </span>

                  <span className="text-sm font-semibold text-emerald-700">
                    A community built for developers
                  </span>
                </div>

                <h1
                  className="
                    max-w-3xl
                    text-5xl
                    font-extrabold
                    leading-[1.02]
                    tracking-tight
                    text-gray-900
                    sm:text-6xl
                    lg:text-7xl
                  "
                >
                  Ask.
                  <br />
                  <span
                    className="
                      bg-gradient-to-r
                      from-emerald-500
                      via-teal-500
                      to-indigo-600
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Learn. Grow.
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                  A place where developers ask questions, share knowledge, solve
                  problems and learn from one another.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={scrollToExplore}
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-3
                      rounded-xl
                      bg-gradient-to-r
                      from-emerald-500
                      to-teal-500
                      px-6
                      py-3.5
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-emerald-200
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:shadow-xl
                    "
                  >
                    Explore discussions
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <Link
                    to="/app/popup"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-white/75
                      px-6
                      py-3.5
                      font-semibold
                      text-gray-800
                      shadow-sm
                      backdrop-blur
                      transition-all
                      hover:-translate-y-0.5
                      hover:bg-white
                      hover:shadow-lg
                    "
                  >
                    Ask a Question
                    <FaRegMessage className="text-emerald-600" />
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Real developers
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Real discussions
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Real-time updates
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------
                  HERO VISUAL
              -------------------------------------------------- */}

              <div className="relative mx-auto w-full max-w-[520px]">
                {/* Decorative background circle */}

                <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-100 via-teal-50 to-indigo-100 blur-2xl" />

                {/* Main discussion card */}

                <div
                  className="
                    relative
                    rounded-[2rem]
                    border
                    border-white
                    bg-white/85
                    p-5
                    shadow-2xl
                    shadow-gray-200/60
                    backdrop-blur-xl
                  "
                >
                  {/* Fake browser header */}

                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                      Discussion
                    </span>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100">
                        <span className="h-3 w-3 rounded-full bg-orange-400" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-800">
                          JavaScript
                        </p>

                        <p className="text-[10px] text-gray-400">
                          Trending topic
                        </p>
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-snug text-gray-900">
                      Why is my async function returning undefined?
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                      I am trying to return data from an asynchronous function
                      but the value keeps coming back undefined...
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-600">
                        javascript
                      </span>

                      <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
                        async-await
                      </span>

                      <span className="rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-600">
                        promises
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] font-bold text-white">
                          VS
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold text-gray-700">
                            Veer
                          </p>

                          <p className="text-[10px] text-gray-400">
                            12 min ago
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <span className="text-lg leading-none">▲</span>
                          24
                        </span>

                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />8
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Answer preview */}

                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        3 answers
                      </p>

                      <p className="text-[10px] text-gray-500">
                        The community is helping
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}

                <div
                  className="
                    absolute
                    -bottom-5
                    -left-5
                    hidden
                    rounded-2xl
                    border
                    border-white
                    bg-white/90
                    p-3
                    shadow-xl
                    backdrop-blur-xl
                    sm:block
                  "
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-gray-800">
                        New answer
                      </p>

                      <p className="text-[10px] text-gray-400">Just now</p>
                    </div>
                  </div>
                </div>

                {/* Floating community badge */}

                <div
                  className="
                    absolute
                    -right-4
                    -top-5
                    hidden
                    rounded-2xl
                    border
                    border-white
                    bg-white/90
                    px-4
                    py-3
                    shadow-xl
                    backdrop-blur-xl
                    sm:block
                  "
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-violet-500" />

                    <span className="text-xs font-bold text-gray-700">
                      50K+ developers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <div className="relative border-t border-gray-200/70 bg-white/30">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className={`
                        flex
                        items-center
                        justify-center
                        gap-3
                        px-5
                        py-5
                        sm:py-6
                        ${
                          index < stats.length - 1
                            ? "border-b border-gray-200/60 lg:border-b-0 lg:border-r"
                            : ""
                        }
                        ${
                          index === 0 || index === 2
                            ? "border-r"
                            : "lg:border-r"
                        }
                      `}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                      >
                        <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                      </div>

                      <div>
                        <div className="text-xl font-extrabold text-gray-900">
                          {stat.value}
                        </div>

                        <div className="text-xs text-gray-500">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY CHOOSE CHEEKU
        ====================================================== */}

        <section ref={exploreRef} className="scroll-mt-8 py-24">
          <div className="mb-14 text-center">
            <span
              className="
                inline-flex
                rounded-full
                bg-indigo-100
                px-3
                py-1
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-indigo-600
              "
            >
              Why Cheeku?
            </span>

            <h2
              className="
                mt-5
                text-4xl
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-5xl
              "
            >
              Built by developers,
              <br />
              <span className="text-indigo-600">for developers.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Everything you need to ask better questions, discover useful
              answers and grow alongside a community that understands what
              you're building.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white
                    bg-white/70
                    p-7
                    shadow-lg
                    shadow-gray-200/30
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1.5
                    hover:bg-white/90
                    hover:shadow-xl
                  "
                >
                  {/* Accent line */}

                  <div
                    className={`
                      absolute
                      left-0
                      top-0
                      h-1
                      w-0
                      transition-all
                      duration-300
                      group-hover:w-full
                      ${
                        index === 0
                          ? "bg-blue-400"
                          : index === 1
                            ? "bg-emerald-400"
                            : index === 2
                              ? "bg-violet-400"
                              : "bg-orange-400"
                      }
                    `}
                  />

                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      ${feature.iconBg}
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    `}
                  >
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            TRENDING TECHNOLOGIES
        ====================================================== */}

        <section className="py-24">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-violet-100
                  px-3
                  py-1
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-violet-600
                "
              >
                What's trending
              </span>

              <h2
                className="
                  mt-5
                  text-4xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-5xl
                "
              >
                Trending
                <span className="text-violet-600"> Technologies</span>
              </h2>

              <p className="mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
                Explore the technologies developers are talking about right now.
              </p>
            </div>

            <Link
              to="/app/tags"
              className="
                group
                inline-flex
                items-center
                gap-2
                self-start
                rounded-xl
                border
                border-white
                bg-white/70
                px-4
                py-2.5
                text-sm
                font-semibold
                text-gray-700
                shadow-md
                backdrop-blur
                transition-all
                hover:bg-white
                md:self-auto
              "
            >
              View all tags
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Tagis.map((tag, index) => (
              <div
                key={tag.name}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white
                  bg-white/65
                  p-5
                  shadow-lg
                  shadow-gray-200/25
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/90
                  hover:shadow-xl
                "
              >
                {/* Small colored corner */}

                <div
                  className={`
                    absolute
                    right-0
                    top-0
                    h-16
                    w-16
                    translate-x-8
                    -translate-y-8
                    rounded-full
                    ${tag.light}
                    opacity-70
                  `}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        ${tag.light}
                      `}
                    >
                      <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">{tag.name}</h3>

                      <p className="text-xs text-gray-400">
                        Developer community
                      </p>
                    </div>
                  </div>

                  {index < 3 && (
                    <span
                      className={`
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        ${tag.light}
                        ${tag.text}
                      `}
                    >
                      Trending
                    </span>
                  )}
                </div>

                <div className="relative mt-7 flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                      {tag.questions.toLocaleString()}
                    </span>

                    <span className="ml-2 text-sm text-gray-500">
                      questions
                    </span>
                  </div>

                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      ${tag.light}
                      ${tag.text}
                      transition-transform
                      group-hover:translate-x-1
                    `}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${tag.color}`}
                    style={{
                      width: `${Math.min((tag.questions / 1300) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            COMMUNITY / HOW IT WORKS
        ====================================================== */}

        <section className="py-24">
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white
              bg-white/60
              shadow-xl
              shadow-gray-200/30
              backdrop-blur-xl
            "
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

            <div className="relative grid gap-12 p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
              <div>
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-emerald-700
                  "
                >
                  How it works
                </span>

                <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Ask something.
                  <br />
                  <span className="text-emerald-600">Get somewhere.</span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
                  Great developer communities aren't just about getting answers.
                  They're about helping people understand why something works.
                </p>

                <Link
                  to="/app/popup"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gray-900
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    transition
                    hover:-translate-y-0.5
                    hover:bg-gray-800
                  "
                >
                  Start a discussion
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  {
                    number: "01",
                    title: "Ask",
                    text: "Describe the problem and give people enough context to understand it.",
                    bg: "bg-blue-50",
                    color: "text-blue-600",
                  },
                  {
                    number: "02",
                    title: "Discuss",
                    text: "Get answers, ask follow-ups and collaborate with other developers.",
                    bg: "bg-emerald-50",
                    color: "text-emerald-600",
                  },
                  {
                    number: "03",
                    title: "Learn",
                    text: "Save useful knowledge and make the next problem easier to solve.",
                    bg: "bg-violet-50",
                    color: "text-violet-600",
                  },
                ].map((step) => (
                  <div
                    key={step.number}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm"
                  >
                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${step.bg}
                        ${step.color}
                        text-xs
                        font-extrabold
                      `}
                    >
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">{step.title}</h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="py-20">
          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              bg-gradient-to-r
              from-emerald-500
              via-teal-500
              to-indigo-600
              px-7
              py-16
              text-center
              shadow-2xl
              shadow-emerald-200/40
              sm:px-12
            "
          >
            <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <IoIosRocket className="h-7 w-7 text-white" />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
                Have something to ask?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Join the conversation, ask your question and get help from
                developers who have faced the same problems.
              </p>

              <Link
                to="/app/popup"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-white
                  px-7
                  py-3.5
                  font-bold
                  text-emerald-600
                  shadow-xl
                  transition-all
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                Ask a Question
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

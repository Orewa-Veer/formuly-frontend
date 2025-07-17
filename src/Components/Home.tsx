import { useEffect, useRef } from "react";
import { FaArrowRight, FaCode, FaRegStar } from "react-icons/fa";
import { FaBullseye, FaRegMessage } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import { IoBulb } from "react-icons/io5";
import { MdElectricBolt, MdOutlinePeopleAlt } from "react-icons/md";
import Cards from "./Cards";

import { Link } from "react-router-dom";
import useSocket from "../useHooks/useSocket";

const Tagis = [
  { name: "JavaScript", questions: 1234, color: "bg-orange-400" },
  { name: "React", questions: 1200, color: "bg-blue-400" },
  { name: "Python", questions: 1000, color: "bg-green-400" },
  { name: "Node.js", questions: 800, color: "bg-emerald-400" },
  { name: "Typescript", questions: 780, color: "bg-violet-400" },
  { name: "CSS", questions: 600, color: "bg-indigo-400" },
];
const Home = () => {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.emit("Latest:join");
    return () => {
      socket.emit("Latest:disconnected");
    };
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="flex flex-col p-3  px-6 md:px-8 lg:px-10 xl:px-14">
        {/* Colured Section */}
        <div className="flex flex-col items-center justify-between  ">
          {/* top button*/}
          <div className="flex  mb-8 shadow-md bg-white/20 rounded-full border-white/20 text-center border px-4 py-2 w-78 gap-2 backdrop-blur-sm hover:bg-white/50 hover:backdrop-blur-md ">
            <IoIosRocket className="text-emerald-700" />
            <span className="text-emerald-700 font-medium text-sm">
              Join 50,000+ developers worldwide
            </span>
          </div>
          {/* Tagline */}
          <h1 className="text-6xl font-extrabold text-gray-900 drop-shadow-md  mb-8 leading-tight  ">
            Where Developers <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {" "}
              Ask, Learn & Grow
            </span>
          </h1>

          {/* Description*/}
          <div className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed italic">
            Join our thriving community of developers. Ask questions, share
            knowledge, and collaborate on solutions that matter. From beginners
            to experts, everyone is welcome to learn and contribute.
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex sm:flex-row gap-6 justify-center mb-16">
            <button className="bg-white/20 border border-white/30 backdrop-blur-sm shadow-md transition-all duration-200 rounded-lg text-black  px-6 py-2 hover:bg-white/30">
              <div className="flex items-center gap-2 font-medium text-lg">
                <span onClick={scrollToHero}>Start Exploring</span>
                <FaArrowRight />
              </div>
            </button>
            <button className="bg-white/80 text-emerald-700 border border-emerald-500 backdrop-blur-sm font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-white hover:text-emerald-800 transition-all duration-200  ">
              <Link
                to="/app/popup"
                className="flex items-center gap-2 font-medium text-lg"
              >
                <span>Ask A Quesiton</span>
                <FaRegMessage />
              </Link>
            </button>
          </div>
          {/* Cards*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto ">
            <Cards>
              <MdOutlinePeopleAlt className="size-10 text-blue-600 mx-auto mb-3" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900 mb-2">
                  50K+
                </span>
                <span className="text-sm text-gray-600">Active Developers</span>
              </div>
            </Cards>
            <Cards>
              <FaRegMessage className="size-10 text-green-600 mx-auto mb-3" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900 mb-2">
                  125K+
                </span>
                <span className="text-sm text-gray-600">
                  Questions Answered
                </span>
              </div>
            </Cards>
            <Cards>
              <FaBullseye className="size-10 text-purple-600 mx-auto mb-3" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900 mb-2">
                  98%
                </span>
                <span className="text-sm text-gray-600">Success Rate</span>
              </div>
            </Cards>
            <Cards>
              <FaRegStar className="size-10 text-yellow-600 mx-auto mb-3" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900 mb-2">
                  2.5K
                </span>
                <span className="text-sm text-gray-600">
                  Expert Contributors
                </span>
              </div>
            </Cards>
          </div>
        </div>
        {/* Why Chosse Section*/}

        <div
          ref={heroRef}
          className="flex flex-col items-center py-20  backdrop-blur-sm "
        >
          {/* Heading*/}
          <div className="mb-16 text-center">
            <h2 className="text-5xl drop-shadow-lg backdrop-blur-lg font-bold text-gray-900 mb-6">
              Why Choose DevForum?
            </h2>
            {/* Description*/}
            <p className="text-xl font-semibold text-gray-600 max-w-3xl mx-auto italic">
              Built by developers, for developers. Experience the best way to
              learn and share knowledge.
            </p>
          </div>

          {/* Cards*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            <Cards>
              <div className="flex flex-col space-y-1.5 text-center-pb-4">
                <div className="size-16 flex justify-center items-center rounded-2xl mx-auto mb-4 bg-blue-500 deeply-nested-child group-hover/hoverRoot:scale-110 transition-transform">
                  <FaCode className="bg-blue-500 size-8  " />
                </div>
                <h3 className="text-center mb-1 font-semibold text-xl tracking-tight mt-2">
                  Smart Q&A System
                </h3>
              </div>
              <div className=" pt-0 text-center">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Advanced tagging and intelligent categorization for better
                  discoverability
                </p>
              </div>
            </Cards>
            <Cards>
              <div className="flex flex-col space-y-1.5 text-center-pb-4">
                <div className="size-16 flex justify-center items-center rounded-2xl mx-auto mb-4 bg-green-500 deeply-nested-child group-hover/hoverRoot:scale-110 transition-transform">
                  <MdOutlinePeopleAlt className="bg-green-500 size-8  " />
                </div>
                <h3 className="text-center mb-1 font-semibold text-xl tracking-tight mt-2">
                  Expert Community
                </h3>
              </div>
              <div className=" pt-0 text-center">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Connect with thousands of developers and get answers from
                  industry experts
                </p>
              </div>
            </Cards>
            <Cards>
              <div className="flex flex-col space-y-1.5 text-center-pb-4">
                <div className="size-16 flex justify-center items-center rounded-2xl mx-auto mb-4 bg-purple-500 deeply-nested-child group-hover/hoverRoot:scale-110 transition-transform">
                  <IoBulb className="bg-purple-500 size-8  " />
                </div>
                <h3 className="text-center mb-1 font-semibold text-xl tracking-tight mt-2">
                  Knowledge Sharing
                </h3>
              </div>
              <div className=" pt-0 text-center">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Comprehensive documentation and guides to help you learn and
                  grow
                </p>
              </div>
            </Cards>
            <Cards>
              <div className="flex flex-col space-y-1.5 text-center-pb-4">
                <div className="size-16 flex justify-center items-center rounded-2xl mx-auto mb-4 bg-orange-500 deeply-nested-child group-hover/hoverRoot:scale-110 transition-transform">
                  <MdElectricBolt className="bg-orange-500 size-8  " />
                </div>
                <h3 className="text-center mb-1 font-semibold text-xl tracking-tight mt-2">
                  Real-time Updates
                </h3>
              </div>
              <div className=" pt-0 text-center">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Get instant notifications for answers, mentions, and
                  discussions you follow
                </p>
              </div>
            </Cards>
          </div>
        </div>
        {/* Treding Tech*/}
        <div className="py-20    ">
          {/* Heading*/}
          <div className="text-center mb-16">
            <h2 className="text-5xl drop-shadow-lg backdrop-blur-lg font-bold text-gray-900 mb-6">
              Trending Technologies
            </h2>
            {/* Description*/}
            <p className="text-xl text-gray-600 italic font-semibold">
              Explore the most discussed technologies and topics
            </p>
          </div>
          {/* Cards*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {Tagis.map((tag) => (
              <Cards className="h-full w-full py-6" padding="p-4">
                {/* first section*/}
                <div className="flex  justify-between mb-4 w-full">
                  <div className="flex items-center justify-start gap-3">
                    <div className={`size-4 ${tag.color} rounded-full`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tag.name}
                    </h3>
                  </div>
                  {/* <div className="rounded-full flex items-center bg-green-100 text-green-500 border border-green-200">
                  <a href="" className="px-2 py-.5 font-semibold text-sm">
                    12%
                  </a>
                </div> */}
                </div>
                {/*Second Section */}
                <div className="flex flex-col  justify-start pl-3 w-full">
                  <span className="text-2xl font-bold text-gray-900">
                    {tag.questions}
                  </span>
                  <span className="text-sm text-gray-600">questions</span>
                </div>
                {/* third section */}
                <div className=" mt-4 h-2  rounded-full overflow-hidden w-full">
                  <div
                    className={`${tag.color} rounded-full h-full w-[82%] transition-all duration-500 group-hover:w-full`}
                  ></div>
                </div>
              </Cards>
            ))}
          </div>
        </div>
        {/* Questions*/}

        {/* <div className="pt-20 space-y-12 px-6 bg-gray-200 backdrop-blur-sm">
          <Latest />

          {/*Footer */}
        {/* <footer className="flex items-center w-full h-full  "> */}
        {/* <FooterM /> */}
        {/* </footer> */}
        {/* </div>  */}
      </div>
    </>
  );
};

export default Home;

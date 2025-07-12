import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useReplies } from "../useHooks/useReplies";
import { MdDelete } from "react-icons/md";
import Service from "../services/genricServices";
interface Props {
  id: string;
}
const ReplyList = ({ id }: Props) => {
  const { data, error, loading } = useReplies(id);
  if (loading) return <div>Loading Replies...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>No Replies Yet</div>;
  return (
    <div>
      <div className="ml-6 space-y-5 mt-6 text-gray-600">
        {data.map((rep) => (
          <div
            key={rep._id}
            className="backdrop-blur-lg shadow-lg  bg-white/20 border border-white/40 px-10 p-6 mx-10 gap-5  flex flex-col rounded-xl"
          >
            {/* user which replied */}
            <div className="flex items-center gap-3">
              {/* <img src={rep.user.avatar} alt="" className="size-6" /> */}
              <span>{rep.user.username}</span>
              <span className="text-sm flex gap-1 items-center">
                {rep.upvoteCounter}
                <GoTriangleUp />
              </span>
            </div>
            <p className="text-xs text-gray-1 00">
              {new Date(rep.createdAt).toLocaleString().slice(0, 9)}
            </p>
            {/* body  */}

            <div dangerouslySetInnerHTML={{ __html: rep.body }} />

            {/* footing */}
            <div className="flex gap-2 justify-end">
              <GoTriangleUp className="size-8 cursor-pointer" />
              <GoTriangleDown className="size-8 cursor-pointer" />
              <div
                className="flex items-center cursor-pointer hover:text-red-500"
                onClick={() => {
                  const reply = new Service("/api/replies");
                  reply.delete(rep._id);
                }}
              >
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyList;

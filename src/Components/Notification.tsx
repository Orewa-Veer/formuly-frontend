import { Bell } from "lucide-react";
import { Notifications } from "../models/Question";
import { useData } from "../useHooks/useData";

const Notification = () => {
  const { data, error, loading } = useData<Notifications>("/api/notification");
  console.log(data);
  return (
    <div className="p-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 ">
      {/* container  */}

      <div>
        {/* Header  */}
        <div className="flex gap-2 mb-3">
          <Bell /> <span>Notifications</span>
        </div>
        {/* Body  */}
        <div className="flex flex-col space-y-2">
          {/* Cards  */}
          {data.map((notific) => (
            <div className="bg-white/10 border border-white/20 rounded-sm backdrop-blur-md shadow-sm p-3">
              {`Someone ${notific.type} your discussion Titled ${notific.discussId} on ${notific.date}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;

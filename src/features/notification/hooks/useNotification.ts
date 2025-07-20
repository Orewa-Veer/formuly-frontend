import { Notifications } from "../../../types/Question";
import { useData } from "../../../useHooks/useData";

interface Props {
  type?: string;
  seen?: string;
  page?: number;
  limit?: number;
}
export const useNotification = ({
  type,
  seen = "false",
  page = 1,
  limit = 10,
}: Props) =>
  useData<Notifications>(
    "/api/notification",
    { params: { type: type, seen: seen, limit: limit, page: page } },
    [type, seen, page, limit]
  );

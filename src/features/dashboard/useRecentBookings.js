import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numOfDays = searchParams.get("last") ?? 7;
  const queryDate = subDays(new Date(), numOfDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numOfDays}`],
  });
  return { bookings, isLoading };
}

export default useRecentBookings;

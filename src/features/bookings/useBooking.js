import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const params = useParams();
  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", params.bookingId],
    queryFn: () => getBooking(params.bookingId),
    retry: false,
  });

  return { isLoading, booking };
}

export default useBooking;

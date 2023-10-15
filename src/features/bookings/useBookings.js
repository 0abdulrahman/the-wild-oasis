import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // FILTER
  const filterValue = searchParams.get("status") ?? "all";
  const filter = filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" };
  // SORT
  const [sortByField, sortByDirection] = (searchParams.get("sortBy") ?? "startDate-desc").split("-");
  const sortBy = { value: sortByField, direction: sortByDirection };
  // PAGINATION
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  // PRE-FETCHING
  if (currentPage !== Math.ceil(count / PAGE_SIZE))
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, currentPage + 1],
      queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
    });

  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, currentPage - 1],
      queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
    });

  return { isLoading, error, bookings, count };
}

export default useBookings;

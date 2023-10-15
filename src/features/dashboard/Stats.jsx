import PropTypes from "prop-types";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
  numOfDays: PropTypes.any,
  cabinsCount: PropTypes.number,
};

function Stats({ bookings, confirmedStays, numOfDays, cabinsCount }) {
  const numOfBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numOfDays * cabinsCount);

  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numOfBookings} />
      <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;

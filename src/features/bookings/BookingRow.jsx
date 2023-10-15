import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "./../../ui/Modal";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

BookingRow.propTypes = {
  booking: PropTypes.object,
};

function BookingRow({
  booking: {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button onClick={() => navigate(`/bookings/${id}`)}>{<HiEye />} See details</Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button onClick={() => navigate(`/check-in/${id}`)}>
                {<HiArrowDownOnSquare />} Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button onClick={() => checkout(id)} disabled={isCheckingOut}>
                {<HiArrowUpOnSquare />} Check out
              </Menus.Button>
            )}
            <Modal.Open opens="confirm-delete">
              <Menus.Button>{<HiTrash />} Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="confirm-delete">
          <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(id)} disabled={isDeleting} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

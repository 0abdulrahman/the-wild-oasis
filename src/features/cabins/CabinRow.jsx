import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import PropTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

function CabinRow({ cabin: { id, name, maxCapacity, regularPrice, discount, image, description } }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  return (
    <>
      <TableRow role="row">
        <div style={{ overflow: "hidden", aspectRatio: "3 / 2", transform: "scale(1.3)" }}>
          <Img src={image} />
        </div>
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{!discount ? <span>&mdash;</span> : formatCurrency(discount)}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  onClick={() =>
                    createCabin({ name: `Copy of ${name}`, maxCapacity, regularPrice, discount, image, description })
                  }
                >
                  <HiSquare2Stack /> Duplicate
                </Menus.Button>
                <Modal.Open opens="update-form">
                  <Menus.Button>
                    <HiPencil /> Edit
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="confirm-delete">
                  <Menus.Button>
                    <HiTrash /> Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="update-form">
              <CreateCabinForm cabin={{ id, name, maxCapacity, regularPrice, discount, image, description }} />
            </Modal.Window>

            <Modal.Window name="confirm-delete">
              <ConfirmDelete resourceName="cabin" onConfirm={() => deleteCabin(id)} disabled={isDeleting} />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

export default CabinRow;

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "./../features/cabins/CreateCabinForm";
import Button from "./../ui/Button";
import Modal from "./../ui/Modal";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <Modal>
          <Modal.Open opens="create-form">
            <Button>Add a new cabin</Button>
          </Modal.Open>
          <Modal.Window name="create-form">
            <CreateCabinForm />
          </Modal.Window>
        </Modal>
      </Row>
    </>
  );
}

export default Cabins;

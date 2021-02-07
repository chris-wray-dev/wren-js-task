import React, { Dispatch, SetStateAction} from 'react';
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button 
} from "reactstrap";
import { Farm } from '../../Data'

interface Props {
  addSheepModal: boolean,
  toggleAddSheepModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  setFarm: Dispatch<SetStateAction<Farm>>;
}

const AddSheep = (props: Props) => {
  const { addSheepModal, toggleAddSheepModal } = props;
  return (
    <Modal isOpen={addSheepModal} toggle={toggleAddSheepModal}>
      <ModalHeader toggle={toggleAddSheepModal}>Add A Sheep</ModalHeader>
      <ModalBody>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleAddSheepModal}>Do Something</Button>{' '}
        <Button color="secondary" onClick={toggleAddSheepModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddSheep;

import React, { Dispatch, SetStateAction} from 'react';
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button 
} from "reactstrap";
import { Farm } from '../../Data';
import SheepForm from './SheepForm';

interface Props {
  sheepModalOpen: boolean,
  toggleSheepModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  setFarm: Dispatch<SetStateAction<Farm>>;
}

const SheepModal = (props: Props) => {
  const { sheepModalOpen, toggleSheepModal } = props;
  return (
    <Modal isOpen={sheepModalOpen} toggle={toggleSheepModal}>
      <ModalHeader toggle={toggleSheepModal}>Add A Sheep</ModalHeader>
      <ModalBody>
        <SheepForm name={``} sex={``} branded={``}/>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleSheepModal}>Add Sheep</Button>{' '}
        <Button color="secondary" onClick={toggleSheepModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default SheepModal;

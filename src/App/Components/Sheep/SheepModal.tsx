import React, { Dispatch, SetStateAction} from 'react';
import { 
  Modal,
  ModalHeader,
  ModalBody
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
    </Modal>
  );
};

export default SheepModal;

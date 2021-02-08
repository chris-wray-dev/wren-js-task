import React from 'react';
import { 
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Sheep } from '../../Data/Sheep';
import SheepForm from './SheepForm';

interface Props {
  sheepModalOpen: boolean,
  toggleSheepModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  submitSheep: Function;
  sheep: Sheep | null;
  index: number;
}

const SheepModal = (props: Props) => {
  const { sheepModalOpen, toggleSheepModal, submitSheep, sheep, index } = props;
  return (
    <Modal isOpen={sheepModalOpen} toggle={toggleSheepModal}>
      <ModalHeader toggle={toggleSheepModal}>{sheep ? `Edit` : `Add`} sheep</ModalHeader>
      <ModalBody>
        <SheepForm sheep={sheep} toggleSheepModal={toggleSheepModal} submitSheep={submitSheep} index={index}/>
      </ModalBody>
    </Modal>
  );
};

export default SheepModal;

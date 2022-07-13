import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import RegisterStudentForm from './registerStudent/RegisterStudentForm';
import EditStudentForm from './editStudentForm/EditStudentForm';

const ModalForm = ({
  notify,
  userToEdit,
  setLoading,
  setDefaultModal,
  defaultModal,
  openModal,
  setOpenModal
}) => {
  // const [openModal, setOpenModal] = useState(false || handleOpenModal);

  const handleCloseModal = () => {
    setDefaultModal(true);
    setOpenModal(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    padding: 30,
    borderRadius: 5
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style} bgcolor="whitesmoke">
        {defaultModal ? (
          <RegisterStudentForm setOpenModal={setOpenModal} notify={notify} />
        ) : (
          <EditStudentForm
            user={userToEdit}
            notify={notify}
            setOpenModal={setOpenModal}
            setDefaultModal={setDefaultModal}
            setLoading={setLoading}
          />
        )}
      </Box>
    </Modal>
  );
};
export default ModalForm;

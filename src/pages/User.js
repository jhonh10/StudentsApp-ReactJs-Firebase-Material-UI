import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { ToastContainer, toast } from 'react-toastify';
// material
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
// components
import UsersTable from '../components/UsersTable';
import Page from '../components/Page';
import SkeletonTable from '../components/SkeletonTable';
import EmptyStateCard from '../components/EmptyStateCard';
import ModalForm from '../components/ModalForm';
// services and customHooks
import { getStudents } from '../firebase/client';
import useUser from '../hooks/useUser';
// ----------------------------------------------------------------------

export default function User() {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [defaultModal, setDefaultModal] = useState(true);
  const [userToEdit, setUserToEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const notify = (msg) => toast.success(msg);
  const noStudents = students.length === 0;

  // TODO: MOVER MODAL A UN COMPONENTE PARA EVITAR RENDERIZAR USER

  useEffect(() => {
    setLoading(true);
    let unsuscribe;
    if (user) {
      unsuscribe = getStudents(setStudents, setLoading);
    }
    return () => unsuscribe && unsuscribe();
  }, [user]);

  const handleOpenModal = () => setOpenModal(true);

  return (
    <Page title="Alumnos | Cemaqui">
      <Container>
        <ModalForm
          handleOpenModal={handleOpenModal}
          notify={notify}
          userToEdit={userToEdit}
          setLoading={setLoading}
          setDefaultModal={setDefaultModal}
          defaultModal={defaultModal}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Alumnos
          </Typography>
          {!noStudents && (
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleOpenModal}
            >
              Agregar Alumno
            </Button>
          )}
        </Stack>
        {noStudents && !loading ? (
          <EmptyStateCard openModal={handleOpenModal} />
        ) : (
          <Card>
            {loading ? (
              <SkeletonTable />
            ) : (
              <UsersTable
                students={students}
                setDefaultModal={setDefaultModal}
                setOpenModal={setOpenModal}
                setUserToEdit={setUserToEdit}
                loading={loading}
              />
            )}
          </Card>
        )}
      </Container>
    </Page>
  );
}

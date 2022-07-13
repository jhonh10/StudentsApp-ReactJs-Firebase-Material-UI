import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import swal from 'sweetalert';
import { deleteStudent } from '../../../firebase/client';

// ----------------------------------------------------------------------
UserMoreMenu.propTypes = {
  user: PropTypes.object,
  setDefaultModal: PropTypes.func,
  setOpenModal: PropTypes.func,
  setUserToEdit: PropTypes.func,
  setSelected: PropTypes.func
};
export default function UserMoreMenu({
  user,
  setDefaultModal,
  setOpenModal,
  setUserToEdit,
  setSelected
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
    setSelected([]);
  };
  const handleDelete = () => {
    swal({
      title: 'Eliminar 1 Alumno',
      text: 'Esta acción no puede deshacerse.',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        try {
          deleteStudent([user.cedula]);
          swal('Alumno Eliminado Correctamente!', {
            icon: 'success'
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const handleEdit = () => {
    setDefaultModal(false);
    setOpenModal(true);
    setIsOpen(false);
    setUserToEdit({
      firstName: user?.nombre,
      lastName: user?.apellido,
      cedula: user?.cedula,
      curso: user?.curso,
      resolucion: user?.resolucion,
      uid: user?.uid,
      añoExpedicion: user?.añoExpedicion
    });
  };
  return (
    <>
      <IconButton ref={ref} onClick={handleOpenMenu}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={handleEdit}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

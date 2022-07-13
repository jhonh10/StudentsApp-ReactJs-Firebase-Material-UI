import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material ui
import {
  Stack,
  Table,
  Avatar,
  Checkbox,
  Typography,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
import { filter } from 'lodash';
// components
import { UserListHead, UserListToolbar, UserMoreMenu } from './_dashboard/user';
import Scrollbar from './Scrollbar';
import SearchNotFound from './SearchNotFound';

const TABLE_HEAD = [
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'curso', label: 'Curso', alignRight: false },
  { id: 'resolucion', label: 'Resolucion', alignRight: false },
  { id: 'cedula', label: 'Cedula', alignRight: false },
  { id: 'exp', label: 'Fecha Expedicion', alignRight: false },
  { id: 'ven', label: 'Fecha Vencimiento', alignRight: false },
  { id: 'phone', label: 'Celular', alignRight: false }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.nombre.toLowerCase().includes(query.toLowerCase()) ||
        _user.apellido.toLowerCase().includes(query.toLowerCase()) ||
        _user.cedula.toString().includes(query.toString())
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const UsersTable = ({ students, setDefaultModal, setOpenModal, setUserToEdit, loading }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nombre');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (event, cedula) => {
    const selectedIndex = selected.indexOf(cedula);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, cedula);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.cedula);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  const isUserNotFound = filteredUsers.length === 0;

  const option1 = filteredUsers.length <= 5;

  const option2 = filteredUsers.length <= 10;

  const option3 = filteredUsers.length > 10;

  return (
    <>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        selected={selected}
        setSelected={setSelected}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={filteredUsers.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { uid, nombre, apellido, resolucion, curso, createdAt, cedula } = row;
                  const isItemSelected = selected.indexOf(cedula) !== -1;
                  return (
                    <TableRow
                      hover
                      key={uid}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, cedula)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={nombre} src="/broken-image.jpg" />
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {`${nombre} ${apellido}`}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{curso}</TableCell>
                      <TableCell align="left">{resolucion}</TableCell>
                      <TableCell align="left">{cedula}</TableCell>
                      <TableCell align="left">{createdAt}</TableCell>
                      <TableCell align="left">16 de febrero de 2023</TableCell>
                      <TableCell align="left">3012345678</TableCell>
                      <TableCell align="right">
                        <UserMoreMenu
                          setDefaultModal={setDefaultModal}
                          user={row}
                          setOpenModal={setOpenModal}
                          setUserToEdit={setUserToEdit}
                          setSelected={setSelected}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && !loading && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={(option1 && []) || (option2 && [5, 10]) || (option3 && [5, 10, 25])}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por pagina"
      />
    </>
  );
};

export default React.memo(UsersTable);

UsersTable.propTypes = {
  students: PropTypes.array,
  setDefaultModal: PropTypes.func,
  setOpenModal: PropTypes.func,
  setUserToEdit: PropTypes.func,
  loading: PropTypes.bool
};

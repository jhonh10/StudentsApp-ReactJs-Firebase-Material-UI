import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Sin Resultados
      </Typography>
      <Typography variant="body2" align="center">
        No se encontraron registros para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Intente buscar por nombre, apellido o numero de
        identificacion.
      </Typography>
    </Paper>
  );
}

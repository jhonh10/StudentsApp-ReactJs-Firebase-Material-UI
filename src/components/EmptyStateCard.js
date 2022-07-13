import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, Typography, CardContent, Button } from '@mui/material';

const style = {
  maxWidth: 600,
  textAlign: 'center',
  alignItems: 'center',
  padding: 2,
  positon: 'absolute',
  mx: 'auto'
};

const EmptyStateCard = ({ openModal }) => (
  <Card sx={style}>
    <CardMedia
      component="img"
      image="/static/illustrations/ilustration_students.jpg"
      alt="estudiantes ilustracion"
      sx={{ width: 300, height: 200, mx: 'auto', objectFit: 'contain' }}
    />
    <CardContent sx={{ alignItems: 'center' }}>
      <Typography gutterBottom variant="h5" component="div">
        Agregar y gestionar tus alumnos
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Aquí es donde agregarás alumnos y gestionarás su informacion.
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" sx={{ mx: 'auto' }} onClick={openModal}>
        Agregar Alumno
      </Button>
    </CardActions>
  </Card>
);

export default EmptyStateCard;

EmptyStateCard.propTypes = {
  openModal: PropTypes.func
};

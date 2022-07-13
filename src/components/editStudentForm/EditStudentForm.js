import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UpdateStudent, validateIfStudentExists } from '../../firebase/client';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------
EditStudentForm.propTypes = {
  setOpenModal: PropTypes.func,
  setDefaultModal: PropTypes.func,
  notify: PropTypes.func,
  user: PropTypes.object
};
const courses = [
  {
    name: '',
    label: 'Seleccione un curso'
  },
  {
    name: 'Montacarga',
    label: 'Montacarga'
  },
  {
    name: 'Retroexcavadora',
    label: 'Retroexcavadora'
  },
  {
    name: 'Retro Oruga',
    label: 'Retro Oruga'
  }
];
const resolutions = [
  {
    name: '',
    label: ''
  },
  {
    name: 'Resolucion 2888 de 2007 Decreto 4904 de 2009 MEN',
    label: 'Resolucion 2888 de 2007 Decreto 4904 de 2009 MEN'
  },
  {
    name: 'Resolucion 1409 de 2012 Decreto 4904 de 2009 MEN',
    label: 'Resolucion 1409 de 2012 Decreto 4904 de 2009 MEN'
  }
];
export default function EditStudentForm({ setOpenModal, notify, user, setDefaultModal }) {
  const [exists, setExists] = useState(false);
  const validate = () => {
    const errors = {};
    if (exists) {
      errors.cedula = 'Ya existe un registro con este documento';
    }
    return errors;
  };
  const handleValidate = async (e) => {
    setExists(await validateIfStudentExists({ id: e }));
  };
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Muy Corto!')
      .max(50, 'Muy Largo!')
      .required('Nombre es requerido'),
    lastName: Yup.string()
      .min(2, 'Muy Corto!')
      .max(50, 'Muy Largo!')
      .required('Apellido es requerido'),
    cedula: Yup.number().required('Cedula es requerida'),
    curso: Yup.string().required('Seleccione un curso'),
    resolucion: Yup.string().required('Seleccione la resolucion vigente')
  });

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      cedula: user.cedula,
      curso: user.curso,
      resolucion: user.resolucion,
      uid: user.uid,
      añoExpedicion: user.añoExpedicion
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      try {
        await UpdateStudent(values);
        setOpenModal(false);
        setDefaultModal(true);
        notify('Alumno actulizado correctamente');
      } catch (error) {
        console.log(error);
      }
    },
    validate
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    handleChange,
    handleBlur
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nombres"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Apellidos"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            label="Numero de cedula"
            type="number"
            value={values.cedula}
            {...getFieldProps('cedula')}
            error={Boolean(touched.cedula && errors.cedula)}
            helperText={touched.cedula && errors.cedula}
            onChange={(e) => {
              handleValidate(e.currentTarget.value);
              handleChange(e);
            }}
          />

          <TextField
            id="outlined-select-currency-native"
            select
            label="Curso Aprobado"
            value={values.curso}
            {...getFieldProps('curso')}
            onChange={handleChange}
            onBlur={handleBlur}
            SelectProps={{
              native: true
            }}
            error={Boolean(touched.curso && errors.curso)}
            helperText={touched.curso && errors.curso}
          >
            {courses.map((option) => (
              <option key={option.name} value={option.name}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Resolucion Vigente"
            value={values.resolucion}
            {...getFieldProps('resolucion')}
            onChange={handleChange}
            onBlur={handleBlur}
            SelectProps={{
              native: true
            }}
            error={Boolean(touched.resolucion && errors.resolucion)}
            helperText={touched.resolucion && errors.resolucion}
          >
            {resolutions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.label}
              </option>
            ))}
          </TextField>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Actualizar Alumno
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { validateIfStudentExists } from '../../../firebase/client';

// ----------------------------------------------------------------------

export default function CertificationForm() {
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const exists = await validateIfStudentExists({
        id: values.documentID
      });
      if (exists) {
        navigate(`/diploma/${values.documentID}`);
      } else {
        errors.documentID = 'Usuario no encontrado';
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterSchema = Yup.object().shape({
    documentID: Yup.number()
      .min(4, 'Documento parece invalido!')
      .required('Numero de cedula es requerido')
  });

  const formik = useFormik({
    initialValues: {
      documentID: ''
    },
    validationSchema: RegisterSchema,
    onSubmit
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, handleChange } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              type="number"
              label="Numero de cedula"
              {...getFieldProps('documentID')}
              value={values.documentID}
              onChange={handleChange}
              error={Boolean(touched.documentID && errors.documentID)}
              helperText={touched.documentID && errors.documentID}
            />
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Consultar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

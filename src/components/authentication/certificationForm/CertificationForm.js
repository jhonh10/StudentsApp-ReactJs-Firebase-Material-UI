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

  const onSubmit = () => {
    navigate(`/diploma/${values.documentID}`);
  };

  const RegisterSchema = Yup.object().shape({
    documentID: Yup.string()
      .matches(/^[0-9]+$/, 'Ingrese solo numeros sin puntos ni comas')
      .min(5, 'No parece un documento valido')
      .required('Numero de cedula es requerido')
      .test('documentId', 'No se encontraron registros para este documento', async (value) => {
        const response = await validateIfStudentExists({ id: value });
        return response;
      })
  });

  const formik = useFormik({
    initialValues: {
      documentID: ''
    },
    validationSchema: RegisterSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    getFieldProps,
    handleChange,
    handleBlur,
    handleSubmit
  } = formik;

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
              onKeyUp={handleChange}
              onBlur={handleBlur}
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

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Page from '../components/Page';
import { validateIfStudentExists } from '../firebase/client';

const Diploma = () => {
  const [userData, setUserData] = useState({});
  const { studentId } = useParams();
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    const user = await validateIfStudentExists({ id: studentId, callback: setUserData });
    if (!user) navigate('/certificaciones');
  }, [navigate, studentId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return (
    <Page title={`Diploma | ${userData.nombre} ${userData.apellido}`}>
      <Container>
        <h1>
          {userData.nombre} {userData.apellido}
        </h1>
        <p>{userData.curso}</p>
        <p>{userData.resolucion}</p>
        <p>{userData.createdAt}</p>
      </Container>
    </Page>
  );
};
export default Diploma;

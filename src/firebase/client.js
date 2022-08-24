import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = getAuth(app);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    email,
    uid
  };
};

const formatDate = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date);

const mapStudentFromFirebase = (doc) => {
  const data = doc.data();
  const uid = doc.id;
  const { añoExpedicion } = data;
  return {
    ...data,
    uid,
    createdAt: formatDate(añoExpedicion.toDate(), 'es', { dateStyle: 'long' })
  };
};

export const StateChanged = (onChange) =>
  onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });

export function SigIn({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function LogOut() {
  return signOut(auth);
}

export const getStudents = (callback, callback2) =>
  db
    .collection('Alumnos')
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newStudents = docs.map(mapStudentFromFirebase);
      callback(newStudents);
      callback2(false);
    });

export const validateIfStudentExists = ({ id, callback = () => {} }) => {
  if (id === '' || undefined) return false;
  return db
    .collection('Alumnos')
    .doc(`${id}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const newStudent = mapStudentFromFirebase(doc);
        callback(newStudent);
        return true;
      }
      callback({});
      return false;
    });
};

export const registerStudent = ({ firstName, lastName, cedula, curso, resolucion, lastDate }) =>
  db
    .collection('Alumnos')
    .doc(`${cedula}`)
    .set({
      nombre: firstName,
      apellido: lastName,
      cedula,
      curso,
      añoExpedicion: lastDate || firebase.firestore.Timestamp.fromDate(new Date()),
      resolucion
    });
export const UpdateStudent = ({
  uid,
  firstName,
  lastName,
  cedula,
  curso,
  resolucion,
  añoExpedicion
}) => {
  const documentId = Number(cedula);
  const uniqueId = Number(uid);
  const lastDate = añoExpedicion;
  if (uniqueId === documentId) {
    db.collection('Alumnos').doc(`${uid}`).set(
      {
        nombre: firstName,
        apellido: lastName,
        cedula,
        curso,
        resolucion
      },
      { merge: true }
    );
  }
  if (uniqueId !== documentId) {
    deleteStudent([uniqueId]);
    registerStudent({ firstName, lastName, cedula, curso, resolucion, lastDate });
  }
};

export const deleteStudent = (id) => {
  id.map((id) => db.collection('Alumnos').doc(`${id}`).delete());
};

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB6a9eCbU7-3aL9Fkni7dNrhk6tgcX6pGo',
  authDomain: 'expensify-bea3d.firebaseapp.com',
  projectId: 'expensify-bea3d',
  storageBucket: 'expensify-bea3d.appspot.com',
  messagingSenderId: '451571285915',
  appId: '1:451571285915:web:5bf6b280c1a49107ba6b3e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;

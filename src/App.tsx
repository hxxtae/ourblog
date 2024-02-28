import { useContext, useEffect, useState } from 'react';
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeContext } from 'context/ThemeContext';
import Router from 'components/Router';
import Loader from 'components/Loader';

function App() {
  const auth = getAuth(app);
  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  // NOTE: Loading State (최초 마운트 되었을 때, 새로고침 되었을 때)
  const [init, setInit] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });    
  }, [auth]);

  return (
    <div className={theme}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;

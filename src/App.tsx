import { useState } from 'react';
import { app } from 'firebaseApp';
import { getAuth } from 'firebase/auth';

import Router from 'components/Router';

function App() {
  const auth = getAuth(app);
  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  return (
    <Router isAuthenticated={isAuthenticated} />
  );
}

export default App;

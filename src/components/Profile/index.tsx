import { useContext } from 'react';
import { app } from 'firebaseApp';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { AuthContext } from 'context/AuthContext';
import './style.css';

const onSignOut = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");
  } catch (err: any) {
    toast.error(err?.code);
  }
}

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName || "사용자"}</div>
        </div>
      </div>
      <div
        role="presentation"
        className="profile__logout"
        onClick={onSignOut}
      >
        로그아웃
      </div>
    </div>
  );
}
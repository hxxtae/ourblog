import { Link } from 'react-router-dom';
import './style.css';

export default function Profile() {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">test.test.com</div>
          <div className="profile__name">김희태</div>
        </div>
      </div>
      <Link to={"/"} className="profile__logout">
        로그아웃
      </Link>
    </div>
  );
}
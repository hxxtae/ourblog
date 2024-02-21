import { Link } from 'react-router-dom';
import './style.css';

export default function Header() {
  return (
    <header className="header">
      <div>
        <Link to={"/"} className="header__logo">React Blog</Link>
      </div>
      <div>
        <Link to={"/posts/new"}>글쓰기</Link>
        <Link to={"/postㄴnew"}>게시글</Link>
        <Link to={"/profile"}>프로필</Link>
      </div>
    </header>
  )
}
import { Link } from 'react-router-dom';

import './style.css';

export default function Footer() {
  return (
    <footer>
      <Link to={"/posts/new"}>글쓰기</Link>
      <Link to={"/postㄴnew"}>게시글</Link>
      <Link to={"/profile"}>프로필</Link>
    </footer>
  )
}
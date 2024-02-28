import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsSunFill, BsMoonFill } from "react-icons/bs";

import { ThemeContext } from 'context/ThemeContext';
import './style.css';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div>
        <Link to={"/"} className="header__logo">React Blog</Link>
      </div>
      <div>
        <Link to={"/posts/new"}>글쓰기</Link>
        <Link to={"/posts"}>게시글</Link>
        <Link to={"/profile"}>프로필</Link>
        {theme === "light" ? 
          <BsSunFill className="theme-btn" onClick={toggleTheme} /> : 
          <BsMoonFill className="theme-btn" onClick={toggleTheme} />}
      </div>
    </header>
  )
}
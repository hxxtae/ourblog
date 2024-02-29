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
        <Link to={"/"} className="header__logo">
          {theme === "light" ?
            <img className="header__img" src="https://github.com/hxxtae/task-list/assets/79623316/5f09584c-e97c-4d79-8782-ae84f2d8d192" alt="light__logo" /> :
            <img className="header__img" src="https://github.com/hxxtae/task-list/assets/79623316/43f03213-23da-4ca5-873f-30e95c7d9590" alt="dark__logo" />}
        </Link>
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
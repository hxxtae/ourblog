import { Link } from 'react-router-dom';

import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HomePage() {
  return (
    <div>
      <Header/>
      <div className="post__navigation">
        <div className="post__navigation--active">전체</div>
        <div>나의 글</div>
      </div>
      <div className="post__list">
        {[...Array(10)].map((e, idx) => (
          <div key={idx} className="post__box">
            <Link to={`/posts/${idx}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">패스트캠퍼스</div>
                <div className="post__date">2023.07.08 토요일</div>
              </div>
              <div className="post__title">게시글 {idx}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas nobis necessitatibus explicabo corrupti debitis, qui asperiores officiis quibusdam! Eum facilis tempora quasi! Temporibus, minima reprehenderit. Molestiae unde velit magni?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas nobis necessitatibus explicabo corrupti debitis, qui asperiores officiis quibusdam! Eum facilis tempora quasi! Temporibus, minima reprehenderit. Molestiae unde velit magni?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas nobis necessitatibus explicabo corrupti debitis, qui asperiores officiis quibusdam! Eum facilis tempora quasi! Temporibus, minima reprehenderit. Molestiae unde velit magni?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas nobis necessitatibus explicabo corrupti debitis, qui asperiores officiis quibusdam! Eum facilis tempora quasi! Temporibus, minima reprehenderit. Molestiae unde velit magni?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas nobis necessitatibus explicabo corrupti debitis, qui asperiores officiis quibusdam! Eum facilis tempora quasi! Temporibus, minima reprehenderit. Molestiae unde velit magni?
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__update">수정</div>
              </div>
              
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

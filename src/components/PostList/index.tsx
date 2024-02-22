import { Link } from 'react-router-dom';
import { useState } from 'react';

import './style.css';

type TabType = 'all' | 'my';

interface PostListProps {
  hasNavigation?: boolean;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role='presentation'
            className={activeTab === "all" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab('all')}
          >
            전체
          </div>
          <div
            role='presentation'
            className={activeTab === "my" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab('my')}
          >
            나의 글
          </div>
        </div>
      )}
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
                <div className="post__edit">수정</div>
              </div>
              
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
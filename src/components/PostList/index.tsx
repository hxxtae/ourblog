import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from 'firebaseApp';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { AuthContext } from 'context/AuthContext';
import './style.css';
import { toast } from 'react-toastify';

type TabType = 'all' | 'my';

export type PostProps = {
  id: string;
  email: string;
  title: string;
  summary: string;
  content: string;
  createAt: string;
  updatedAt?: string;
}

interface PostListProps {
  hasNavigation?: boolean;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]); // 초기화
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const docData = { id: doc?.id, ...doc?.data() } as PostProps;
      setPosts((prev) => ([
        ...prev,
        docData
      ]));
    });
  }

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        toast.success("게시글이 삭제되었습니다.");
        getPosts();
      } catch (err: any) {
        toast.error(err?.code);
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

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
        {posts?.length > 0 ? posts.map((post) => (
          <div key={post.id} className="post__box">
            <Link to={`/posts/${post.id}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">{ post.email }</div>
                <div className="post__date">{ post.createAt }</div>
              </div>
              <div className="post__title">{ post.title }</div>
              <div className="post__text">{post.summary}</div>
            </Link>
            {post.email === user?.email && (
              <div className="post__utils-box">
                <div
                  role="presentation"
                  className="post__delete"
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </div>
                <Link
                  className="post__edit"
                  to={`/posts/edit/${post.id}`}>
                  수정
                </Link>
              </div>
            )}
          </div>
        )) : <div className="post__no-post">게시글이 없습니다.</div>}
      </div>
    </>
  )
}
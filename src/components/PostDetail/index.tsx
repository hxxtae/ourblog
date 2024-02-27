import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { db } from 'firebaseApp';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

import { PostProps } from 'components/PostList';
import Loader from 'components/Loader';
import './style.css';
import { toast } from 'react-toastify';

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docSnap = await getDoc(doc(db, "posts", id));
      if (docSnap.exists()) {
        setPost({
          id: docSnap.id,
          ...docSnap.data()
        } as PostProps);
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        toast.success("게시글이 삭제되었습니다.");
        navigate(-1);
      } catch (err: any) {
        toast.error(err?.code);
        console.error(err);
      }
    }
  }

  useEffect(() => {
    if (params?.id) getPost(params.id);
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">
              {post.title}
            </div>
            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">{ post.email }</div>
              <div className="post__date">{ post.createAt }</div>
            </div>
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
            <div className="post__text post__text--pre-wrap">
              {post.content}
            </div>
          </div>) :
          <Loader />}
      </div>
    </>
  )
}
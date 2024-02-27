import React, { useContext, useEffect, useState } from 'react';
import { db } from 'firebaseApp';
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from 'context/AuthContext';
import { PostProps } from 'components/PostList';
import './style.css';

export default function PostForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (post && post.id) {
      // firebase로 데이터 수정
      try {
        updateDoc(doc(db, "posts", post.id), {
          title,
          summary,
          content,
          updatedAt: new Date()?.toLocaleDateString(),
        });

        toast.success("게시글을 수정했습니다.");
        navigate("/");
      } catch (err: any) {
        console.error(err?.code);
        toast.error(err?.code);
      }
    } else {
      // firebase로 데이터 생성
      try {
        await addDoc(collection(db, "posts"), {
          title,
          summary,
          content,
          createAt: new Date()?.toLocaleDateString(),
          email: user?.email
        });
  
        toast.success("게시글을 생성했습니다.");
        navigate("/");
      } catch (err: any) {
        console.error(err);
        toast.error(err?.code);
      }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'summary') {
      setSummary(value);
    }

    if (name === 'content') {
      setContent(value);
    }
  }

  useEffect(() => {
    if (params?.id) getPost(params.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
    }
  }, [post]);

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={onChange}
          value={title}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          onChange={onChange}
          value={summary}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          onChange={onChange}
          value={content}
          required
        />
      </div>
      <div className="form__block">
        <input type="submit" value={post ? "수정" : "제출"} className="form__btn--submit" />
      </div>
    </form>
  )
}
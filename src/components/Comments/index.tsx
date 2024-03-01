import React, { useCallback, useContext, useState } from 'react'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { toast } from 'react-toastify';

import { PostProps } from 'components/PostList';
import { AuthContext } from 'context/AuthContext';
import CommentBox from './CommentBox';
import './style.css';

export type CommentProps = {
  id: string;
  uid: string;
  email: string;
  createdAt: string;
  content: string;
}

interface CommentsProps {
  post: PostProps | null;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const [comment, setComment] = useState<string>("");
  const [setting, setSetting] = useState<string>("");
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, scrollHeight, } = e.target;
    e.target.style.height = (scrollHeight - 10) + "px";

    if (name === "comment") {
      setComment(value);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user?.uid || !user?.email) return;
    if (post && post?.id) {
      const queryPostRef = doc(db, "posts", post.id);
      const queryComment: CommentProps = {
        id: Date.now().toString(),
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        content: comment,
      };

      try {
        await updateDoc(queryPostRef, {
          comments: arrayUnion(queryComment)
        });

        getPost(post.id);
        setComment("");
      } catch (err: any) {
        console.error(err);
        toast.error(err?.code);
      }
    }
  }

  const handleDeleteComment = useCallback(async (data: CommentProps) => {
    if (!user?.uid) return;
    if (!post?.id) return;

    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const queryRef = doc(db, "posts", post.id);
      try {
        await updateDoc(queryRef, {
          comments: arrayRemove(data),
        });

        getPost(post.id);
      } catch (err: any) {
        console.error(err);
        toast.error(err?.code);
      }
    }
  }, [user?.uid, post?.id, getPost]);

  const onClickSetting = useCallback((id: string, $parent: Node, $target: Node) => {
    setSetting((prev) => {
      if (prev && !$parent.contains($target)) return "";
      if (prev === id) return "";
      return id;
    });
  }, []);

  return (
    <div className="comments">
      <div className="comments__board">
        <form className="comments__form" onSubmit={handleSubmit}>
          <div className="form__wrapper">
            <label htmlFor="comment">댓글 입력</label>
            <textarea name="comment" id="comment" value={comment} onChange={onChange} required />
          </div>
          <div className="form__wrapper">
            <input type="submit" value="댓글" className="form__btn-submit" />
          </div>
        </form>
      </div>

      <div className="comments__list">
        {post?.comments && post.comments?.slice(0).reverse().map((comment) => (
          <CommentBox
            key={comment.id}
            comment={comment}
            modalVisible={setting === comment.id}
            onClickSetting={onClickSetting}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  )
}
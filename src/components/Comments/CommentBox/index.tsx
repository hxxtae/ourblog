import { IoMdMore } from 'react-icons/io';
import { memo, useContext, useRef } from 'react';

import { CommentProps } from '..';
import './style.css';
import { AuthContext } from 'context/AuthContext';

interface CommentBoxProps {
  comment: CommentProps;
  modalVisible: boolean;
  onClickSetting: (id: string, $parent: Node, $target: Node) => void;
  handleDeleteComment: (data: CommentProps) => Promise<void>;
}

function CommentBox({ comment, modalVisible, onClickSetting, handleDeleteComment }: CommentBoxProps) {
  console.log('box');
  const ref = useRef(null);
  const { user } = useContext(AuthContext);

  return (
    <div className="comment__box" key={comment.id}>
      <div className="comment__box-main">
        <div className="comment__profile">
          <div className="comment__profile-image">
            <img src="" alt="profile image" />
          </div>
          <div className="comment__profile-info">
            <div className="comment__email">{comment.email}</div>
            <div className="comment__date">{comment.createdAt}</div>
          </div>
          <div ref={ref} className="comment__profile-setting">
            <IoMdMore className="setting__icon" onClick={(e: any) => onClickSetting(comment.id, ref.current!, e.target)} />
            {user?.uid === comment.uid && (
              <div className={`setting__modal ${modalVisible ? "setting__modal--active" : ""}`}>
                <span onClick={() => handleDeleteComment(comment)}>삭제</span>
              </div>)}
          </div>
        </div>
        <div className="comment__text">
          {comment.content}
        </div>
      </div>
    </div >
  )
}

export default memo(CommentBox);

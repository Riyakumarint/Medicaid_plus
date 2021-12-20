import React from "react";
import { useSelector } from "react-redux";
import { deleteComment } from '../../../../api/ArticlesAPI';


const Comment = ({ comment, setToggle }) => {
    const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;
   const removeComment = async () => {
       await deleteComment(comment._id) ;
       setToggle(prev => !prev);
    }

    return (
        <div className="comment_component">
            <div className="comment_container">
                <h1 className="comment_name">{comment.name}</h1>
                <h1 className="comment_date">{new Date(comment.createdAt).toDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}</h1>
            </div>
            <div className='comment_content'>
                <h1 className="comments">{comment.comments}</h1>
                {(isAdmin) && (
                    <>
                        <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => removeComment()}
                    ></i>
                    </>
                )}
                
            </div>
        </div>
    )
}

export default Comment;
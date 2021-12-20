import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { newComment, getComments } from '../../../../api/ArticlesAPI';

//components
import Comment from './Comment';


const initialValue = {
    name: '',
    blogId: '',
    comments: '',
}

const Comments = ({ blog }) => {
    
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [data, setData] = useState();
    const [toggle, setToggle] = useState(false);
    const auth = useSelector((state) => state.auth);
    // const [menu, setMenu] = useState(false);
   
    const { user } = auth;
    useEffect(() => {
        const getData = async () => {
            const res = await getComments(blog._id);
            setComments(res);
        }
        getData();
    }, [toggle, blog]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: user.name,
            blogId: blog._id,
            comments: e.target.value
        });
        setData(e.target.value);
    }

    const addComment = async() => {
        await newComment(comment);
        setToggle(prev => !prev);
        setData('')
        setToggle(prev => !prev);
    }
    

    // console.log(blog);
    return (
        <div>
           
            <div className="comment_box">
                <img src={user.avatar || url} className="comment_img" alt="dp" />   
                <textarea 
                    rows="2"
                    max-rows="20" 
                    className="comment_area" 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={data}
                />
                <button 
                    
                    className="comment_post_btn"
                    onClick={(e) => addComment(e)}
                >Post</button>             
            </div>
            <div>
                {
                    comments && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </div>
        </div>
    )
}

export default Comments;
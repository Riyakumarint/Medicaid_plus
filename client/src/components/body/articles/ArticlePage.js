import React, { useEffect, useState, useContext } from "react";
import Loading from "../../utils/notification/Loading";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactStars from 'react-stars'
import Comments from './Comment/Comments';
import { getBlog, deleteBlog } from "../../../api/ArticlesAPI";

const initialState = {
  title: "",
  description: "",
  auther: "",
  reviews: {
    rating :3,
    rater: []
  }
}

function PostPage({ match }) {
  const [blog, setBlog] = useState(initialState);
  const [rating, setRating] = useState();
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const token = useSelector((state) => state.token);
  const {user, isLogged, isAdmin, isDoctor } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getBlog(match.params.id);

      data.reviews.rater.map( (rater) => {
        if(rater.userId===user._id){
            console.log("gotch")
            setRating(rater.rating);
        }
        console.log(rater.userId, user._id);
        return rater
    })

      setBlog(data);
    };

    fetchData();
  }, [callback]);

  const handleRatingChange = async (e) => {
    const res = await axios.post(
        "/blogs/rateBlog",
        { blogId:blog._id, rating:e },
        { headers: { Authorization: token } }
    );
    setCallback(!callback);
  };

  const deletePost = async () => {
    await deleteBlog(blog._id);
    history.push("/articles");
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (<><img src={blog.coverImage} alt="blog" className="blog_cover_image" />
    
    <div className="BlogPage">
      
     
      <div className="blog_component">
        <h2 className="blog_heading">{blog.title}</h2>
        <p>
        <ReactStars
            count={5}
            value={Number(blog.reviews.rating)}
            size={24}
            color2={'#ffd700'} 
            edit={false}
          />
        </p>
        <p className="blog_auther">DR. {blog.auther}</p>
        <div className="blog_date">
          <p>{new Date(blog.createdDate).toDateString()}</p>
          {(isDoctor || isAdmin) && (
            <>
              <button onClick={() => deletePost()} className="blog_delete">
                Delete Blog
              </button>
            </>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        <div className="line-2">
            <hr></hr>
        </div>

        {/* comment and rating block */}
        {isLogged?<div>
          <h5> Rate Blog</h5>
          <ReactStars
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={30}
            color2={'#ffd700'} 
          />
        <hr></hr>
        <br></br>
        </div>:""}
        {isLogged?<Comments blog={blog} />:""}
        
        </div>
      </div>
      
    </>
  );
}

export default PostPage;

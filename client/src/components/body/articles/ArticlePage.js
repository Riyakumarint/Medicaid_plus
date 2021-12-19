import React, { useEffect, useState, useContext } from "react";
import Loading from "../../utils/notification/Loading";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getBlog, deleteBlog } from "../../../api/ArticlesAPI";
function PostPage({ match }) {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { isAdmin, isDoctor } = auth;
  useEffect(() => {
    const fetchData = async () => {
      let data = await getBlog(match.params.id);
      // console.log(data);
      setBlog(data);
    };
    fetchData();
  }, []);

  
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
  return (
    <div className="BlogPage">
      <div className="blog_page">
        <img src={blog.coverImage} alt="blog" className="blog_image" />
        <h2 className="blog_heading">{blog.title}</h2>
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
      </div>
    </div>
  );
}

export default PostPage;

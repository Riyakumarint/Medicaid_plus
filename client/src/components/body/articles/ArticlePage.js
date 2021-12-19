import React, { useEffect, useState, useContext } from "react";
import Loading from '../../utils/notification/Loading'
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'

import {getBlog} from '../../../api/ArticlesAPI'
function PostPage({match}) {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
        let data = await getBlog(match.params.id);
        console.log(data)
        setBlog(data);
    }
    fetchData();
  }, []);
  if(loading) return <div><Loading /></div>
    return (
        <div className="BlogPage" >
            
            <div className="blog_page">
                <img src={blog.coverImage} alt="blog" className="blog_image" />
                <h2 className="blog_heading" >{blog.title}</h2>
                <div className="blog_date">
                    <p className="blog_auther">DR. {blog.auther}</p>
          <p>{new Date(blog.createdDate).toDateString()}</p>
          </div>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
      </div>
    )
}

export default PostPage;

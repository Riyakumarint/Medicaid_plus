import React, { useEffect, useState , useContext } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'

import {getBlog} from '../../../api/ArticlesAPI'
function PostPage({match}) {
    const [blog, setBlog] = useState({});
    // const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
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


  
    return (
        <div className="BlogPage" >
            <div className="blog_page">
                <img src={blog.coverImage} alt="blog" className="blog_image" />
                <h2 className="blog_heading" >{blog.title}</h2>
                <div className="blog_date">
                    <p className="blog_auther">{blog.auther}</p>
          <p>{new Date(blog.createdDate).toDateString()}</p>
          </div>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
      </div>
    )
}

export default PostPage;

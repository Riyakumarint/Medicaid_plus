import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Avatar, Col, Typography, Row } from "antd";
import Loading from '../../utils/notification/Loading'
import { useSelector } from "react-redux";
import CardVert from './CardVert'
const { Title } = Typography;
const { Meta } = Card;
function Articles() {
   
  const [blogs, setBlogs] = useState([]);
    const [callback, setCallback] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const token = useSelector((state) => state.token);
    
    
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await axios.get("/blogs/getAllBlogs");
      setBlogs(res.data);
    };

    getAllBlogs();
  }, [callback]);
    
  
  
    
  if(loading) return <div><Loading /></div>
  return (
      <>
          
          <div className="articles">
          <h1>Articles</h1>
     
        <div className="show_blogs">
        {
          blogs.map(blog => (
            <CardVert key={blog._id} blog={blog}  />
          ))
        }
              </div>
             
        </div>
      
    </>
  );
}

export default Articles;

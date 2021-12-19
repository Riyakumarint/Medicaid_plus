import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Avatar, Col, Typography, Row } from "antd";
import Loading from '../../utils/notification/Loading'
import { useSelector } from "react-redux";
import CardVert from './CardVert'
const { Title } = Typography;
const { Meta } = Card;
function Articles() {
    // const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
    const [callback, setCallback] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const [isCheck, setIsCheck] = useState(false)

    const { isAdmin } = auth;
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await axios.get("/blogs/getAllBlogs");
      setBlogs(res.data);
    };

    getAllBlogs();
  }, [callback]);
    
  const handleCheck = (id) =>{
    blogs.forEach(blog => {
        if(blog._id === id) blog.checked = !blog.checked
    })
    setBlogs([...blogs])
  }
    
  const deleteBlog = async(id) => {
    try {
        setLoading(true)
        // const destroyImg = axios.post('/api/delete', {secure._id},{
        //     headers: {Authorization: token}
        // })
        const deleteBlog= axios.delete(`/blogs/deleteBlog/${id}`, {
            headers: {Authorization: token}
        })

        // await destroyImg
        await deleteBlog
        setCallback(!callback)
        setLoading(false)
    } catch (err) {
        alert(err.response.data.msg)
    }
  }
    
  const checkAll = () =>{
    blogs.forEach(blog => {
        blog.checked = !isCheck
    })
    setBlogs([...blogs])
    setIsCheck(!isCheck)
}

const deleteAll = () =>{
    blogs.forEach(blog => {
        if(blog.checked) deleteBlog(blog._id)
    })
}


// const renderCards = blogs.map((blog, index) => {
//     return <Col key={index} lg={8} md={12} xs={24}>
//         <Card
//             hoverable
//             style={{ width: 370, marginTop: 16 }}
//             actions={[
//                 // <Icon type="setting" key="setting" />,
//                 // <Icon type="edit" key="edit" />,
//                 // <a href={`/blog/post/${blog._id}`}> <Icon type="ellipsis" key="ellipsis" /></a>,
//             ]}
//         >
           
//             <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
//                 <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//             </div>
//         </Card>
//     </Col>
// })
    
  if(loading) return <div><Loading /></div>
  return (
      <>
          {/* <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Blog Lists </Title>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div> */}
         
          <div className="articles">
          <h1>Articles</h1>
      {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete All</button>
            </div>
        }
       
        <div className="show_blogs">
        {
          blogs.map(blog => (
            <CardVert key={blog._id} blog={blog} isAdmin={isAdmin} deleteBlog={deleteBlog} handleCheck={handleCheck} />
          ))
        }
              </div>
             
        </div>
      
    </>
  );
}

export default Articles;

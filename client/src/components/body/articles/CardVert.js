import React from 'react'
import BtnRender from './BtnRender'

function CardVert({blog, isAdmin, deleteBlog, handleCheck}) {
    return (
        <div className="blog_card">
            
            {
                isAdmin && <input type="checkbox" checked={blog.checked}
                onChange={() => handleCheck(blog._id)} />
             } 

            <img src={blog.coverImage} alt="" />
            <div className="blog_box">
                <h2 title={blog.title}>{blog.title}</h2>
                <h2 title={blog.autherId.name}>{blog.autherId.name}</h2>
                {/* <span>₹{blog.price}</span> */}
                <p>{blog.description}</p>
            </div>
            
            <BtnRender blog={blog} deleteBlog={deleteBlog} />
        </div>
    )
}

export default CardVert

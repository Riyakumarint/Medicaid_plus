import React from 'react'
import { Link } from "react-router-dom";
import ReactStars from 'react-stars'

function CardVert({blog}) {
    return (
        <div className="blog_card">           
            <img src={blog.coverImage} alt="" />
            <div className="blog_box">
                <h2 title={blog.title}>{blog.title}</h2>
                <h6 className="star_rating">
                <ReactStars
                    count={5}
                    value={Number(blog.reviews.rating)}
                    size={24}
                    color2={'#ffd700'} 
                    edit={false}
                /></h6>
                <p>{blog.description}</p>
            </div>       
            <Link className='btn_blog_view' onClick={() => window.scrollTo({ top: 0 })} to={`/detail/${blog._id}`}>
            View
          </Link>
            
        </div>
    )
}

export default CardVert

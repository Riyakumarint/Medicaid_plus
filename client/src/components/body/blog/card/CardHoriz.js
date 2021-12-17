import React from "react";
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './card.css'
function CardHoriz({blog}) {
    
    return (
        <div className="card mb-3" style={{minWidth: "260px"}}>
        <div className="row g-0 p-2">
          <div className="col-md-12" style={{
            minHeight: '150px', maxHeight: '170px', overflow: 'hidden'
          }}>
            {
              blog.coverImage && 
              <>
                {
                  typeof(blog.coverImage) === 'string'
                  ? <Link to={`/blog/${blog._id}`}>
                      <img src={blog.coverImage} 
                      className="w-100 h-100" 
                      alt="coverImage" style={{objectFit: 'cover'}} />
                  </Link>
                  :<img src={URL.createObjectURL(blog.coverImage)} 
                  className="w-100 h-100" 
                  alt="coverImage" style={{objectFit: 'cover'}} />
                }
              </>
            }
            
          </div>
          
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {/* <Link to={`/blog/${blog._id}`}
                className="text-capitalize text-decoration-none"> */}
                  {blog.title}
                {/* </Link> */}
              </h5>
              <p className="card-text">{blog.description}</p>
  
              {
                blog.title &&
                <div className="card-text d-flex justify-content-between
                  align-items-center"
                >
                  {
                    // (auth.user && slug === auth.user._id) &&
                    <div style={{cursor: 'pointer'}}>
                      {/* <Link to={`/update_blog/${blog._id}`}>
                        <i className="fas fa-edit" title="edit" />
                      </Link> */}
  
                      <i className="fas fa-trash text-danger mx-3" 
                                            title="edit"
                                        // onClick={handleDelete} 
                                        />
                    </div>
                  }
                  <small className="text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </small>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
}

export default CardHoriz




import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function BtnRender({ blog, deleteBlog }) {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;

  return (
    <div className="row_blogbtn">
      {isAdmin ? (
        <>
          <Link id="btn_view_blog_admin" to={`/detail/${blog._id}`}>
            View
          </Link>
          <Link
            id="btn_blog"
            to="#!"
            onClick={() => deleteBlog(blog._id, blog.images.public_id)}
          >
            Delete
          </Link>
          {/* <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link> */}
        </>
      ) : (
        <>
          {/* <Link id="btn_blog" to="#!"
                            onClick={() => addCart(product)}
                        >
                        Buy
                    </Link> */}
          <Link id="btn_blog_view" to={`/detail/${blog._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../utils/notification/Loading";
import CardVert from "./CardVert";
function Articles() {
  const [blogs, setBlogs] = useState([]);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await axios.get("/blogs/getAllBlogs");
      setBlogs(res.data);
    };
    getAllBlogs();
  }, [callback]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      {/* Get All articles*/}
      <div className="articles">
        <h1>Articles</h1>

        <div className="show_blogs">
          {blogs.map((blog) => (
            <CardVert key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Articles;

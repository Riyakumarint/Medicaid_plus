import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../../utils/NotFound/NotFound"
import CardHoriz from '../blog/card/CardHoriz'
import CreateForm from '../blog/card/CreateForm'
  
const initialState = {
  title: "",
  content: "",
  links: "",
  coverImage: "",
  reletedTo: "",
  err: "",
  success: "",
};
const Create_blog = () => {
  const [blog, setBlog] = useState(initialState);
    const auth = useSelector((state) => state.auth);
    const categories = useSelector((state) => state.categories);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  return (
    <div className="create_blog">
      <div className="blog_pro">
      <h1>Create_blog</h1>
      <div className="col">
      <div className="col-md-12">
          <h5>Create</h5>
          <CreateForm blog={blog} setBlog={setBlog}/>
          </div>
          <div className="line-2">
                <hr></hr>
              </div>
        <div className="col-md-12">
          <h5>Preview</h5>
          <CardHoriz blog={blog}/>
        </div>
      </div></div>
    </div>
  );
};

export default Create_blog;

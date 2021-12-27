import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactQuill from "../editor/ReactQuill";
import Loading from "../../utils/notification/Loading";
import SideNav from "../profile/sidenav/SideNav";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isTitle,
  isContent,
  isDescription,
  isCoverImage,
  isCategory,
} from "../../utils/validation/Validation";

const initialState = {
  title: "",
  auther: "",
  description: "",
  links: "",
  reletedTo: "",
  createdDate: new Date(),
  err: "",
  success: "",
};

const Create_blog = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [blog, setBlog] = useState(initialState);
  const [files, setFiles] = useState([]);
  const { user } = auth;
  const [callback, setCallback] = useState(false);
  const [coverImage, setCoverImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const {
    title,
    description,
    reletedTo,
    links,
    createdDate,
    auther,
    err,
    success,
  } = blog;

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategories();
  }, [callback]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value, err: "", success: "" });
  };

  // const handleHastagChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setHastag({ ...hastag, [name]: value, err: "", success: "" });
  // };

  const onEditorChange = (value) => {
    setContent(value);
    // console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const handleChangeThumbnail = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setBlog({
          ...blog,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 2048 * 2048)
        return setBlog({ ...blog, err: "Size too large.", success: "" });

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" 
      )
        return setBlog({
          ...blog,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_coverImage", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setCoverImage(res.data.url);
    } catch (err) {
      setBlog({ ...blog, err: err.response.data.msg, success: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty(title) || isEmpty(description))
      return setBlog({
        ...blog,
        err: "Please fill in all fields.",
        success: "",
      });

    if (isTitle(title))
      return setBlog({
        ...blog,
        err: "Title must be at least 10 characters.",
        success: "",
      });
    if (isCoverImage(coverImage))
      return setBlog({
        ...blog,
        err: "Cover Image cannot be left blank.",
        success: "",
      });
    if (isDescription(description))
      return setBlog({
        ...blog,
        err: "Description must be at least 50 characters.",
        success: "",
      });

    if (isCategory(reletedTo))
      return setBlog({
        ...blog,
        err: "Category cannot be left blank.",
        success: "",
      });
    if (isContent(content))
      return setBlog({
        ...blog,
        err: "content must be at least 100 characters.",
        success: "",
      });

    try {
      const res = await axios.post(
        "/blogs/postBlog",
        {
          title,
          description,
          content,
          links,
          auther: user.name,
          createdDate,
          coverImage,
          reletedTo,
        },
        {
          headers: { Authorization: token },
        }
      );

      setBlog({ ...blog, err: "", success: res.data.msg });
      setTimeout(() => {
        history.push("/articles");
      }, 2000);
    } catch (err) {
      err.response.data.msg &&
        setBlog({ ...blog, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <SideNav />
      <div className="create_blog">
        <div className="blog_pro">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          {loading && <Loading />}
          <h1>Create Article</h1>
          <div className="row">
            <div className="col">
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  placeholder="Title"
                  name="title"
                  onChange={handleChangeInput}
                />

                <small
                  className="text-muted position-absolute"
                  style={{ bottom: 0, right: "3px", opacity: "0.3" }}
                >
                  {title.length}/50
                </small>
              </div>

              <div className="form-group my-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/jpeg,image/png"
                  onChange={handleChangeThumbnail}
                  name="coverImage"
                />
              </div>

              <div className="form-group position-relative">
                <textarea
                  className="form-control"
                  rows={4}
                  value={description}
                  style={{ resize: "none" }}
                  name="description"
                  placeholder="Description"
                  onChange={handleChangeInput}
                />

                <small
                  className="text-muted position-absolute"
                  style={{ bottom: 0, right: "3px", opacity: "0.3" }}
                >
                  {description.length}/200
                </small>
              </div>

              <div className="form-group my-3">
                <select
                  className="form-control text-capitalize"
                  value={reletedTo}
                  name="reletedTo"
                  onChange={handleChangeInput}
                >
                  <option value="">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <ReactQuill
            placeholder={"Start Posting Something"}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
          />
          <div>
            <button
              className="blog_post_btn mt-3 d-block mx-auto"
              onClick={handleSubmit}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create_blog;

import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CardHoriz from "../blog/card/CardHoriz";
import CreateForm from "../blog/card/CreateForm";
import axios from "axios";
// import ReactQuill from "../editor/ReactQuill";
import Loading from "../../utils/notification/Loading";
import { checkImage, imageUpload } from "../../utils/validation/ImageUpload";
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
  getAPI,
} from "../../utils/validation/Validation";

const initialState = {
  title: "",
  content: "",
  description: "",
  links: "",
  reletedTo: "",
  createdAt: new Date().toISOString(),
  err: "",
  success: "",
};

const Create_blog = () => {
  const { id } = useParams();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const [blog, setBlog] = useState(initialState);
  // const [content, setContent] = useState("");
  const [text, setText] = useState("");
  const [oldData, setOldData] = useState(initialState);

  const [callback, setCallback] = useState(false);
  const [coverImage, setCoverImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  const [categories, setCategories] = useState([]);
  const divRef = useRef();

  const dispatch = useDispatch();

  const { title, description,content, reletedTo, links, err, success } = blog;
  const [image, setImage] = useState(initialState);
  const quillRef = useRef();

  const modules = { toolbar: { container } };


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

  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (!files)
        return setImage({
          ...image,
          err: "No files were uploaded.",
          success: "",
        });
      const file = files[0];
      if (!file)
        return setImage({
          ...image,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setImage({ ...image, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setImage({
          ...image,
          err: "File format is incorrect.",
          success: "",
        });

      setLoading(true);
      const photo = await imageUpload(file);
      console.log(photo);
      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
      }
      setLoading(false);
    };
  }, [dispatch]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);
  


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

      if (file.size > 1024 * 1024)
        return setBlog({ ...blog, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
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

    if (isContent(content))
    return setBlog({
      ...blog,
      err: "content must be at least 100 characters.",
      success: "",
    });

    // setBlog({
    //     ...blog,
    //     err: "Content must be at least 2000 characters.",
    //     success: "",
    //   });

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

    try {
      const res = await axios.post(
        "/blogs/postBlog",
        {
          title,
          description,
          content,
          links,
          coverImage,
          reletedTo,
        },
        {
          headers: { Authorization: token },
        }
      );

      setBlog({ ...blog, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setBlog({ ...blog, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="create_blog">
      <div className="blog_pro">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <Loading />}
        <h1>Create_blog</h1>
        <div className="row">
          <div className="col-md-6">
            <h5>Create</h5>
            {/* <CreateForm blog={blog} setBlog={setBlog} /> */}
            <div className="form-group position-relative">
              <input
                type="text"
                className="form-control"
                value={title}
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
                accept="image/*"
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
          {/* <div className="line-2">
            <hr></hr>
          </div> */}
          <div className="col-md-6">
            <h5>Preview</h5>
            <CardHoriz blog={blog} />
          </div>
        </div>
        <div className="form-group position-relative">
              <textarea
                className="form-control"
                rows={4}
                value={content}
                style={{ resize: "none" }}
                name="content"
                onChange={handleChangeInput}
              />

              <small
                className="text-muted position-absolute"
                style={{ bottom: 0, right: "3px", opacity: "0.3" }}
              >
                {content.length}/2000
              </small>
            </div>
        {/* <ReactQuill setBody={setBody} body={body} /> */}
        {/* <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        // onChange={(e) => setContent(e)}
          onChange={handleChange}
          name="content"
        value={content}
        ref={quillRef}
      /> */}
        <button
          className="blog_post_btn mt-3 d-block mx-auto"
          onClick={handleSubmit}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};
let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  // ['emoji'],
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

export default Create_blog;



// asdfghjklqwertyuiopzxcvnbm nvxrufjot hhh hhh hhh jjj hhh ggg ggg hhh

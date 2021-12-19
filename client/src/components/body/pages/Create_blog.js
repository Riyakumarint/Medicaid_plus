import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CreateForm from "../blog/card/CreateForm";
import axios from "axios";
import ReactQuill from "../editor/ReactQuill";
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
  const [hastags, setHastags] = useState([]);
  const [hastage, setHastage] = useState({name:""});
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const { title, description, reletedTo, links,createdDate,auther, err, success } = blog;

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data)
    };

    getCategories();
  }, [callback]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value, err: "", success: "" });
  };

  const handleHastageChangeInput = (e) => {
    const { name, value } = e.target;
    setHastage({ ...hastage, [name]: value, err: "", success: "" });
  };

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  // const handleChangeImage = useCallback(() => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.click();

  //   input.onchange = async () => {
  //     const files = input.files;
  //     if (!files)
  //       return setImage({
  //         ...image,
  //         err: "No files were uploaded.",
  //         success: "",
  //       });
  //     const file = files[0];
  //     if (!file)
  //       return setImage({
  //         ...image,
  //         err: "No files were uploaded.",
  //         success: "",
  //       });

  //     if (file.size > 1024 * 1024)
  //       return setImage({ ...image, err: "Size too large.", success: "" });

  //     if (file.type !== "image/jpeg" && file.type !== "image/png")
  //       return setImage({
  //         ...image,
  //         err: "File format is incorrect.",
  //         success: "",
  //       });

  //     setLoading(true);
  //     const photo = await imageUpload(file);
  //     console.log(photo);
  //     const quill = quillRef.current;
  //     const range = quill?.getEditor().getSelection()?.index;
  //     if (range !== undefined) {
  //       quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
  //     }
  //     setLoading(false);
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   const quill = quillRef.current;
  //   if (!quill) return;

  //   let toolbar = quill.getEditor().getModule("toolbar");
  //   toolbar.addHandler("image", handleChangeImage);
  // }, [handleChangeImage]);

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

  // const handleAddHastage = async () => {
  //   try {
  //     const res = await axios.post(
  //       "/blogs/addHastags",
  //       { hastage },
  //       { headers: { Authorization: token } }
  //     );
      
      

  //     setAllergie({ name:"", err: "", success: "Updated Success!" });
  //   } catch (err) {
  //     setAllergie({ ...allergie, err: err.response.data.msg, success: "" });
  //   }
  // };
  // const handleDeleteAllergie = async (allergieId) => {
  //   try {
  //     const res = await axios.post(
  //       "/profiles/deleteAllergies",
  //       { allergieId },
  //       { headers: { Authorization: token } }
  //     );
      
  //     axios.get('/profiles/getMedicalHistory', { headers: {Authorization: token}})
  //     .then( res => {
  //       setAllergies(res.data.allergies);
  //     })
  //     .catch( err => {
  //       setProfile({ ...profile, err: err, success: "" });
  //     })
      
  //     setAllergie({ name:"", err: "", success: "Updated Success!" });
  //   } catch (err) {
  //     setAllergie({ ...allergie, err: err.response.data.msg, success: "" });
  //   }
  // };


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
          auther:user.name,
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
        history.push('/articles')
    }, 2000);
      
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
        <h1>Create blog</h1>
        <div className="row">
          <div className="col">
            {/* <h5>Create</h5> */}
            {/* <CreateForm blog={blog} setBlog={setBlog} /> */}
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
          {/* <div className="line-2">
            <hr></hr>
          </div> */}

          {/* <div className="col-md-6">
            <h5>Preview</h5>
            <CardHoriz blog={blog} />
          </div> */}
        </div>
        {/* <div className="form-group position-relative">
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
            </div> */}
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
  );
};

export default Create_blog;

// asdfghjklqwertyuiopzxcvnbm nvxrufjot hhh hhh hhh jjj hhh ggg ggg hhh

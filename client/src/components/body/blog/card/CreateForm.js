import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../../utils/notification/Loading";
function CreateForm({ blog, setBlog }) {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  const [coverImage, setCoverImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };

    getCategories();
  }, [callback, token]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeThumbnail = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (file)
        if (!file)
          // console.log(file)
          return setBlog({
            ...blog,
            err: "No files were uploaded.",
            success: "",
          });

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
  return (
    <>
      {/* <form> */}
      <div className="form-group position-relative">
        <input
          type="text"
          className="form-control"
          value={blog.title}
          name="title"
          onChange={handleChangeInput}
        />

        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.title.length}/50
        </small>
      </div>

      <div className="form-group my-3">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChangeThumbnail}
        />
      </div>

      <div className="form-group position-relative">
        <textarea
          className="form-control"
          rows={4}
          value={blog.content}
          style={{ resize: "none" }}
          name="content"
          onChange={handleChangeInput}
        />

        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.content.length}/200
        </small>
      </div>

      <div className="form-group my-3">
        <select
          className="form-control text-capitalize"
          value={blog.reletedTo}
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
      {/* </form> */}
    </>
  );
}

export default CreateForm;

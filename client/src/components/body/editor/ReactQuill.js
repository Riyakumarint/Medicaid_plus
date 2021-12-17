import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { checkImage, imageUpload } from "../../utils/validation/ImageUpload";
import Loading from "../../utils/notification/Loading";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

const initialState = {
  err: "",
  success: "",
};

function Quill({ setBody, body }) {
  const [callback, setCallback] = useState(false);
  const [image, setImage] = useState(initialState);
  const { err, success } = image;
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const quillRef = useRef();

  const modules = { toolbar: { container } };
  const handleChange = (e) => {
    console.log(e);
    setBody(e);
  };

  // CUSTOM IMAGE

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

  return (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      {loading && <Loading />}
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        // onChange={handleChange}
        // value={body}
        ref={quillRef}
      />
    </>
  );
}

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
export default Quill;

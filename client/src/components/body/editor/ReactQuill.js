import React, { useState,useEffect, useRef, useCallback } from 'react'
import ReactQuill from 'react-quill';
import Emoji from 'quill-emoji'
import { useDispatch } from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import axios from "axios";

function Quill({ setBody,body }) {
    const [callback, setCallback] = useState(false);
    const [Image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch()
    const quillRef = useRef<ReactQuill>(null)

  const modules = { toolbar: { container }}
    const handleChange = (e) => {
        console.log(e)
        setBody(e)
    }
    // Custom image
    // const handleChangeImage = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const file = e.target.files[0];
    
    //       if (!file)
    //         return setBody({
    //           ...body,
    //           err: "No files were uploaded.",
    //           success: "",
    //         });
    
    //       if (file.size > 1024 * 1024)
    //         return setBody({ ...body, err: "Size too large.", success: "" });
    
    //       if (file.type !== "image/jpeg" && file.type !== "image/png")
    //         return setBody({
    //           ...body,
    //           err: "File format is incorrect.",
    //           success: "",
    //         });
    
    //       let formData = new FormData();
    //       formData.append("file", file);
    
    //       setLoading(true);
    //       const res = await axios.post("/api/upload_coverImage", formData, {
    //         headers: {
    //           "content-type": "multipart/form-data",
    //           Authorization: token,
    //         },
    //       });
    
    //       setLoading(false);
    //       setImage(res.data.url);
    //     } catch (err) {
    //         setBody({ ...body, err: err.response.data.msg, success: "" });
    //     }
    //   };

    useEffect(() => {
        const quill = quillRef.current;
        if(!quill) return;
    
        let toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleChange)
      },[handleChange])
    return (
        <ReactQuill theme="snow"
      modules={modules}
      placeholder="Write somethings..."
    //   onChange={e => setBody(e)}
            // onChange={handleChange}
    //   value={body}
            // ref={quillRef}
        />
    )
}

let container = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    // ['emoji'],  
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'align': [] }],
  
    ['clean', 'link', 'image','video']
  ]
export default Quill

import React, { useState,useEffect, useRef, useCallback } from 'react'
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import axios from "axios";
import {checkImage,imageUpload} from '../../utils/validation/ImageUpload'
import Loading from '../../utils/notification/Loading';
function Quill({ setBody,body }) {
    const [callback, setCallback] = useState(false);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch()
    const quillRef = useRef()

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
  
  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = "image/*"
    input.click()

    input.onchange = async () => {
      const files = input.files
      if (!files)
        return alert('No files were uploaded')
      //   return setImage({
      //   ...image,
      //   err: "No files were uploaded.",
      //   success: "",
      // });

      const file = files[0]
      const check = checkImage(file)
      
      if (check)
      return alert('No files were uploaded')
      // return dispatch({ type: ALERT, payload: { errors: check } });
      
      // dispatch({ type: ALERT, payload: { loading: true } })
      // const photo = await imageUpload(file)
      // let formData = new FormData();
      // formData.append("file", file);

      // setLoading(true);
      // const res = await axios.post("/api/upload_avatar", formData, {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //     Authorization: token,
      //   },
      // });

      // setLoading(false);
      // const quill = quillRef.current;
      // const range = quill?.getEditor().getSelection()?.index
      // if (range !== undefined) {
      //   quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
      // }
      console.log(file)
    }
  },[])

    useEffect(() => {
        const quill = quillRef.current;
        if(!quill) return;
    
        let toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleChangeImage)
      },[handleChangeImage])
    return (
        <ReactQuill theme="snow"
      modules={modules}
      placeholder="Write somethings..."
    //   onChange={e => setBody(e)}
            onChange={handleChange}
    //   value={body}
            ref={quillRef}
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

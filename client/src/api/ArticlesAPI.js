import axios from 'axios'
const url = 'http://localhost:5013';

export const getBlog = async (id) => {
    try {
        let res = await axios.get(`${url}/blogs/blog/${id}`);
        return res.data;
    } catch (err) {
        console.log('Error while calling getPost API ', err);
    }
}

export const deleteBlog = async (id) => {
    try {
        return await axios.delete(`${url}/blogs/delete/${id}`);
    } catch(err) {
        console.log('Error while calling delete Blog API ', err)
    }
}

export const newComment = async (comment) => {
    try {
        return await axios.post(`${url}/comment/new/`, comment);
    } catch(err) {
        console.log('Error while calling newComment API ', err)
    } 
}

export const getComments = async (id) => {
    try {
        let res = await axios.get(`${url}/comment/comments/${id}`);
        return res.data;
    } catch(err) {
        console.log('Error while calling getComments API ', err)
    } 
}

export const deleteComment = async (id) => {
    try {
        return await axios.delete(`${url}/comment/delete/${id}`);
    } catch(err) {
        console.log('Error while calling deleteComments API ', err)
    } 
}

export const getDocBlogs = async (param) => {
    try {
        let response = await axios.get(`${url}/blogs/getDocBlogs${param}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPosts API ', error)
    }
}
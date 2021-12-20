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
        console.log(id);
    } catch(err) {
        console.log('Error while calling delete Blog API ', err)
    }
}

export const newComment = async (comment) => {
    try {
        return await axios.post(`${url}/comment/new/`, comment);
    } catch(error) {
        console.log('Error while calling newComment API ', error)
    } 
}

export const getComments = async (id) => {
    try {
        let response = await axios.get(`${url}/comments/${id}`);
        return response.data;
    } catch(error) {
        console.log('Error while calling getComments API ', error)
    } 
}

export const deleteComment = async (id) => {
    try {
        return await axios.delete(`${url}/comment/delete/${id}`);
    } catch(error) {
        console.log('Error while calling deleteComments API ', error)
    } 
}

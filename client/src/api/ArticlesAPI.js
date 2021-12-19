
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

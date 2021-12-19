
import axios from 'axios'

export const getBlog = async (id) => {
    try {
        let res = await axios.get(`/blogs/blog/${id}`);
        return res.data;
    } catch (err) {
        console.log('Error while calling getPost API ', err);
    }
}
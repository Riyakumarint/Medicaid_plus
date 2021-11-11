// import ACTIONS from './index'
// import axios from 'axios'

// export const fetchMedicalProfile = async (token) => {
//     const res = await axios.get('/profiles/createMedicalProfile', {
//         headers: {Authorization: token}
//     })
//     return res
// }


// export const dispatchGetMedicalProfile = (res) => {
//     return {
//         type: ACTIONS.GET_MEDICAL_PROFILE,
//         payload: {
//             user: res.data,
//             isAdmin: res.data.role === 1 ? true : false,
//             isDoctor: res.data.role === 2 ? true : false
//         }
//     }
// }
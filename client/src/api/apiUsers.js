import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const createUserApi = (d)=>{
    // console.log(d)
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/users`, d, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const createAdminApi = (d)=>{
    // console.log(d)
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/users/admin`, d, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const getUsersApi = (d, q="")=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/users`, {
            params:{
                type: d,
                text: q
            },
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const getAdminsApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/users/admins`, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const updateUserApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.patch(`${server}/api/users/${d}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const deleteUserApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.delete(`${server}/api/users/${d}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const editUserApi = (id, d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/users/${id}`,d, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
export {createUserApi, getUsersApi, updateUserApi, deleteUserApi, editUserApi, getAdminsApi, createAdminApi}
import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const registerApi = (d)=>{
    // console.log(d)
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/auth/register`, d, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const loginApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/auth/login`, d, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const getCurrentUserApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/auth/`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const logoutApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/auth/logout`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const getProfileApi = ()=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/auth/profile/`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const getAccountInfo = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/auth/user/${d}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}


const changeInfoApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/auth/info/`,d, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const uploadPhotoApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/auth/upload/`,d, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const changePasswordApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/auth/password/`,d, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}




export  {registerApi, loginApi, getCurrentUserApi, logoutApi, getProfileApi, getAccountInfo,

    changeInfoApi, changePasswordApi, uploadPhotoApi
}
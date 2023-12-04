import axios from "axios"

const server = process.env.REACT_APP_SERVER

const createTag = (data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/tags/`,data,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getTags = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/tags/`,{
            params: d,
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getTag = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/tags/tag`,{
            params: d,
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}
const deleteTag = (data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.delete(`${server}/api/tags/${data}`,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}
const updateTag = (id, data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.patch(`${server}/api/tags/${id}`, data,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}
export {createTag , getTags, deleteTag, updateTag, getTag}

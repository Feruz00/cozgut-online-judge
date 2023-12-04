import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const createSubSection = (data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/section/sub/`,data, {
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getSubSection = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/section/sub/${id}`,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}
const getCurrentSubSection = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/section/current/${id}`, {
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}
export {createSubSection, getSubSection, getCurrentSubSection}

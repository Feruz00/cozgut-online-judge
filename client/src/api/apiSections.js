import axios from "axios"

const server = process.env.REACT_APP_SERVER


const createSection = (data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/section/`,data,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getSections = ()=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/section/all`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}


const getSubSections = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/section/sub/${id}`, {
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const getAll = ()=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/section/parent`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}


const deleteSection = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.delete(`${server}/api/section/section/${id}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}
const updateSection = (id, data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/section/section/${id}`,data,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getData = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/section/`,{
            params: d,
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const deleteSubSection = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.delete(`${server}/api/section/sub/${id}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const updateSubSection = (id, data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/section/sub/${id}`,data,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getProblemsBySection = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/section/problem/${id}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

export { createSection, 
    getSections, getAll, getSubSections , deleteSection, updateSection, getData, deleteSubSection, updateSubSection,
    getProblemsBySection

}
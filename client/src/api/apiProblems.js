import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const getProblemsApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/problem/`,{
            params: d,
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const getProblemApi = (d)=>{
    // console.log(d)
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/problem/${d}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}


const createProblemApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/problem/`,d, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const editProblemApi = (id,d)=>{
    console.log(id, d)
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/problem/${id}`,d, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const deleteProblemApi = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.delete(`${server}/api/problem/${id}`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}



export  {getProblemsApi, createProblemApi, deleteProblemApi, getProblemApi, editProblemApi }
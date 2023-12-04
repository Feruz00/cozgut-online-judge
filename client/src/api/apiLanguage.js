import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const getLangugaes = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/language/`,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const createLanguage = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/language/`, d,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}

const editLanguage = (id, d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/language/${id}`, d,{
            withCredentials: true
        })
            .then( res=>resolve(res.data) )
            .catch( err=>reject(err) )
    } )
}


export  {getLangugaes, createLanguage,editLanguage }
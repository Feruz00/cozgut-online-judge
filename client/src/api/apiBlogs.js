import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const createBlog = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post( `${server}/api/blogs`, d, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const getBlogs = ()=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/blogs`, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}



export  {createBlog, getBlogs}
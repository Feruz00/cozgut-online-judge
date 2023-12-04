import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const createContest = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post( `${server}/api/contests`, d, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const getContests = ()=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/contests`, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}
const getContest = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/contests/${d}`, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const deleteContest = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.delete( `${server}/api/contests/${d}`, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const updateContest = (id, d)=>{
    // console.log(id, d)
    return new Promise( async (resolve, reject)=>{
        await axios.patch( `${server}/api/contests/${id}`,d , {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const addUsertoContest = (id, fullName)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put( `${server}/api/contests/users/${id}`,{
            fullName: fullName
        } , {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}
const removeUsertoContest = (id, user)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put( `${server}/api/contests/remove/${id}`,{
            user
        } , {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const getProblemsApi = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get( `${server}/api/contests/problems/${id}`, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const getProblemApi = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get( `${server}/api/contests/problem/${id}`, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

const registerUsertoContest = (id)=>{
    // console.log(id)
    return new Promise( async (resolve, reject)=>{
        await axios.patch( `${server}/api/contests/register/${id}`, {}, {withCredentials: true} )
        .then( res=>{
            resolve(res.data)
        } )
        .catch(err=>reject(err))
    } )
}

export {createContest, getContests, getContest,deleteContest, updateContest, addUsertoContest,
    removeUsertoContest,
    getProblemsApi,
    registerUsertoContest,
    getProblemApi
}
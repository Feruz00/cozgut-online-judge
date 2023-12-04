import axios from 'axios'

const server = process.env.REACT_APP_SERVER

const submitProblem = (data)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.post(`${server}/api/submissions/`,data,{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

// get all submissions
const getAllSubmissions = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/submissions/`, {
            withCredentials: true,
            params:d
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

// get all submission by problem


// get all submission by user


// get submissions
const getSectionSubmissions = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/submissions/section`, {
            params: d,
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getUserSubmission = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/submissions/user/${d}`, {
            params: d,
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}


const getContestSubmissions = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/submissions/contest`, {
            params: d,
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}
const getMySubmissions = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/submissions/my/${id}`, {
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

const getResultsByContest = (id)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.get(`${server}/api/submissions/result/${id}`, {
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

// full scan

const fullScanApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/submissions/fullscan/${d}`, {},{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}

// new rating
const ratingApi = (d)=>{
    return new Promise( async (resolve, reject)=>{
        await axios.put(`${server}/api/submissions/rating/${d}`, {},{
            withCredentials: true
        })
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
    } )
}


export {getAllSubmissions, submitProblem, getSectionSubmissions, getContestSubmissions,
     getMySubmissions, getResultsByContest, fullScanApi, ratingApi, getUserSubmission}
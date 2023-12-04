import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContest as fnCreateContest, getContest, getContests,
    deleteContest as fnDeleteContest,
    updateContest as fnUpdateContest,
    addUsertoContest,
    removeUsertoContest,
    getProblemsApi,
    registerUsertoContest
} from "../api/apiContest"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import { getProblemApi } from "../api/apiProblems"

export function useCreateContest(){
    
    const queryClient = useQueryClient()
    
    const {isLoading: isCreateContest, mutate: createContest} = useMutation({
        mutationFn: fnCreateContest,
        onSuccess: ()=>{
            toast.success('Bäsleşik üstünlikli döredildi')
            queryClient.invalidateQueries({
                queryKey: ['contests']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isCreateContest, createContest}
}

export function useGetContests(){
    const {isLoading: isContestLoading, data: contests, error} = useQuery({
        queryFn: getContests,
        queryKey: ['contests']
    })
    return {isContestLoading, contests, error}
}

export function useGetContest(){
    const {id} = useParams()
    const {isLoading: isContestLoading, data: contest, error} = useQuery({
        queryFn: ()=>getContest(id),
        queryKey: ['contest']
    })
    return {isContestLoading, contest, error}
}
export function useGetProblemsByContest(){
    const {id} = useParams()
    const {isLoading: isProblems, data: problems, error} = useQuery({
        queryFn: ()=>getProblemsApi(id),
        queryKey: [`problem-${id}`]
    })
    return {isProblems, problems, error}
}
export function useGetProblemByContest(){
    const {problem: problemId} = useParams()
    const {isLoading: isProblem, data: problem, error} = useQuery({
        queryFn: ()=>getProblemApi(problemId),
        queryKey: [problemId]
    })
    return {isProblem, problem, error}
}

export function useDeleteContest(){
    
    const queryClient = useQueryClient()
    
    const {isLoading: isDeletingContest, mutate: deleteContest} = useMutation({
        mutationFn: fnDeleteContest,
        onSuccess: ()=>{
            toast.success('Bäsleşik üstünlikli pozuldy')
            queryClient.invalidateQueries({
                queryKey: ['contests']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isDeletingContest, deleteContest}
}

export function useUpdateContest(){
    const {id} = useParams()
    
    const queryClient = useQueryClient()
    
    const {isLoading: isUpdateContest, mutate: updateContest} = useMutation({
        mutationFn: (d) => fnUpdateContest(id, d),
        onSuccess: ()=>{
            toast.success('Bäsleşige degişli maglumatlar üýtgedildi')
            queryClient.invalidateQueries({
                queryKey: ['contests']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isUpdateContest, updateContest}
}

export function useAddUserToContest(){
    
    const queryClient = useQueryClient()
    
    const {isLoading: isAddindUser, mutate: addUser} = useMutation({
        mutationFn: ({id, fullName}) => addUsertoContest(id, fullName),
        onSuccess: ()=>{
            toast.success('Üstünlikli goşuldy')
            queryClient.invalidateQueries({
                queryKey: ['contest']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isAddindUser, addUser}
}

export function useRemoveUserToContest(){
    
    const queryClient = useQueryClient()
    
    const {isLoading: isRemoveUser, mutate: removeUser} = useMutation({
        mutationFn: ({id, user}) => removeUsertoContest(id, user),
        onSuccess: ()=>{
            toast.success('Üstünlikli pozuldy')
            queryClient.invalidateQueries({
                queryKey: ['contest']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isRemoveUser, removeUser}
}

export function useRegistersUserToContest(){
    
    const queryClient = useQueryClient()
    
    const {isLoading, mutate: registerUserContest} = useMutation({
        mutationFn: ({id}) => registerUsertoContest(id),
        onSuccess: ()=>{
            toast.success('Siz üstünlikli registratsiýa edildiňiz')
            queryClient.invalidateQueries({
                queryKey: ['contests']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, registerUserContest}
}

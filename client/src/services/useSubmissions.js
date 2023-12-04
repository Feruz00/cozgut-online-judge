import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fullScanApi, getAllSubmissions, getContestSubmissions, getMySubmissions, getResultsByContest, getSectionSubmissions, getUserSubmission, ratingApi, submitProblem } from "../api/apiSubmissions";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

export function useSubmitProblem(){
    const {mutate: submit, isLoading} = useMutation({
        mutationFn: submitProblem,
        onError: (err)=>{
            console.log(err?.response?.data)
            toast.error('Serwerde näsazlyk boldy')
        }
    })
    return {submit, isLoading}
}

export function useSubmissions(){
    const [searchParams] = useSearchParams()
    const answer = searchParams.get('answer') || 'all'
    const who = searchParams.get('who') || 'all'
    
    console.log(who, answer)

    const {data: submissions, isLoading} = useQuery({
        queryFn: ()=> getAllSubmissions({answer, who}),
        queryKey:[answer, who, 'submissions']
    })
    return {submissions, isLoading}
}

export function useSectionSubmission(){
    const [searchParams] = useSearchParams()
    const answer = searchParams.get('answer') || 'all'
    const who = searchParams.get('who') || 'all'
    
    const {data: submissions, isLoading} = useQuery({
        queryFn: () => getSectionSubmissions({answer, who}),
        queryKey: [answer, who, 'submissions']
    })
    return {submissions, isLoading}
}

export function useContestSubmission(){
    const [searchParams] = useSearchParams()
    const answer = searchParams.get('answer') || 'all'
    const who = searchParams.get('who') || 'all'
    
    const {data: submissions, isLoading} = useQuery({
        queryFn: () => getContestSubmissions({answer, who}),
        queryKey: [answer, who, 'submissions']
    })
    return {submissions, isLoading}
}

export function useMyContestSubmissions(){
    
    const {id} = useParams()
    const {data: submissions, isLoading} = useQuery({
        queryFn: () => getMySubmissions(id),
        queryKey: [`my-${id}`]
    })
    console.log(submissions)
    return {submissions, isLoading}
}

export function useGetResults(){
    
    const {id} = useParams()
    const {data: submissions, isLoading} = useQuery({
        queryFn: () => getResultsByContest(id),
        queryKey: [`result-${id}`]
    })
    return {submissions, isLoading}
}

export function useFullScan(){
    
    const queryClient = useQueryClient()
    const {id} = useParams()
    const {isLoading, mutate: fullScan} = useMutation({
        mutationFn: () => fullScanApi(id),
        onSuccess: ()=>{
            toast.success('Üstünlikli başlady')
            queryClient.invalidateQueries({
                queryKey: ['contest',id]
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, fullScan}
}

export function useGiveRating(){
    
    const queryClient = useQueryClient()
    const {id} = useParams()
    const {isLoading, mutate: giveRating} = useMutation({
        mutationFn: () => ratingApi(id),
        onSuccess: ()=>{
            toast.success('Reýting bermek üstünlikli tamamlandy')
            queryClient.invalidateQueries({
                queryKey: ['contest',id, 'user', 'users']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, giveRating}
}

export function useUserSubmmissions(){
    
    const {id} = useParams()
    const {data: submissions, isLoading} = useQuery({
        queryFn: () => getUserSubmission(id),
        queryKey: [`subs-${id}`]
    })
    return {submissions, isLoading}
}
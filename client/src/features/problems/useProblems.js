import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProblemApi, deleteProblemApi, editProblemApi, getProblemApi, getProblemsApi } from "../../api/apiProblems"
import { createTag as createTagApi, deleteTag as deleteTagApi, getTag, getTags, updateTag as updateTagApi } from "../../api/apiTags"
import toast from "react-hot-toast"
import { useParams, useSearchParams } from "react-router-dom"


export function useGetProblems(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchParams] = useSearchParams()
    const sort = !searchParams.get('sortField') ? 'createdAt': searchParams.get('sortField')
    const direction = !searchParams.get('direction') ? 1 : searchParams.get('direction') === 'asc'?1:-1
    const title = !searchParams.get('title') ? []: searchParams.get('title')
    const {isLoading, isFetching, isFetched, data:problems, error} = useQuery({
        queryKey:['problems', sort, direction, title],
        queryFn: ()=>getProblemsApi({sort, direction, title})
    })
    return {isLoading,isFetching,isFetched, problems, error}
}

export function useGetTags(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchParams] = useSearchParams()
    const sort = !searchParams.get('sortField') ? 'createdAt': searchParams.get('sortField')
    const direction = !searchParams.get('direction') ? 1 : searchParams.get('direction') === 'asc'?1:-1
    
    const {isLoading:isTagsLoading, data:tags, error} = useQuery({
        queryKey:['tags', sort, direction],
        queryFn:()=>getTags({sort, direction})
    })
    return {isTagsLoading, tags, error}
}

export function useGetTag(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // console.log(q)
    const {isLoading:isTagsLoading, data:tags, error} = useQuery({
        queryKey:['tags'],
        queryFn:getTag
    })
    return {isTagsLoading, tags, error}
}

export function useCreateTag(){
    const queryClient = useQueryClient()
    
    const {mutate: createTag, isLoading: isCreatingTag} = useMutation({
        mutationFn: newTag => createTagApi(newTag),
        onSuccess: ()=>{
            toast.success("Täze teg döredildi")
            queryClient.invalidateQueries({
                queryKey: ['tags']
            })
        },
        onError: err=>{
            // console.log(err)
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')  
        }
    })
    return {createTag, isCreatingTag}
}

export function useDeleteTag(){
    const queryClient = useQueryClient()
    
    const {mutate: deleteTag, isLoading: isDeletingTag} = useMutation({
        mutationFn: newTag => deleteTagApi(newTag),
        onSuccess: ()=>{
            toast.success("Teg pozuldy")
            queryClient.invalidateQueries({
                queryKey: ['tags']
            })
        },
        onError: err=>{
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')  
        }
    })
    return {deleteTag, isDeletingTag}
}
export function useUpdateTag(){
    const queryClient = useQueryClient()
    
    const {mutate: updateTag, isLoading: isUpdatingTag} = useMutation({
        mutationFn: ({id, data})=> updateTagApi(id, data),
        onSuccess: ()=>{
            toast.success("Tegiň maglumatlary üýtgedildi")
            queryClient.invalidateQueries({
                queryKey: ['tags']
            })
        },
        onError: err=>{
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')  
        }
    })
    return {updateTag, isUpdatingTag}
}

export function useCreateProblem(){
    // const queryClient = useQueryClient()
    
    const {mutate: createProblem, isLoading: isCreatingProblem} = useMutation({
        mutationFn: createProblemApi,
        onSuccess: ()=>{
            toast.success("Mesele döredildi maglumatlary üýtgedildi")
            // queryClient.invalidateQueries({
            //     queryKey: ['tags']
            // })
        },
        onError: err=>{
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')  
        }
    })
    return {createProblem, isCreatingProblem}
}


export function useEditProblem(){
    const queryClient = useQueryClient()
    const {id="", problem=""} = useParams()
    console.log(id, problem)
    const {mutate: editProblem, isLoading: isEditingProblem} = useMutation({
        mutationFn: ({id, d})=>editProblemApi(id, d),
        onSuccess: ()=>{
            toast.success("Meseläniň maglumatlary üýtgedildi")
            queryClient.invalidateQueries({
                queryKey:[id, problem]
            })
        },
        onError: err=>{
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')  
        }
    })
    return {editProblem, isEditingProblem}
}


export function useDeleteProblem(){
    const queryClient = useQueryClient()
    const {id=""} = useParams()
    const {mutate: deleteProblem, isLoading: isDeletingProblem} = useMutation({
        mutationFn: id=> deleteProblemApi(id),
        onSuccess: ()=>{
            toast.success("Mesele maglumatlary bazadan pozuldy")
            queryClient.invalidateQueries({
                queryKey: ['problems', id]
            })
        },
        onError: err=>{
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')  
        }
    })
    return {deleteProblem, isDeletingProblem}
}

export function useGetProblem(){

    const params = useParams()
    const {id} = params
    const {isLoading, data: problem} = useQuery({
        queryKey:['problem'],
        queryFn: ()=> getProblemApi(id)
    })

    return {isLoading, problem}
}

export function useGetProblemById(){
    const {problem} = useParams()
   
    const {isLoading, data} = useQuery({
        queryKey:['problem'],
        queryFn: () => getProblemApi(problem)
    })

    return {isLoading, data}
}
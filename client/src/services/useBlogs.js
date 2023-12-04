import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBlog as createBlogApi, getBlogs } from "../api/apiBlogs";

export  function useCreateBlog(){
    const queryClient = useQueryClient()
    
    const {mutate: createBlog, isLoading} = useMutation({
        mutationFn: createBlogApi,
        onSuccess: ()=>{
            toast.success('Täze bildiriş döredildi')
            queryClient.invalidateQueries({
                queryKey: ['blogs']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, createBlog}
}

export function useGetBlogs(){
    const {isLoading, data: blogs} = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs
    })
    return {isLoading, blogs}
}

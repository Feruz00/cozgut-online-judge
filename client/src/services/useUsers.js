import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdminApi, createUserApi, deleteUserApi, editUserApi, getAdminsApi, getUsersApi, updateUserApi } from "../api/apiUsers";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export  function useCreateUser(){
    const queryClient = useQueryClient()
    
    const {mutate: createUser, isLoading} = useMutation({
        mutationFn: createUserApi,
        onSuccess: ()=>{
            toast.success('Ulanyjyň degişli maglumatlar döredildi')
            queryClient.invalidateQueries({
                queryKey: ['group']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, createUser}
}

export  function useCreateAdmin(){
    const queryClient = useQueryClient()
    
    const {mutate: createAdmin, isLoading} = useMutation({
        mutationFn: createAdminApi,
        onSuccess: ()=>{
            toast.success('Admine degişli maglumatlar döredildi')
            queryClient.invalidateQueries({
                queryKey: ['admin']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, createAdmin}
}

export function useGetUsers(){
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type') || 'all'
    const {isLoading, data: users} = useQuery({
        queryKey: [type],
        queryFn: ()=>getUsersApi(type)
    })
    return {isLoading, users}
}
export function useGetAdmins(){
    const {isLoading, data: admins} = useQuery({
        queryKey: ['admin'],
        queryFn: getAdminsApi
    })
    return {isLoading, admins}
}
export function useShowMembers(){
    const {isLoading, data: users} = useQuery({
        queryKey: ['group'],
        queryFn: ()=>getUsersApi('group')
    })
    return {isLoading, users}
}


export function useUpdateUser(){
    
    const queryClient = useQueryClient()
    
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type') || 'all'
    const {mutate: updateUser, isLoading} = useMutation({
        mutationFn: d=>updateUserApi(d),
        onSuccess: ()=>{
            toast.success('Ulanyjyň degişli maglumatlar üýtgedildi')
            queryClient.invalidateQueries({
                queryKey: [type]
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, updateUser}
}

export function useDeleteUser(){
    
    const queryClient = useQueryClient()
    
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type') || 'all'
    const {mutate: deleteUser, isLoading} = useMutation({
        mutationFn: d=>deleteUserApi(d),
        onSuccess: ()=>{
            toast.success('Ulanyjyň degişli maglumatlar bazadan pozuldy')
            queryClient.invalidateQueries({
                queryKey: [type]
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, deleteUser}
}

export function useEditUser(){
    
    const queryClient = useQueryClient()
    
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type') || 'all'
    const {mutate: editUser, isLoading: isEditing} = useMutation({
        mutationFn: ({id,d})=>editUserApi(id,d),
        onSuccess: ()=>{
            toast.success('Ulanyjyň degişli maglumatlar üýtgidildi')
            queryClient.invalidateQueries({
                queryKey: [type]
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {editUser, isEditing}
}
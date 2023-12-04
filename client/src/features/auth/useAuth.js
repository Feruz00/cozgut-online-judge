import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeInfoApi,  changePasswordApi, getAccountInfo, getCurrentUserApi, getProfileApi, loginApi, logoutApi, registerApi, uploadPhotoApi } from "../../api/apiAuth";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function useRegister(){
    const {mutate: register, isLoading: isRegister} = useMutation({
        mutationKey: ['register'],
        mutationFn: registerApi,
        onSuccess: ()=>{
            toast.success("Ulanyjy döredildi")
        },
        onError: err=>{
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')  
        }
    })

    return {register, isRegister}
}
export function useLogin(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const {mutate: login, isLoading: isLogining} = useMutation({
        mutationKey: ['login', 'current-user'],
        mutationFn: loginApi,
        onSuccess: (user)=>{
            console.log(user)
            queryClient.setQueryData(['user'],user)
            if(user.role ==='admin')
                navigate('/admin')
            else
                navigate(-1, {replace: true})

        },
        onError: err=>{
            toast.error(err?.response?.data?.message || 'Ýalnyş parol ýa login')
        }
    })

    return {login, isLogining}
}

export function useCurrentUser(){
    console.log("geldim use current route")
    const {isLoading, data:user, error} = useQuery({
        queryKey:["user"],
        queryFn: getCurrentUserApi,
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        retryOnMount: false,
        retry: false
    })
    return {isLoading, user, isAuthenticated: error? false:true }
}
export const useLogout = ()=>{
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {mutate: logout, isLoading} = useMutation({
        mutationFn: logoutApi,
        onSuccess: ()=>{
            navigate('/login', {replace: true})
            queryClient.removeQueries()
        }
    })
    return {logout, isLoading}
}

export function useGetProfile(){
    const {isLoading, data:profile} = useQuery({
        queryKey:[ "profile" ],
        queryFn: getProfileApi
    })
    return {isLoading, profile }
}
export function useGetAccount(){
    const {id} = useParams()
    console.log(id)
    const {isLoading, data:account} = useQuery({
        queryKey:[`user-${id}`],
        queryFn: ()=> getAccountInfo(id)
    })
    return {isLoading, account }
}

export const useChangeInfo = ()=>{
    const queryClient = useQueryClient()
    
    const {mutate: changeInfo, isLoading} = useMutation({
        mutationFn: changeInfoApi,
        onSuccess: (user)=>{
            console.log(user)
            queryClient.setQueryData(['profile'],user)
            toast.success('Maglumatlaryňyz üstünlikli üýtgedildi')
            queryClient.invalidateQueries({
                queryKey: [ 'profile' , 'user' ]
            })

        },
        onError: err=>{
            toast.error(err?.response?.data?.message || 'Serwerde näsazlyk boldy')
        }
    })
    return {changeInfo, isLoading}
}
export const useChangePassword = ()=>{
    
    const {mutate: changePassword, isLoading} = useMutation({
        mutationFn: changePasswordApi,
        onSuccess: ()=>{
            toast.success('Açar sözi üstünlikli üýtgedildi')
        },
        onError: err=>{
            toast.error(err?.response?.data?.message ||'Serwerde näsazlyk boldy')
        }
    })
    return {changePassword, isLoading}
}

export const useUploadPhoto = ()=>{
    const queryClient = useQueryClient()
    
    const {mutate: uploadPhoto, isLoading} = useMutation({
        mutationFn: uploadPhotoApi,
        onSuccess: ()=>{
            toast.success('Profil suratyňyz ýüklenildi')
            queryClient.invalidateQueries({
                queryKey: ['user']
            })

        },
        onError: err=>{
            toast.error(err?.response?.data?.message || 'Serwerde näsazlyk boldy')
        }
    })
    return {uploadPhoto, isLoading}
}
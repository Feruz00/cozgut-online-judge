import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {createLanguage as createLanguageApi, getLangugaes, editLanguage as editLanguageApi} from '../../api/apiLanguage'
import toast from 'react-hot-toast'

const useGetLanguages = ()=>{
    const {data: languages, isLoading: isLoadingLanguages} = useQuery({
        queryFn: getLangugaes,
        queryKey: ['languages']
    })

    return {languages, isLoadingLanguages}
}

export  function useCreateLanguage(){
    const queryClient = useQueryClient()
    
    const {mutate: createLanguage, isLoading} = useMutation({
        mutationFn: createLanguageApi,
        onSuccess: ()=>{
            toast.success('Täze komplýator döredildi')
            queryClient.invalidateQueries({
                queryKey: ['languages']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, createLanguage}
}

export  function useEditLanguage(){
    const queryClient = useQueryClient()
    
    const {mutate: editLanguage, isLoading} = useMutation({
        mutationFn: ({id, d}) => editLanguageApi(id, d),
        onSuccess: ()=>{
            toast.success('Komplýator maglumatlary üýtgedildi')
            queryClient.invalidateQueries({
                queryKey: ['languages']
            })
        },
        onError: (err)=>{
            toast.error(err)
        }
    })
    return {isLoading, editLanguage}
}

export {useGetLanguages}
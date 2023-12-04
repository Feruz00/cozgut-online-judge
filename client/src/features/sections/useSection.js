import {useQuery} from '@tanstack/react-query'
import {getAll, getData, getProblemsBySection, getSubSections} from '../../api/apiSections'
import { useParams, useSearchParams } from 'react-router-dom'
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {getSections as getSectionsApi,
    deleteSection as deleteSectionApi,
    createSection as createSectionApi,
    updateSection as updateSectionApi,
    deleteSubSection as deleteSubSectionApi,
    updateSubSection as updateSubSectionApi
} from '../../api/apiSections'
import {
    createSubSection as createSubSectionApi, getCurrentSubSection
} from '../../api/apiSubSection'
import toast from "react-hot-toast"

export function useGetData() {
    const [searchParams] = useSearchParams()
    const tabs = !searchParams.get('tab') ? 'main': searchParams.get('tab');
    const page = !searchParams.get('page') ? 1: searchParams.get('page');
    const sort = !searchParams.get('sortField') ? 'createdAt': searchParams.get('sortField')
    const direction = !searchParams.get('direction') ? 1 : searchParams.get('direction') === 'asc'?1:-1
    const section = !searchParams.get('section') ? []: searchParams.get('section')

    const {isLoading, data, error} = useQuery({
        queryFn: ()=>getData({tab: tabs, page, sort, direction, section}),
        queryKey:[tabs, page*1, direction*1, sort, section]
    }) 
    return {isLoading, data, error}
}

export function getSections(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isLoading, data:sections, error} = useQuery({
        queryKey:['sections'],
        queryFn: getSectionsApi
    })
    return {isLoading, sections, error}
}


export function useCreateSection(){
    const queryClient = useQueryClient()
    
    const {mutate: createSection, isLoading: isCreatingSection} = useMutation({
        mutationFn: newSection => createSectionApi(newSection),
        onSuccess: ()=>{
            toast.success("Täze bölüm döredildi")
            queryClient.invalidateQueries({
                queryKey: ['main']
            })
        },
        onError: err=>{
            
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')   
        }
    })
    return {createSection, isCreatingSection}
}

export function useDeleteSection(){
    const queryClient = useQueryClient()

    const {mutate: deleteSection, isLoading: isDeletingSection} = useMutation({
        mutationFn: id => deleteSectionApi(id),
        onSuccess: ()=>{
            toast.success("Bölüm bazadan pozuldy")
            queryClient.invalidateQueries({
                queryKey: ['main']
            })
        },
        onError: err=>{
            
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')   
        }
    })
    return {deleteSection, isDeletingSection}
}

export function useEditSection(){
    const queryClient = useQueryClient()

    const {mutate: editSection, isLoading: isEditingSection} = useMutation({
        mutationFn: ({id, data}) => updateSectionApi(id, data),
        onSuccess: ()=>{
            toast.success("Bölüm maglumatlary täzelendi")
            queryClient.invalidateQueries({
                queryKey: ['main']
            })
        },
        onError: err=>{
            
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')   
        }
    })
    return {editSection, isEditingSection}
}

export function useCreateSubSection(){
    const queryClient = useQueryClient()
    
    const {mutate: createSubSection, isLoading: isCreatingSubSection} = useMutation({
        mutationFn: newSection => createSubSectionApi(newSection),
        onSuccess: ()=>{
            toast.success("Täze bölümçe döredildi")
            queryClient.invalidateQueries({
                queryKey: ['sub']
            })
        },
        onError: err=>{
            
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')   
        }
    })
    return {createSubSection, isCreatingSubSection}
}

export function useDeleteSubSection(){
    const queryClient = useQueryClient()

    const {mutate: deleteSubSection, isLoading: isDeletingSubSection} = useMutation({
        mutationFn: id => deleteSubSectionApi(id),
        onSuccess: ()=>{
            toast.success("Bölümçe bazadan pozuldy")
            queryClient.invalidateQueries({
                queryKey: ['sub']
            })
        },
        onError: err=>{
            
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')   
        }
    })
    return {deleteSubSection, isDeletingSubSection}
}

export function useEditSubSection(){
    const queryClient = useQueryClient()

    const {mutate: editSubSection, isLoading: isSubEditingSection} = useMutation({
        mutationFn: ({id, data}) => updateSubSectionApi(id, data),
        onSuccess: ()=>{
            toast.success("Bölümçe maglumatlary täzelendi")
            queryClient.invalidateQueries({
                queryKey: ['sub']
            })
        },
        onError: err=>{
            
            toast.error(err.response?.data?.message || 'Serwerde näsazlyk ýüz berdi')   
        }
    })
    return {editSubSection, isSubEditingSection}
}

export function useGetSubsection(){
   // eslint-disable-next-line react-hooks/rules-of-hooks
    const {id} = useParams()
    // console.log(id)
    const {isLoading, data, error} = useQuery({
        queryKey:[id],
        queryFn: ()=>getCurrentSubSection(id)
    })
    return {isLoading, data, error}
}



export function useGetProblemsBySubsection(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {id} = useParams()
     // console.log(id)
    const {isLoading, data, error} = useQuery({
        queryKey:[id],
        queryFn: ()=>getProblemsBySection(id)
    })
    return {isLoading, data, error}
}
 

export function useGetTree(){
    const {isLoading, data, error} = useQuery({
        queryKey:['sections'],
        queryFn: getAll
    })
    return {isLoading, data, error}
}

export function useGetSubSectionsBySection(){
    const {id} = useParams()
    const {isLoading, data, error} = useQuery({
        queryKey:['subsection'],
        queryFn: () => getSubSections(id)
    })
    return {isLoading, data, error}
}

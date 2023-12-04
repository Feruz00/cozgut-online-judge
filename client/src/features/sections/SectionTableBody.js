import Table from "../../ui/Table"
import ThreeDot from "./ThreeDot"
import { useDeleteSection, useDeleteSubSection } from "./useSection"

const P = ({children})=>{
    return <p className='text-sm text-[.9rem] 
    text-gray-900 font-semibold border-r border-r-color-grey-300 '>{children}</p>
}

export const SectionsBody = ({row})=>{
    const {deleteSection, isDeletingSection} = useDeleteSection()
   
    return (
        <Table.Row>
            <P>{row.title}</P>
            <ThreeDot 
                disabled={isDeletingSection} 
                onConfirm={deleteSection} 
                tab="main" 
                row={row} />
        </Table.Row>
    )
}

export const SubSectionsBody = ({row})=>{
    const {isDeletingSubSection, deleteSubSection} = useDeleteSubSection()
    return (
        <Table.Row>
            <P>{row.title}</P>
            <P>{row.section.title}</P>
            <ThreeDot 
                disabled={isDeletingSubSection} 
                onConfirm={deleteSubSection} 
                tab="sub" 
                row={row} 
            />
        </Table.Row>
    )
}

export const ProblemsBody = ({row})=>{
    return <Table.Row>
        <P>{row.title}</P>
        <div>{row.level}</div>
        <div> {row.tags.join(' ')} </div>
        <ThreeDot disabled={false} onConfirm={()=>{}} tab="main" row={row} />
    </Table.Row>
}


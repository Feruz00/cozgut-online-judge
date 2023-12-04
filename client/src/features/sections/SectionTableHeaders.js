import SortBy from "../../ui/SortBy"
import Table from "../../ui/Table"

export const SectionRow = ()=>{
    return (
        <Table.Header>
            <SortBy field="title">
                Maglumatyň ady
            </SortBy>
                        
                        
            <div></div>
        </Table.Header>
    )
}

export const SubSectionRow = ()=>{
    return (
        <Table.Header>
            <SortBy field="title">
                Maglumatyň ady
            </SortBy>
            <SortBy field="section.title">
                Esasy bölümi
            </SortBy>
                        
            <div></div>
        </Table.Header>
    )
}

export const ProblemRow = ()=>{
    return (
        <Table.Header>
            <SortBy field="title">
                Meseläniň ady
            </SortBy>
            <SortBy field="level">
                Derejesi
            </SortBy>
            <div>
                Tegler
            </div>
            <div></div>
        </Table.Header>
    )
}
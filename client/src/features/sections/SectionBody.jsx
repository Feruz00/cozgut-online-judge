import React from 'react'
import Menus from '../../ui/Menus'
import Table from '../../ui/Table'
import Empty from '../../ui/Empty'
import Pagination from '../../ui/Pagination'
import {SectionRow} from './SectionTableHeaders'
// import SortBy from '../../ui/SortBy'
import { useSearchParams } from 'react-router-dom'
import { SubSectionRow } from './SectionTableHeaders'
import { SectionsBody, SubSectionsBody } from './SectionTableBody'

const SectionBody = ({data, count}) => {
    const [searchParams] = useSearchParams()
    const tab = searchParams.get('tab') || 'main'
    let columns = []
    if(tab === 'main') columns = ['1fr', '1rem']
    else if(tab === 'sub') columns = ['1fr', '1fr', '1rem']
    
    if(data && data.length ) 
        return (
        <>
            <Menus>
                <Table columns={columns}>
                    {
                        tab === 'main' ? <SectionRow />
                        : <SubSectionRow />
                    }
                    <Table.Body 
                        data={data}
                        render={(row)=>(
                            tab === 'main' ? 
                                <SectionsBody key={row._id} row={row}  />
                                : 
                                <SubSectionsBody key={row._id} row={row} />
                            )}
                    />
                        
                </Table>
            </Menus>
            <Pagination count={count} />
        </>)
    else return <Empty />
}

export default SectionBody
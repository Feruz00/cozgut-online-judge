import { createContext, useContext } from "react";
import classNames from "classnames";

const StyledTable = ({children, role})=>{
    return <div role={role} 
        className="border border-color-grey-200 text-sm bg-color-grey-0 rounded-md  w-full">
        {children}
    </div>
}

const CommonRow = ({children, columns, className, role, as=""})=>{
    
    // console.log(columns.join('_'))
    return <div 
        role={role}
        as={as}
        className={classNames( className, ` w-full grid gap-3 transition-none ` )}
        style={{gridTemplateColumns: columns.join(' ')}}
        >
        {children}
    </div>
}

const StyledHeader = ({children, columns, role, as})=>{
    return <CommonRow 
            role={role}
            as={as}
            className="text-color-grey-600 px-10 py-4 bg-color-grey-50 border-b
                border-b-color-grey-100 uppercase tracking-wider font-semibold 
                " 
            columns={columns}
        >
        {children}
    </CommonRow>
}

const StyledRow = ({children, columns, role})=>{
    return <CommonRow
        role={role}
        columns={columns} 
        className="px-10 py-3 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-color-grey-300 "
    >

        {children}
    </CommonRow>
}

const StyledBody = ({children})=>{
    return <section className="mx-0 my-2" >{children}</section>
}

const Footer = ({children})=>{
    return <footer className="bg-color-grey-50 flex justify-center p-5 [&:not(:has(*))]:hidden">
        {children}
    </footer>
}

const Empty = ({children})=>{
    return <p className="text-base font-medium text-center m-10">{children}</p>
}

const TableContext = createContext()

const Table = ({children, columns})=>{
  return <TableContext.Provider value={{columns}}>
    <StyledTable role="table">
      {children}
    </StyledTable>
  </TableContext.Provider>
}

const Header = ({children})=>{
  const {columns} = useContext(TableContext)
//   console.log(columns)
  return <StyledHeader role="row" columns={columns} as="header">
    {children}
  </StyledHeader>
}


const Row = ({children})=>{
  const {columns} = useContext(TableContext)
  return <StyledRow role="row" columns={columns}>
    {children}
  </StyledRow>
}

const Body = ({data, render})=>{
  if(data.length === 0) return <Empty >No data to show at the moment</Empty>
  return <StyledBody>
    {data.map(render)}
  </StyledBody>
}

Table.Header = Header
Table.Row = Row
Table.Body = Body
Table.Footer=Footer

export default Table
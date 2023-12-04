import React from 'react'

const Table = ({data, labels}) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 border-l border-r 
    border-r-gray-100 border-l-gray-100 rounded-sm">
        
        <thead className="text-md font-thin text-gray-700 uppercase bg-gray-50">
            <tr>
                {
                    labels.map( i=> (
                        <th scope="col" className="px-6 py-3" key={i.key}>
                            {i.label}
                        </th>
                    ) )
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map( (i, index)=>(
                    <tr className={`${ index%2 ? 'bg-gray-50' : 'bg-white'} 
                    border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 font-semibold  `} key={index}>
                        {
                            labels.map( j=>(
                                // eslint-disable-next-line jsx-a11y/scope
                                <td scope="row" className="px-6 py-4  dark:text-white" key={j.key}>
                                    {i[j.key]}
                                </td>
                            ) )
                        }
                    </tr>
                ) )
            }
            
        </tbody>
    </table>
  )
}

export default Table
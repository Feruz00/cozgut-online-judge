import { Popconfirm, Tag } from "antd";
import { RxPencil2, RxTrash } from "react-icons/rx";
import { Link } from "react-router-dom";

export const ProblemColumn = (data, title="", deleteProblem, isDeletingProblem, role="user")=>{
    // const {deleteSection} = useDeleteSection()
    // useGetTree()
    // console.log("geldim")
    // console.log(data)
    const columns = [
        {
          title: 'Meseläniň ady',
          dataIndex: 'title',

          width: '60%',
          ellipsis: true,
            filterSearch: true,
            filterMode: 'tree',
            filters: data && data.parent.map( i=>({
                text: i.title,
                value: i._id,
                children: data.children.filter(j=> j.section === i._id).map(j=>({
                    text: j.title,
                    value: j._id
                }))
            }) ),
          render: (p, record)=> <Link to={record._id}> {p}  </Link>,
          
          defaultFilteredValue: title.length > 0 ? title.split(','): [],
        },
        {
            title: "Kynlygy",
            dataIndex: 'level',
            width: '10%',
            sorter: true,
            render: p=> <Tag>{p}</Tag>
        },
        {
            title: "Tegler",
            dataIndex: 'tags',
            width: '18%',
            render: (p)=> p?.map( i=><Tag key={i._id}>{i.name} </Tag> ),
            filterSearch: true
        }
    ];
    if(role === 'admin' || role === 'coordinator' ){
      columns.push( {
        title: 'Sazlamalar',
        width: '12%',
        render: (row, record)=> <div className="w-full flex gap-4">

              <Link to={`edit/${record._id}`}>
                  <RxPencil2 className="cursor-pointer text-lg text-nft-dark" />
              </Link>
          
            <Popconfirm title="Meseläni pozmakcymy?" onConfirm={ ()=>deleteProblem(row._id) } disabled={isDeletingProblem}>
              <RxTrash className="cursor-pointer text-lg" />
            </Popconfirm>
        </div>
      },  )
    }
    return columns
}

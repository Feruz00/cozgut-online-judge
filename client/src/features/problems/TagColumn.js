import { Popconfirm } from "antd";
import { RxPencil2, RxTrash } from "react-icons/rx";
import Modal from "../../ui/Modal";
import AddTag from "./AddTag";

export const TagColumn = (deleteTag)=>{
    const columns = [
        {
          title: 'Tegiň ady',
          dataIndex: 'name',

          width: '90%',
          ellipsis: true,
          sorter: true
        },
        {
          title: 'Sazlamalar',
          width: '15%',
          render: (row, record)=> <div className="w-full flex gap-4">
                <Modal>
                    <Modal.Open opens="edit-tag">
                        <RxPencil2 className="cursor-pointer text-lg text-nft-dark" />
                    </Modal.Open>
                    <Modal.Window name="edit-tag">
                        <AddTag editTag={record} />
                    </Modal.Window>
                </Modal>
                
              <Popconfirm title="Tegi pozmakcymy?" onConfirm={()=>deleteTag(row._id)}>
                <RxTrash className="cursor-pointer text-lg" />
              </Popconfirm>
          </div>
        },
        
          
    ];

    return columns
}

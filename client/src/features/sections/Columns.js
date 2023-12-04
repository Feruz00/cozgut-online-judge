import { RxPencil2, RxPlus, RxTrash } from "react-icons/rx";
import { Popconfirm } from "antd";
import Modal from "../../ui/Modal";
import AddSection from "./AddSection";
import { Link } from "react-router-dom";

export const SectionColumn = (deleteSection)=>{
    // const {deleteSection} = useDeleteSection()
    const columns = [
        {
          title: 'Bölümiň ady',
          dataIndex: 'title',
          width: '60%',
          ellipsis: true,
          sorter: true,
        },
        {
            title: "Gysgaça beýan",
            dataIndex: 'description',
            width: '28%',
            ellipsis: true,
        },
        {
          title: 'Sazlamalar',
          width: '12%',
          render: (row)=> <div className="w-full flex gap-4">
              <Modal>
                <Modal.Open opens="edit">
                  <RxPencil2 className="cursor-pointer text-lg" />
                </Modal.Open>
                <Modal.Window name="edit">
                  <AddSection sectionToEdit={row} />
                </Modal.Window>
              </Modal>

              <Popconfirm title="Siz pozmakcymy?" onConfirm={()=>deleteSection(row._id)}>
                <RxTrash className="cursor-pointer text-lg" />
              </Popconfirm>
          </div>
        },
        
          
    ];

    return columns
}

export const SubSectionColumn = (sections, deleteSubSection, section="")=>{
  // const {deleteSubSection} = useDeleteSubSection()
  const columns = [
      {
        title: 'Bölümiň ady',
        dataIndex: 'title',
        width: '50%',
        
        render: (p,_)=> <Link to={`${_._id}`}>{p}</Link>,
        ellipsis: true,
        sorter: true,
      },
      {

        title: 'Esasy bölümi',
        dataIndex: "section",
        width: '38%',
        ellipsis: true,
        filterSearch: true,
        filterMode: 'tree',
        filters: sections && sections.map( i => ({
          text: i.title,
          value: i._id,}) ),
        render: row=> <p> {row?.title ? row.title : "Baş bölümçe ýok" } </p>,
        
        defaultFilteredValue: section.length > 0 ? section.split(','): [],
      },
      {
        title: 'Sazlamalar',
        width: '12%',
        render: (row)=> <div className="w-full flex gap-4">
            <Modal>
              <Modal.Open opens="edit">
                <RxPencil2 className="cursor-pointer text-lg" />
              </Modal.Open>
              <Modal.Window name="edit">
                <AddSection sectionToEdit={row} />
              </Modal.Window>
            </Modal>
            <Popconfirm title="Siz pozmakçymy?" onConfirm={()=>deleteSubSection(row._id)}>
              <RxTrash className="cursor-pointer text-lg" />
            </Popconfirm>
            
        </div>
      },
      
        
  ];

  return columns
}
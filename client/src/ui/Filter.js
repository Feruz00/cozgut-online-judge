import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";

function Filter({filterField, options}){
  const [searchParams, setSearchParams] = useSearchParams()


  const handleClick = (url)=>{
    // setActiveKey(url)
    searchParams.set( filterField, url )
    if(searchParams.get('page')) {
      searchParams.set('page',1) 
    }
    // searchParams.delete(true);
    if(searchParams.get('sortField')) searchParams.delete('sortField')
    if(searchParams.get('direction'))searchParams.delete('direction')
    if(searchParams.get('section'))searchParams.delete('section')
    if(searchParams.get('title'))searchParams.delete('title')
 
    setSearchParams(searchParams)
  }


  return <Tabs 
    onChange={handleClick}
    // type=""
    activeKey={ searchParams.get(filterField) || options[0].value  }
    items={
      options.map( option=> ({
      key: option.value,
      label: option.label
      // children: option.label
    }))}
  />
}

export default Filter
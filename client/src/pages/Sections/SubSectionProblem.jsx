import { Table } from 'antd'
import React from 'react'
import parser from 'html-react-parser'
import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";
import Loading from '../../ui/Loading';
import { useGetProblemById } from '../../features/problems/useProblems';
import SectioSendProblem from './SectionSendProblem';

const SubSectionProblem = () => {
    const {data: problem, isLoading} = useGetProblemById()
    if(isLoading) return <Loading />
    return (
      <div className={`mt-3 px-10 grid grid-cols-[1fr_15rem] py-2`}>
      <div className='px-10'>
      <div className='flex w-full flex-col py-4 shadow-lg my-3'>
            <div className='flex w-full justify-center flex-col'>
                <h3 className='text-center font-medium mb-1 text-xl'> {problem.title} </h3>
                <p className='text-sm  text-center'> Jogabyň çykmaly wagty:  {problem.time} sekunt </p>
                <p className='text-sm text-center'> Ulanylmaly möçber:  {problem.memory} megabaýt </p>
                <p className='text-sm text-center'> Giriş düzgüni: {' '}
                        {problem.withTestFile ? problem.testFileInput :'standart' } 
                    
                </p>
                <p className='text-sm text-center'> Çykyş düzgüni: {' '}
                    {problem.withTestFile ? problem.testFileOutput :'standart' } 
                </p>
            </div>
            <div className="px-3">
                <div className="sun-editor-editable text-lg">
                  {parser(problem.description)}
                </div>
            </div>
            <div className='px-3'>
                <h3 className='text-base font-bold'>Giriş:</h3>
                <div className="sun-editor-editable text-base ">
                  {parser(problem.input_config)}
                </div>
            </div>

            <div className='px-3'>
                <h3 className='text-base font-bold'>Çykyş:</h3>
                <div className="sun-editor-editable text-base ">
                  {parser(problem.output_config)}
                </div>
            </div>
            
            <div className='px-3'>
                <h3 className='text-base font-bold'>Nusga testler:</h3>
                <div className="sun-editor-editable text-base " >
                <Table 
                    pagination={false}
                    size='small'
                    columns={[{
                            title: "Giriş",
                            dataIndex: 'input',
                            render: p=> p.split('\n').map( text=> <p key={text} className='whitespace-break-spaces font-courier' 
                            >{text}</p> )
                        
                        },{
                            title: "Çykyş",
                            dataIndex: 'output',
                            render: p=> p.split('\n').map( text=> <p key={text} className='whitespace-break-spaces  font-courier '>{text}</p> )
                        },
                        
                        ]}
                    dataSource={problem.inputExample.map( (i, index)=>({key: i._id, input: i, 
                        output: problem.outputExample[index]}) )}
                />
                </div>
            </div>
            <div className='px-3'>
                <div className="sun-editor-editable text-base ">
                  {parser(problem?.extraDescription !== 'undefined' ? (problem?.extraDescription || '')  : '')}
                </div>
            </div>
            
            
        </div>
      </div>
      <SectioSendProblem submissions={problem?.submissions} problem={problem?._id} tags={problem?.tags} level={problem.level} subsection={problem.subsection} />
    </div>)
    
}

export default SubSectionProblem
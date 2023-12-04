import React from 'react'
import { useGetProblemById } from '../problems/useProblems'
import Loading from '../../ui/Loading'
import parser from 'html-react-parser'
import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";
import { Table } from 'antd';

const ViewContestProblem = () => {
    
    const {data: problem, isLoading} = useGetProblemById()
    if(isLoading) return <Loading />
    return (
      <div className='mt-3 px-10'>
      <div className='flex flex-row gap-2 rounded shadow items-center px-5 py-1'>
          <p className='text-lg font-medium'>
              Bäsleşik: 
          </p>
          <p className='text-lg'> {problem?.contest?.title} </p>
      </div>
      <div>
      <div className='flex w-full flex-col py-4 shadow my-3'>
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
                <h3 className='text-base font-medium'>Giriş:</h3>
                <div className="sun-editor-editable text-base ">
                  {parser(problem.input_config)}
                </div>
            </div>

            <div className='px-3'>
                <h3 className='text-base font-medium'>Çykyş:</h3>
                <div className="sun-editor-editable text-base ">
                  {parser(problem.output_config)}
                </div>
            </div>
            
            <div className='px-3'>
                <h3 className='text-base font-medium'>Nusga testler:</h3>
                <div className="sun-editor-editable text-base " >
                <Table 
                    pagination={false}
                    size='small'
                    columns={[{
                            title: "Giriş",
                            dataIndex: 'input',
                            render: p=> p.split('\n').map( text=> <p className='whitespace-break-spaces font-courier' 
                            >{text}</p> )
                        
                        },{
                            title: "Çykyş",
                            dataIndex: 'output',
                            render: p=> p.split('\n').map( text=> <p className='whitespace-break-spaces  font-courier '>{text}</p> )
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
    </div>)
    
}

export default ViewContestProblem
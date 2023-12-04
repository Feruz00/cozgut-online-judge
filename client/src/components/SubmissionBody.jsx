import React from 'react'
import Editor from '@monaco-editor/react'
import { RxExclamationTriangle } from 'react-icons/rx'
const Verdict = ({verdict, _={}})=>{
  if(_.queue){
    return <p>
      Nobata goýuldy
    </p>
  }
  if(!_.queue && !_.verdict ){
    return <p>
      Barlanýar
    </p>
  }
  if(_.accepted){
    return <p className='font-medium text-green-600 '>
      Dogry çözüw 
    </p>
  }
  if(verdict === 'COMPILATION ERROR'){
    return <p className='font-light'>
      <RxExclamationTriangle className='text-sm' /> Komplýasiýa ýalňyşlygy</p>
  }
  return <p className='text-sm text-red-500 font-medium flex items-center gap-1'>
    <RxExclamationTriangle className='text-sm' />
    {`${_?.problem?.type === 'custom' ? _?.wrongTestNumber?.testNum: `${_?.wrongTestNumber?.subTest}`} bölek testiň ${_?.wrongTestNumber?.testNum} `} testde 
      
      {verdict === 'WRONG ANSWER' && ' ýalňyş jogap'}
      {verdict === 'TIME LIMIT' && ' berlen wagtdan geçdi'}
      {verdict === 'MEMORY LIMIT' && ' berlen möçberden geçdi'}
      {verdict === 'RUNTIME ERROR' && ' näsazlyk ýüze çykdy'}

  </p>
}
const SubmissionBody = ({submission, onCloseModal}) => {
  console.log(submission)
  return (
    <div className='w-[55rem] flex flex-col gap-3'>
      <div className='flex flex-row justify-between'>
        <div className='flex-row flex gap-2'>
          <p className='text-base font-medium '>
            Ugradyjy:
          </p>
            <p>

             {submission?.user?.username} 
            </p>

        </div>
        <div className='flex flex-row gap-2'>
          <p className='text-base font-medium '>
            Mesele:
          </p>
            <p>

            {submission?.problem?.title} 
            </p>
        </div>
      </div>
      <div className='flex flex-col h-[30rem] gap-2'>
        <p className=''>Iberen çözüwi:</p>
        <Editor
          
          language={submission?.lang?.extension}
          defaultValue={submission?.code}
          value={submission?.code}
          
          theme='vs-dark'
          height="100%"
          
          options={{
            readOnly: true,
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 13,
            fontFamily: 'font-consolas', 
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className='flex flex-row gap-2'>
          <p className='text'>Netije:</p>
          <Verdict verdict={submission?.verdict} _={submission} />
          
      </div>
      {
        submission?.stdout?.length > 0 && (<div className='select-none bg-neutral-300 px-3 py-2'>
          {
            submission?.stdout?.map(i=><p className='font-consolas'>{i}</p>)
          }
        </div>
        )
      }
    </div>
  )
}

export default SubmissionBody
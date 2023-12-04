import { RxExclamationTriangle } from "react-icons/rx"


export default function Verdict({verdict, _={}}){
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
       {
              _.preTest ? 'Pretestde dogry jogap'
              : 'Dogry çözüw'
          }
      </p>
    }
    if(verdict === 'COMPILATION ERROR'){
      return <p className='font-light'>
        <RxExclamationTriangle className='text-sm' /> Komplýasiýa ýalňyşlygy</p>
    }
    return <p className='text-sm text-red-500 font-medium flex items-center gap-1'>
      <RxExclamationTriangle className='text-sm' />
      {
          _.problem.type === 'custom' 
              ?  _.wrongTestNumber.testNum + ( _.preTest ? ' pretestlerde ' : ' testlerde ')
              :  _.wrongTestNumber.subTest + '  bölek testiň '+  _.wrongTestNumber.testNum
        }
        {verdict === 'WRONG ANSWER' && ' ýalňyş jogap'}
        {verdict === 'TIME LIMIT' && ' berlen wagtdan geçdi'}
        {verdict === 'MEMORY LIMIT' && ' berlen möçberden geçdi'}
        {verdict === 'RUNTIME ERROR' && ' näsazlyk ýüze çykdy'}
  
    </p>
  }
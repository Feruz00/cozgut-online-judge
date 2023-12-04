import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <InfinitySpin
            width='200'
            color="rgb(79, 70, 229)"
        />
    </div>
  )
}

export default Loading
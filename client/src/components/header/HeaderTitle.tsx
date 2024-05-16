import React from 'react'

const HeaderTitle = ({title}:{title:string}) => {
  return (
    <div className=' pt-4 pb-6'>
        <h1 className=' text-indigo-500 text-2xl md:text-5xl font-bold'>{title}</h1>
    </div>
  )
}

export default HeaderTitle
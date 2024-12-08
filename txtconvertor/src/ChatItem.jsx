import React from 'react'

const ChatItem = ({item}) => {
  return (
    <div className='flex flex-col gap-0 border-2 rounded-xl border-black bg-slate-300'>
              <span className='font-bold'>{item.name}</span>
              <span>{item.message}</span>
            </div>
  )
}

export default ChatItem

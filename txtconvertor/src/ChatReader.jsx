import React, { useEffect, useState } from 'react'
import './utils/matches_data.json'
import ChatItem from './ChatItem';
import axios from 'axios';

const ChatReader = ({ chat }) => {




  return (
    <div className='flex justify-center '>
      <div className='border-2 border-black w-[55%] h-[600px] overflow-scroll flex flex-col gap-3'>
        {chat && chat.map((item, index) => (
          <>
            <ChatItem item={item} key={index} />
          </>
        ))}
      </div>

    </div>
  )
}

export default ChatReader

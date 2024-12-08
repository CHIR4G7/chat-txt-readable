import React, { useEffect } from 'react'
import { useState } from 'react'
import { fileReader } from './utils/utils'
import ChatReader from './ChatReader'
import axios from 'axios'
import './App.css'
import homeimg from './assets/img.webp'

const App = () => {

  const [file, setFile] = useState(null)
  const [filePath, setFilePath] = useState(null);
  const [chat, setChat] = useState([]);

  const handleFileChange = (e) => {
    e.preventDefault();
    const newfile = e.target.files[0]
    setFile(newfile);
  }

  const handleSubmit = async (e) => {
    if (!file) {
      alert('no file found please enter a file')
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post('http://127.0.0.1:5000/api/sendfiletoserver', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    setFilePath(response.data.path);
    return;
  }

  const getChats = async () => {
    try {
      const data = {
        "path": filePath
      }
      const response = await axios.get('http://127.0.0.1:5000/api/getjson', {
        params: {
          filePath: encodeURIComponent(filePath)
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
      setChat(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (file != null) {
      alert("File Uploaded");
    }
  }, [file])

  return (
    <div className='flex flex-col gap-3 m-2'>
      <div className='flex flex-row justify-center'>
        <h2 className='text-3xl font-bold underline'>WhatsRead</h2>
      </div>
      <div className='flex flex-row'>
        <div className='w-[60%]'>
          <p className='text-4xl'>Why?</p>
          <span className='text-xl'>WhatsApp chat exports are often hard to decipher, with long lists of raw text that make it tough to extract meaningful insights. This app transforms those exports into a clean, readable format, making it easy to analyze, save memories, or track conversations. Whether you need to review important messages or revisit personal moments, this tool organizes your chats into a simple, digestible layout. Say goodbye to clutter and hello to clarity! </span>
        </div>
        <div >
          <img src={homeimg} alt="" width='600vh' height='600vh' className='rounded-xl' />
        </div>
      </div>
      <div className='mt-2 flex flex-col gap-3'>
        <h2 className='text-4xl'>Steps to Follow :</h2>
        <ul>
          <li>Export the Chat from Whatsapp you want to Read.</li>
          <li>Choose the location of the file(.txt only).</li>
          <li>Click Submit and you file will be processed.</li>
          <li>Click Read To Read the Chat.</li>
        </ul>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-4xl mt-4'>TRY IT OUT!!</h3>

        <input type="file" id="file" accept='.txt' onChange={handleFileChange} />
        <button type='submit' onClick={handleSubmit} className='border-2 border-black p-1 w-20 rounded-md bg-blue-500' >submit</button>
      </div>
      <div className='mt-10'>
        <button onClick={getChats} className='border-2 border-black p-1 rounded-md bg-green-500'>Read</button>
        <ChatReader chat={chat} />
      </div>

    </div>
  )
}

export default App

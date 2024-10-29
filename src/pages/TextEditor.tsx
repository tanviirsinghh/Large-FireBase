import { useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'
// import { Appbar } from '../components/Appbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
// import { ChangeEvent } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
// import { Toast } from 'node_modules/react-toastify/dist/components'

export default function TextEditor () {
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState("" )

  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };

  return (
    <div className='h-screen w-full flex-col justify-center items-center'>
      <Navbar />
      <div className='flex justify-center items-center h-32 w-full  '>
        <div className='  max-w-screen-lg h-16 w-2/3 flex'>
          <input
            onChange={e => {
              setTitle(e.target.value)
            }}
            type='text'
            className=' border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Title'
          />
        </div>
      </div>
      <div className='  flex justify-center items-center h-3/ w-full '>
        <Editor
          apiKey='s73wk7i6fwr11ew23vudqfd79tjyajof2inq6b6qg8a9c9x6
'
          onInit={(_evt, editor) => (editorRef.current = editor)}
          
          init={{
            height: 500,
            width:1000,
            menubar: true,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount'
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onEditorChange={(content) => setDescript(content)} // Update state on change
      
        />
      </div>
      <div className='w-full h-inherit  flex justify-center items-center h-24 '>
        <button
          onClick={async () => {
            
          console.log(title)
          console.log(descript)

            if (title &&  descript == " ") {
              toast.error('Title and Description cannot be empty');
              return;
            }

            try{
              
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                content: descript
              },
              {
                headers: {
                  Authorization: localStorage.getItem('token')
                }
              }
            )
            navigate(`/blog/${response.data.id}`)
          
          }catch(e){
            toast.error('Inputs cannot be empty')
            return ('fcuk')
            
          }
          }}
          type='submit'
          className=' inline-flex items-center px-7 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
        >
          Publish Post
        </button>
      </div>
    </div>
  )
}

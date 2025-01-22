import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'
import likeimg from '../../assets/heart.png'
import cmtimg from '../../assets/comment.png'
import savedimg from '../../assets/bookmark.png'    

interface BlogCardProps {
  id: string
  title: string
  content: string
  url: string
  authorName: string
  like: number
  comment: number
  publishDate: string
  save: number
}
export default function AuthorPosts ({
  id,
  title,
  content,
  url,
  like,
  comment,
  save
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div>
        <div key={id} className='group'>
          <div className='flex gap-4 p-4 rounded-xl bg-black/90 hover:bg-black/60 transition-colors cursor-pointer'>
            <img
              src={url}
              alt={title}
              className='w-24 h-24 rounded-lg object-cover'
            />
            <div className='flex-1'>
              <h3 className='text-indigo-500 font-bold font-mono  text-lg group-hover:text-indigo-500 transition-colors'>
                {title}
              </h3>
              <p
                className='font-mono text-gray-300 text-sm mt-1 line-clamp-2'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    content ? content.slice(1, 80) + '...' : ' '
                  )
                }}
              ></p>

              <div className='flex items-center gap-6 mt-3'>
                <button className='flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors'>
                  <img className='h-5' src={likeimg} alt='' />
                  <span>{like}</span>
                </button>
                <button className='flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors'>
                  <img className='h-6' src={cmtimg} alt='' />
                  <span>{comment}</span>
                </button>
                <button className='flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors'>
                  <img className='h-6' src={savedimg} alt='' />
                  <span>{save}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

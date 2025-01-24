import { Heart, Bookmark } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { Blog, useUserDetails } from '../../hooks/index'
import DOMPurify from 'dompurify'
import Navbar from './Navbar'
import AuthorAsidebar from './AuthorAsidebar'
import { formatISO } from 'date-fns'
import Comments from '../Comments'
import Footer from '../Footer'

export interface Comments {
  id: string
  content: string
  timestamp: string
  user: {
    name: string
    profilePicture: string
    id: string
  }
}

interface blogProps {
  blog: Blog
  editButton: boolean
}

export default function BoltFullBlog ({ blog, editButton }: blogProps) {
  const navigate = useNavigate()
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [newComment, setNewComment] = useState('')
  const { userDetails } = useUserDetails()
  const token = localStorage.getItem('token')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [savedBlogId, setSavedBlogId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const authorId = blog.authorId
  const [comments, setComments] = useState<Comments[]>([])
  const [click, setClick] = useState(false)

  const fetchLikeCount = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/postlikes`,
        { headers: { Authorization: token } }
      )

      if (response && response.data) {
        // Toggle like state and adjust like count
        setLikeCount(response.data.likeCount)
      }
    } catch (e) {
      console.error('Error:', e)

      // Handle specific error scenarios
      if (axios.isAxiosError(e) && e.response?.status === 411) {
        toast.error('Error while fetching Like')
      }
    }
  }
  useEffect(() => {
    fetchLikeCount()
    // Fetch status on component mount or blog.id change
  }, [blog.id])

  useEffect(() => {
    const fetchLikeStatus = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/likestatus/${blog.id}`,
          { headers: { Authorization: token } }
        )

        if (response && response.data.isLiked) {
          const haiLike = response.data.isLiked
          // Toggle like state and adjust like count
          if (haiLike) {
            setLikeStatus(true)
          } else {
            setLikeStatus(false)
          }
        }
      } catch (e) {
        console.error('Error:', e)

        // Handle specific error scenarios
        if (axios.isAxiosError(e) && e.response?.status === 411) {
          setLikeStatus(false)
          toast.error('Error while fetching Like')
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchLikeStatus()

    // Fetch status on component mount or blog.id change
  }, [blog.id, token, likeStatus])

  const handleLike = async () => {
    if (isProcessing) return // Avoid duplicate requests
    setIsProcessing(true)
    setLikeStatus(prevStatus => !prevStatus)

    try {
      if (!likeStatus) {
        // Send POST request to like the blog
        await axios.post(`${BACKEND_URL}/api/v1/blog/${blog.id}/like`, null, {
          headers: { Authorization: token }
        })
        setLikeCount(prevCount => prevCount + 1)
      } else {
        // Send DELETE request to remove like
        await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}/likeremove`, {
          headers: { Authorization: token }
        })
        // Update like count based on server response
        setLikeCount(prevCount => prevCount - 1)
        setLikeStatus(false)
      }
    } catch (error) {
      // Revert UI changes on error
      setLikeStatus(prevStatus => !prevStatus)

      if (axios.isAxiosError(error)) {
        const { status } = error.response || {}
        if (status === 400) {
          toast.error('Already liked.')
        } else if (status === 403) {
          toast.error('Error while removing like.')
        } else if (status === 411) {
          toast.error('Server error, please try again later.')
        } else {
          toast.error('An unexpected error occurred.')
        }
      } else {
        toast.error('Network error, please check your connection.')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const fetchComments = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/comments`,
        { headers: { Authorization: token } }
      )

      if (response && response.data) {
        // Toggle like state and adjust like count
        setComments(response.data.comments)
        setIsLoading(false)
      }
    } catch (e) {
      console.error('Error:', e)

      // Handle specific error scenarios
      if (axios.isAxiosError(e) && e.response?.status === 411) {
        toast.error('Error while fetching Like')
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    fetchComments()
    // Fetch status on component mount or blog.id change
  }, [blog.id])

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.trim()) return
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/comment`,
        {
          content: newComment,
          timestamp: formatISO(new Date())
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      if (response && response.data) {
        toast.success('Comment Posted')
        setNewComment('')
        fetchComments()
      }
    } catch (e) {
      console.error('Error:', e)

      // Handle specific error scenarios
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        toast.error('Log In First')
      } else if (axios.isAxiosError(e) && e.response?.status === 411) {
        toast.error('Try Again')
      } else if (axios.isAxiosError(e) && e.response?.status === 500) {
        toast.error('Internal Server Error')
      }
    }
  }

  // fetch the save blog condition to render  on the save button

  useEffect(() => {
    // Persistent bookmark status check across page refreshes
    const fetchBookmarkStatus = async () => {
      if (!token) return

      setIsLoading(true)
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/bookmarkstatus/${blog.id}`,

          { headers: { Authorization: token } }
        )

        if (response && response.data) {
          const bookmarkStatus = response.data.isBookmarked
          const savedId = response.data.savedBlogId || null

          setIsBookmarked(!!bookmarkStatus)
          setSavedBlogId(savedId)
        }
      } catch (e: unknown) {
        console.error('Error fetching bookmark status:')
        // Handle specific error scenarios
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setIsBookmarked(false)
        } else if (axios.isAxiosError(e) && e.response?.status === 500) {
          toast.error('Error while fetching blog post / Try Again')
        } else {
          // Default to unbookmarked state on other errors
          setIsBookmarked(false)
          setSavedBlogId(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookmarkStatus()
  }, [blog.id, token])

  // store the blogId here when stored in the database

  if (!localStorage.getItem('token')) {
    navigate('/signin')
    return
  }

  const handleBookmark = async () => {
    if (!token) {
      toast.error('Please sign in')
      return
    }

    // Prevent multiple simultaneous bookmark actions
    if (isLoading) return

    setIsLoading(true)

    try {
      if (!isBookmarked) {
        // Saving blog
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog/saveblog`,
          { postId: blog.id },
          { headers: { Authorization: token } }
        )

        // Ensure response and data exist before setting
        if (response && response.data && response.data.id) {
          setSavedBlogId(response.data.id)
          setIsBookmarked(true)
          toast.success('Blog Saved')
        } else {
          throw new Error('Invalid server response')
        }
      } else {
        // Removing saved blog
        // Use savedBlogId if available, otherwise use blog.id as fallback
        const blogToRemove = blog.id || savedBlogId

        await axios.delete(
          `${BACKEND_URL}/api/v1/blog/removesavedblog/${blogToRemove}`,
          { headers: { Authorization: token } }
        )

        setIsBookmarked(false)
        setSavedBlogId(null)
        toast.success('Blog Removed')
      }
    } catch (e: unknown) {
      console.log('Bookmark error:')

      if (axios.isAxiosError(e) && e.response?.status === 404) {
        toast.error('Blog not found')
      } else if (axios.isAxiosError(e) && e.response?.status === 411) {
        toast.error('No response from server. Check your internet connection.')

        toast.error('Failed to update bookmark')
      }
    } finally {
      setIsLoading(false)
    }
  }
  const handleClick = () => {
    navigate(`/editblog/${blog.id}`, { state: { blog } })
  }
  if (isLoading) {
    return (
      <div className=' bg-black  flex justify-center items-center'>
        <Loading />
      </div>
    )
  }

  return (
    <div className=' bg-black'>
      <Navbar />

      <div className=' pt-16 '>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <main className='lg:col-span-2'>
              {/* Header Section */}
              <header className='mb-8 '>
                <h1 className=' text-gray-300 text-4xl font-bold mb-4 break-words '>
                  {blog.title}
                </h1>
                <div className='flex justify-between items-center space-x-4  text-gray-400 text-sm'>
                  {editButton ? (
                    <div className='flex w-40  '>
                      <button
                        onClick={handleClick}
                        className='relative w-32 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
                      >
                        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                        <span className='inline-flex tracking-widest h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'>
                          Edit
                        </span>
                      </button>
                    </div>
                  ) : (
                    ' '
                  )}
                </div>
              </header>

              {/* Featured Image */}
              <img
                src={blog.url}
                alt={blog.author?.name}
                className='w-full h-[400px] object-cover rounded-lg mb-8'
              />

              {/* Article Content */}
              <article className='text-gray-300 prose lg:prose-xl max-w-none mb-8'>
                <p
                  className='mb-4'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.content)
                  }}
                ></p>
              </article>

              {/* Interaction Buttons */}
              <div className='flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8'>
                <div className='flex items-center space-x-6'>
                  <button
                    onClick={handleLike}
                    disabled={isProcessing}
                    className=' flex items-center space-x-2 group'
                  >
                    <Heart
                      className={`w-6 h-6 text-red-600 ${
                        likeStatus ? 'fill-current text-red-600' : ''
                      }`}
                    />
                    <span className='text-gray-300 font-sans'>{likeCount}</span>
                  </button>

                  <div className='relative'>
                    <button
                      onClick={() => setClick(!click)}
                      className='flex items-center space-x-2 group'
                    >
                      <svg
                        className='h-8 w-8 text-red-500'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='gray'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        {' '}
                        <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
                      </svg>{' '}
                      <span className='text-gray-300'>Comment</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleBookmark}
                  className='flex items-center space-x-2 group'
                >
                  <Bookmark
                    className={`w-6 h-6 ${
                      isBookmarked
                        ? 'fill-blue-500 text-blue-500'
                        : 'text-gray-600'
                    } group-hover:scale-110 transition-transform`}
                  />
                </button>
              </div>

              {/* Comments Section */}
              <section className='mt-12'>
                <h3 className='text-2xl text-gray-300 font-bold mb-6'>
                  Comments
                </h3>

                {click ? (
                  <form onSubmit={handleComment} className='mb-8'>
                    <div className='flex items-start space-x-4'>
                      <img
                        src={userDetails?.profilePicture}
                        alt='Your avatar'
                        className='w-10 h-10 rounded-full'
                      />
                      <div className='flex-1'>
                        <textarea
                          value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                          placeholder='Add a comment...'
                          className='w-full p-3 border text-white bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                          rows={3}
                        />
                        <button
                          type='submit'
                          className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div></div>
                )}

{comments && comments.length > 0 ? (
    <div className='space-y-6 h-auto  overflow-y-scroll'>
        {comments.map(comment => (
            <Comments
                key={comment.id}
                id={comment.id}
                content={comment.content}
                timestamp={comment.timestamp}
                user={comment.user}
            />
        ))}
    </div>
) : (
    <div className="text-center py-8 text-indigo-500 font-mono">
        <p>No comments yet</p>
    </div>
)}
              </section>
            </main>

            {/* Author Sidebar */}
            <AuthorAsidebar authorId={authorId} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}

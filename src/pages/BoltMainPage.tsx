import { LeftBar } from '../components/Bolt-user-profile/LeftBar'
import { BlogList } from '../components/Bolt-user-profile/BlogList'
import { TrendingTopics } from '../components/Bolt-user-profile/TrendingTopic'
import { FeaturedAuthors } from '../components/Bolt-user-profile/FeaturedAuthors'
import Navbar from '../components/Bolt-user-profile/Navbar'

export default function BoltMainPage () {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <Navbar />
        <LeftBar />

        <main className='lg:pl-64 pt-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2'>
                <BlogList />
              </div>
              <div className='space-y-8'>
                <TrendingTopics />
                <FeaturedAuthors />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/RecentMessages'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Feed = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchFeeds = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/api/post/feed', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setFeeds(data.posts)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 px-4">
  <div className="mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">

    {/* LEFT: STORIES + FEED */}
    <div className="w-full">
      <StoriesBar />

      <div className="mt-6 space-y-6">
        {feeds.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>

    {/* RIGHT SIDEBAR */}
    <div className="hidden xl:flex flex-col gap-4 sticky top-6 h-fit">
      <div className="bg-white text-xs p-4 rounded-xl shadow">
        <h3 className="text-slate-800 font-semibold mb-2">Sponsored</h3>
        <img
          src={assets.sponsored_img}
          className="w-full rounded-lg mb-2"
          alt=""
        />
        <p className="text-slate-600 font-medium">Email marketing</p>
        <p className="text-slate-400">
          Supercharge your marketing with a powerful, easy-to-use platform built for results.
        </p>
      </div>

      <RecentMessages />
    </div>

  </div>
</div>

          
  ) : (
    <Loading />
  )
}

export default Feed

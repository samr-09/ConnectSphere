import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModal from './StoryModal'
import StoryViewer from './StoryViewer'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const StoriesBar = () => {
  const { getToken } = useAuth()
  const [stories, setStories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [viewStory, setViewStory] = useState(null)

  const fetchStories = async () => {
    try {
      const token = await getToken()
      const { data } = await api.get('/api/story/get', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setStories(data.stories)
      } else {
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-4">

        {/* CREATE STORY */}
        <div
          onClick={() => setShowModal(true)}
          className="min-w-[120px] h-[160px] rounded-2xl border border-dashed border-indigo-300
                     bg-gradient-to-b from-indigo-50 to-white
                     flex flex-col items-center justify-center
                     hover:shadow-xl transition cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center mb-2">
            <Plus className="text-white w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-700">
            Create Story
          </p>
        </div>

        {/* STORIES */}
        {stories.map((story, index) => (
          <div
            key={index}
            onClick={() => setViewStory(story)}
            className="relative min-w-[120px] h-[160px] rounded-2xl overflow-hidden
                       shadow-lg cursor-pointer group"
          >
            <img
              src={story.user.profile_picture}
              className="absolute top-3 left-3 w-8 h-8 rounded-full ring-2 ring-white z-10"
            />

            <div className="absolute inset-0 bg-black/40 z-10" />

            {story.media_type !== 'text' && (
              story.media_type === 'image' ? (
                <img
                  src={story.media_url}
                  className="h-full w-full object-cover group-hover:scale-110 transition"
                />
              ) : (
                <video
                  src={story.media_url}
                  className="h-full w-full object-cover group-hover:scale-110 transition"
                />
              )
            )}

            <p className="absolute bottom-2 right-2 text-[10px] text-white z-20">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>

      {showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />}
      {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />}
    </div>
  )
}

export default StoriesBar

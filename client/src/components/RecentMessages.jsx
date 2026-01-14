import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuth, useUser } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const RecentMessages = () => {
  const [messages, setMessages] = useState([])
  const { user } = useUser()
  const { getToken } = useAuth()

  const fetchRecentMessages = async () => {
    try {
      const token = await getToken()
      const { data } = await api.get('/api/user/recent-messages', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        const grouped = data.messages.reduce((acc, msg) => {
          acc[msg.from_user_id._id] = msg
          return acc
        }, {})
        setMessages(Object.values(grouped))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRecentMessages()
      setInterval(fetchRecentMessages, 30000)
      return () => clearInterval()
    }
  }, [user])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 text-xs">
      <h3 className="font-semibold mb-3 text-slate-800">
        Recent Messages
      </h3>

      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto no-scrollbar">
        {messages.map((msg, i) => (
          <Link
            key={i}
            to={`/messages/${msg.from_user_id._id}`}
            className="flex gap-2 p-2 rounded-xl hover:bg-slate-100 transition"
          >
            <img
              src={msg.from_user_id.profile_picture}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium text-slate-700">
                  {msg.from_user_id.full_name}
                </p>
                <span className="text-[10px] text-slate-400">
                  {moment(msg.createdAt).fromNow()}
                </span>
              </div>
              <p className="text-slate-500 truncate">
                {msg.text || 'Media'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentMessages

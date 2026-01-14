import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react'
import { useSelector } from 'react-redux'


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.value)
  const { signOut } = useClerk()

  return (
    <div
      className={`
        w-60 xl:w-72
        bg-white dark:bg-slate-900
        border-r border-gray-200 dark:border-slate-700
        flex flex-col justify-between items-center
        max-sm:absolute top-0 bottom-0 z-20
        ${sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'}
        transition-all duration-300 ease-in-out
      `}
    >
      {/* TOP */}
      <div className="w-full">
        <div className="h-16 flex items-center">
          <img
  onClick={() => navigate('/')}
  src={assets.logo}
  alt="ConnectSphere"
  className="
    h-14
    w-auto
    object-contain
    cursor-pointer
    select-none
  "
/>

          
        </div>

        <hr className="border-gray-300 dark:border-slate-700 mb-6" />

        <MenuItems setSidebarOpen={setSidebarOpen} />

        <Link
          to="/create-post"
          className="
            flex items-center justify-center gap-2
            py-2.5 mt-6 mx-6 rounded-lg
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-700 hover:to-purple-800
            active:scale-95 transition
            text-white cursor-pointer
          "
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      {/* BOTTOM USER */}
      <div className="
        w-full border-t border-gray-200 dark:border-slate-700
        p-4 px-7 flex items-center justify-between
      ">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton />
          <div>
            <h1 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {user.full_name}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              @{user.username}
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Sidebar

import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'


const MenuItems = ({ setSidebarOpen }) => {
  return (
    <div className="px-6 space-y-4">

     

      {/* MENU ITEMS */}
      <div className="text-gray-600 dark:text-gray-300 space-y-1 font-medium">
        {
          menuItemsData.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `px-3.5 py-2 flex items-center gap-3 rounded-xl transition
                 ${
                   isActive
                     ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                     : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                 }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))
        }
      </div>

    </div>
  )
}

export default MenuItems

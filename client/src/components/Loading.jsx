import React from 'react'

const Loading = ({ height = '100vh' }) => {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-[3px] border-indigo-500/30 animate-spin" />
        <div className="absolute inset-0 w-14 h-14 rounded-full border-[3px] border-indigo-500 border-t-transparent animate-spin" />
      </div>
    </div>
  )
}

export default Loading

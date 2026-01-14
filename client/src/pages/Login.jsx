import React from 'react'
import { assets } from '../assets/assets'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff]" />

      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-400/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] bg-fuchsia-400/25 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] bg-cyan-400/20 rounded-full blur-[120px]" />

      {/* LEFT : BRANDING */}
      <div className="flex-1 flex flex-col justify-between px-6 py-8 md:px-10 md:py-10 lg:pl-40">

        {/* LOGO */}
        <div className="flex items-center">
          <img
            src={assets.logo}
            alt="ConnectSphere"
            className="h-16 w-auto object-contain select-none"
          />
        </div>

        {/* HERO CONTENT */}
        <div className="max-w-xl mt-12 space-y-6">

          <h1
            className="
              text-[38px] md:text-[60px]
              font-bold
              leading-[1.08]
              tracking-tight
              text-slate-900
            "
          >
            Where conversations
            <br />
            turn into
            <br />
            connections
          </h1>

          <p
            className="
              text-[15.5px] md:text-[17px]
              leading-relaxed
              text-slate-600
              max-w-[420px]
            "
          >
            ConnectSphere is a modern social space to share ideas,
            build real relationships, and stay close to what matters.
          </p>

          {/* COMMUNITY SIGNAL */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              <img
                src={assets.sample_profile}
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
              <img
                src={assets.group_users}
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
              <img
                src={assets.sample_cover}
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
            </div>
            <span className="text-sm text-slate-500">
              Trusted by growing communities worldwide
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-10 text-xs text-slate-400">
          © {new Date().getFullYear()} ConnectSphere · All rights reserved
        </div>
      </div>

      {/* RIGHT : AUTH */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <SignIn />
      </div>
    </div>
  )
}

export default Login


// import React from 'react'
// import { assets } from '../assets/assets'
// import { SignIn } from '@clerk/clerk-react'

// const Login = () => {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">

//       {/* ===== PREMIUM SAAS BACKGROUND ===== */}
//       <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]" />

//       {/* soft color wash */}
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.16),transparent_55%)]" />

//       {/* ambient blobs */}
//       <div className="absolute -top-48 -left-48 w-[620px] h-[620px] bg-indigo-500/25 rounded-full blur-[160px]" />
//       <div className="absolute top-1/4 -right-40 w-[520px] h-[520px] bg-fuchsia-500/20 rounded-full blur-[160px]" />
//       <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-cyan-400/15 rounded-full blur-[160px]" />

//       {/* ===== LEFT : BRANDING ===== */}
//       <div className="flex-1 flex flex-col justify-between px-6 py-8 md:px-10 md:py-12 lg:pl-40">

//         {/* LOGO */}
//         <div className="flex items-center">
//           <img
//             src={assets.logo}
//             alt="ConnectSphere"
//             className="h-20 w-auto object-contain select-none"
//           />
//         </div>

//         {/* HERO CONTENT */}
//         <div className="max-w-xl mt-16 space-y-8">

//           <h1
//             className="
//               text-[40px] md:text-[64px]
//               font-semibold
//               leading-[1.06]
//               tracking-tight
//               text-white
//             "
//           >
//             Where conversations
//             <br />
//             turn into
//             <br />
//             <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
//               real connections
//             </span>
//           </h1>

//           <p
//             className="
//               text-[16px] md:text-[18px]
//               leading-relaxed
//               text-slate-300
//               max-w-[460px]
//             "
//           >
//             ConnectSphere is a modern social platform designed to help
//             people share ideas, build meaningful relationships, and stay
//             close to what truly matters.
//           </p>

//           {/* COMMUNITY SIGNAL */}
//           <div className="flex items-center gap-4 pt-6">
//             <div className="flex -space-x-3">
//               <img
//                 src={assets.sample_profile}
//                 className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-md"
//               />
//               <img
//                 src={assets.group_users}
//                 className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-md"
//               />
//               <img
//                 src={assets.sample_cover}
//                 className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-md"
//               />
//             </div>
//             <span className="text-sm text-slate-400">
//               Trusted by growing communities worldwide
//             </span>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="pt-12 text-xs text-slate-500">
//           © {new Date().getFullYear()} ConnectSphere · All rights reserved
//         </div>
//       </div>

//       {/* ===== RIGHT : AUTH ===== */}
//       <div className="flex-1 flex items-center justify-center px-6 py-10">
//         <div className="relative z-10">
//           <SignIn />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

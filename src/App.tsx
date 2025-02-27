// import { useState } from 'react'
import Post from './components/Post'
import ImgHeader from '../public/images/bg-header-desktop.svg'
import ImgHeaderOne from '../public/images/bg-header-mobile.svg'
import './App.css'


function App() {

  return (
    <div className='app w-full bg-emerald-50 pb-10'>
      <img className='hidden sm:block bg-teal-900 w-full h-full relative' src={ImgHeader} alt="" />
      <img className='block sm:hidden bg-teal-900 w-full relative' src={ImgHeaderOne} alt="" />
      <Post />
 
    </div>
  )
}

export default App

import React, { useState } from 'react'
import Header from '../component/header'

interface Video {
  id: string;
  title: string;
}

const MainView: React.FC = () => {
  const [videoList, setVideoList] = useState<Video[]>([])

  const videoListHandler = (vl: Video[]) => {
    setVideoList(vl)
    console.log(videoList)
  }

  return (
    <>
      <Header getVl={videoListHandler}></Header>
      <h1>Main View</h1>
    </>
  )
}

export default MainView
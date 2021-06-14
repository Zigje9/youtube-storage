import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../component/header'
import CheckBox from '../component/common/checkBox'
interface Video {
  id: string;
  title: string;
}

const YoutubeVideo = styled.iframe`
  width: 360;
  height: 270;
`

const MainView: React.FC = () => {
  const [videoList, setVideoList] = useState<Video[]>([])

  const videoListHandler = (vl: Video[]) => {
    setVideoList(vl)
  }

  return (
    <>
      <Header getVl={videoListHandler}></Header>
      {videoList.length > 0 && videoList.map((video, idx) => {
        const videoLink = `https://www.youtube.com/embed/${video.id}?rel=0&enablejsapi=1`
        return (
        <>
          <YoutubeVideo
            key={video.id}
            src={videoLink}
          />
          <CheckBox key={idx}></CheckBox>
        </>
        )
      })}
    </>
  )
}

export default MainView
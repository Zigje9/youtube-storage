import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../component/header'
import CheckBox from '../component/common/checkBox'
import CheckSpan from '../component/common/checkSpan'
import color from '../assets/colors'
interface Video {
  id: string;
  title: string;
}

const YoutubeVideo = styled.iframe`
  width: 100%;
`

const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid ${color.blue.lv4};
  border-radius: 10px;
  background-color: ${color.blue.lv4};
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2vw;
`

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 1vh;
`

const MainView: React.FC = () => {
  const [videoList, setVideoList] = useState<Video[]>([])
  const [selectList, setSelectList] = useState(new Set())

  const videoListHandler = (vl: Video[]) => {
    setVideoList(vl)
  }

  return (
    <>
      <Header getVl={videoListHandler}></Header>
      <GridContainer>
      {videoList.length > 0 && videoList.map((video) => {
        const videoLink = `https://www.youtube.com/embed/${video.id}?rel=0&enablejsapi=1`
        return (
        <VideoBox key={video.id}>
          <YoutubeVideo
            src={videoLink}
          />
          <CheckBoxContainer>
            <CheckSpan></CheckSpan>
            <CheckBox></CheckBox>
          </CheckBoxContainer>
        </VideoBox>
        )
      })}
      </GridContainer>
    </>
  )
}

export default MainView
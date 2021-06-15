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
  background-color: ${color.white.lv1};
  padding: 10px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2vw;
  background-color: ${color.gray.lv1};
  padding: 10px;
`

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const CartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 1vh;
`

const Title = styled.div`
  width: 200px;
  padding: 20px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const MainView: React.FC = () => {
  const [videoList, setVideoList] = useState<Video[]>([])
  const [selectList, setSelectList] = useState(new Set())

  const videoListHandler = (vl: Video[]) => {
    setVideoList(vl)
  }

  const selectListHandler = (videoId: string, isChecked: boolean) => {
    if (isChecked) {
      selectList.add(videoId)
    }
    else if (!isChecked && selectList.has(videoId)){
      selectList.delete(videoId)
    }
    setSelectList(selectList)
    console.log(selectList)
  }

  return (
    <>
      <Header getVl={videoListHandler}></Header>
      <GridContainer>
      {videoList && videoList.map((video) => {
        const videoLink = `https://www.youtube.com/embed/${video.id}?rel=0&enablejsapi=1`
        return (
        <VideoBox key={video.id}>
          <YoutubeVideo
            src={videoLink}
          />
          <CheckBoxContainer>
            <Title>
              {video.title}
            </Title>
            <CartContainer>
              <CheckSpan></CheckSpan>
              <CheckBox selectFunction={selectListHandler} vid={video.id}></CheckBox>
            </CartContainer>
           
          </CheckBoxContainer>
        </VideoBox>
        )
      })}
      </GridContainer>
    </>
  )
}

export default MainView
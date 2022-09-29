import React from 'react'

import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: #EC5800;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;

`

const AnnouncementBar = () => {
  return (
    <Container>
        FREE SHIPPING WHEN YOU SPEND $1,000 OR MORE
    </Container>
  )
}

export default AnnouncementBar
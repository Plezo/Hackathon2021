import React, { useState } from 'react'
import Video from '../../videos/bgvid.mp4'
import { HomeContainer, HomeBg, VideoBg, HomeContent, HomeH1, HomeP, HomeBtnWrapper, ArrowForward, ArrowRight } from './HomeElements'
import { Button } from '../ButtonElements'

const HomeSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HomeContainer>
            <HomeBg>
                <VideoBg autoPlay loop muted src={ Video } type='video/mp4' />
            </HomeBg>
            <HomeContent>
                <HomeH1>Portfolio Management Made Easy</HomeH1>
                <HomeP>
                    Sign up for free sex
                </HomeP>
                <HomeBtnWrapper>
                    <Button to="signup" onMouseEnter={ onHover } onMouseLeave={ onHover } primary='true' dark='true'>
                        Signup { hover ? <ArrowForward /> : <ArrowRight /> }
                    </Button>
                </HomeBtnWrapper>
            </HomeContent>
        </HomeContainer>
    )
}

export default HomeSection;
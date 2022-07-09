// -- basic library --
import RoundedButton from 'components/atoms/RoundedButton';
import React from 'react';
import styled from 'styled-components';

// -- external components --
import {  eventsPostAPI } from 'api/events';

// -- external datas --
// import SampleMovie from 'assets/sample-movie.mp4'


// -- main component --
const Tests: React.FC = () => {

    const postAPI = async() => {
        const res = await eventsPostAPI({})
        console.log(res)
    }

  // -- onload function --
  // useEffect(() => {
  //   (async function () {     
  //   })();
  // }, []); /* eslint-disable-line */

  // -- render part --
  return (
    <Wrap>
        <RoundedButton text="sample" onClick={postAPI}/>
    </Wrap>
  );
};

// -- styled components --
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

// -- finally export part --

export default Tests;

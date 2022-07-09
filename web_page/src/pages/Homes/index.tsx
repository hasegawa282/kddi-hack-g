// -- basic library --
import React from 'react';
import styled from 'styled-components';

// -- external components --
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // pluginは、あとから
// import { Event, eventsPostAPI } from 'api/events';
import PostButton from '../../components/molecules/PostButton';
import DialogComponent from 'components/organisms/DialogComponents';
import { NavLink } from 'react-router-dom';

// -- external datas --
// import SampleMovie from 'assets/sample-movie.mp4'


// -- main component --
const Homes: React.FC = () => {
  // const [name, setName] = React.useState('');

  /** イベント一覧を取得して、setする**/
  // const loadEvents = async(e: React.MouseEvent<HTMLButtonElement>)=>{
  //   e.preventDefault();
  //   let new_events: Event[] = []
  //   const res = await eventsPostAPI({
  //     friends: ['はせ', 'てつまる'],
  //     events: ['海水浴', 'テーマパーク'],
  //     vacation_start: new Date()

  //   })
  //   if(res){
  //     new_events = res
  //   }
  //   console.log(new_events)
  //   setEvents(new_events)
    
  // };

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };


  // -- onload function --
  // useEffect(() => {
  //   (async function () {     
  //   })();
  // }, []); /* eslint-disable-line */

  // -- render part --
  return (
    <Wrap>
      <NavLink to="/tests">Tests</NavLink>
        {/* <RoundedButton text="sample" onClick={getDataFromApi}/> */}
        <div>
          {isDialogOpen}
        </div>
        <PostButton onClick={handleClickOpen}/>
        <DialogComponent onClose={handleClose} isOpen={isDialogOpen}/>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" locale="ja"/>
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

export default Homes;

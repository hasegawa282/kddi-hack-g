// -- basic library --
import React from 'react';
import styled from 'styled-components';

// -- external components --
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // pluginは、あとから
// import timeGridPlugin from "@fullcalendar/timegrid"; // pluginは、あとから
import { Event } from 'api/events';
import PostButton from '../../components/molecules/PostButton';
import DialogComponent from 'components/organisms/DialogComponents';


// -- external datas --
//import SampleMovie from 'assets/sample-movie.mp4'
import backsea from 'assets/backsea.jpg'
import { Paper } from '@mui/material';


// -- main component --
const Homes: React.FC = () => {
  // const [name, setName] = React.useState('');
  const [events, setEvents] = React.useState<Event[] | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = (events?: Event[]) => {
    setIsDialogOpen(false);
    if(events !== undefined){
      setEvents(events)
    }
  };

  // -- render part --
  return (
      <Wrap>
          <PostButton style={{marginBottom: '5px', marginTop: '15px'}} onClick={handleClickOpen}/>
          {/* <PostButton  onClick={loadEvents}/> */}
          <DialogComponent onClose={handleClose} isOpen={isDialogOpen}/>
          {events !== undefined && <CalendarWrap>
            <Paper style={{padding: '15px'}} elevation={5}>
              <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" locale="ja" events={events}/>
            </Paper>
          </CalendarWrap>}
      </Wrap>
  );
};

// -- styled components --
const Wrap = styled.div`
    background-image: url(${backsea});
    background-size: cover;
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
`
const CalendarWrap = styled.div`
    padding: 1em;
    width: 50%;
    height: 50%;
`

// -- finally export part --

export default Homes;

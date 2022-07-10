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
import ProgressBar from 'components/atoms/ProgressBar';


// -- external datas --
//import SampleMovie from 'assets/sample-movie.mp4'
import backsea from 'assets/backsea.jpg'
import { Button, Paper } from '@mui/material';

//mui
import AddIcon from '@mui/icons-material/Add';


// -- main component --
const Homes: React.FC = () => {
  // const [name, setName] = React.useState('');
  const [events, setEvents] = React.useState<Event[] | undefined>(undefined);
  const [homeworks, setHomeworks] = React.useState<number | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = (events?: Event[], homeworks?: number) => {
    setIsDialogOpen(false);
    if(events !== undefined){
      setEvents(events)
    }
    if(homeworks !== undefined){
      setHomeworks(homeworks)
    }
  };

  const [progress, setProgress] = React.useState(0);

  const increaseProgress = () => {
    setProgress(evt => Math.min(evt+1, homeworks || 0))
  }

  // -- onload function --
  // useEffect(() => {
  //   (async function () {     
  //   })();
  // }, []); /* eslint-disable-line */

  // -- render part --
  return (
      <Wrap>
          <PostButton style={{marginBottom: '5px', marginTop: '15px'}} onClick={handleClickOpen}/>
          {isDialogOpen && <DialogComponent onClose={handleClose} isOpen={isDialogOpen}/>}
          {events !== undefined && <CalendarWrap>
            <div style={{display:'flex', justifyContent: 'center', width: '100%'}}>
              <ProgressBar progress={progress} max={homeworks || 0}/>
              <Button startIcon={<AddIcon />} variant="text" onClick={increaseProgress}></Button>
            </div>
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

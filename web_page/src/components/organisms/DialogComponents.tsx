import React from 'react'
import styled from 'styled-components';

//MUI
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FriendsInput from 'components/atoms/FriendsInput';
import EventsInput from 'components/atoms/EventsInput';
import { Event, eventsPostAPI, RequestEventsGetProps } from 'api/events';
import PresetButton from 'components/atoms/PresetButton';


export interface DialogProps {
    isOpen: boolean;
    onClose: (items?: Event[], homeworks?: number) => void;
}

const DialogComponent = (props: DialogProps) => {

    const [friends, setFriends] = React.useState<string[]>([]);
    const [events, setEvents] = React.useState<string[]>([]);
    const [vacation_start, setVacationStart] = React.useState<string>('2022-07-10')
    const [vacation_end, setVacationEnd] = React.useState<string>('2022-07-30')
    

    const onClose = () => {
        props.onClose();
    }

    const onPlanClick = (detail: RequestEventsGetProps) => {
        console.log(detail)
        if(detail.events){
            setEvents(detail.events)
        }
        if(detail.friends){
            setFriends(detail.friends)
        }
    }

    const onFinish = async() => {
        let request_params: RequestEventsGetProps = {
            vacation_start: vacation_start,
            vacation_end: vacation_end
        }
        if(events.length > 0){
            request_params.events = events
        }
        if(friends.length > 0){
            request_params.friends = friends
        }
        console.log(request_params)
        const res = await eventsPostAPI(request_params)
        console.log(res)
        if(res){
            props.onClose(res.items, res.homeworks)
        }
    }


    return (
        <div>
        <DialogWrap>
            <Dialog onClose={onClose} open={props.isOpen}>
            <DialogTitle>詳細設定</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem style={{justifyContent: 'center'}}>
                    <PresetButton onPlanClick={onPlanClick}/>
                </ListItem>
                <ListItem>
                    <Stack>
                        <TextWrap>
                            <TextField
                                id = 'start_date'
                                label = '開始日'
                                type = 'date'
                                sx = {{ width: 220 }}
                                InputLabelProps = {{
                                    shrink: true
                                }}
                                value={vacation_start}
                                onChange={(e) => setVacationStart(e.currentTarget.value)}
                            />
                            <p> ~ </p>
                            <TextField
                                id = 'end_date'
                                label = '終了日'
                                type = 'date'
                                sx = {{ width: 220 }}
                                InputLabelProps = {{
                                    shrink: true
                                }}
                                value={vacation_end}
                                onChange={(e) => setVacationEnd(e.currentTarget.value)}
                            />
                        </TextWrap>
                    </Stack>
                </ListItem>
                <FriendsInput friends={friends} setFriends={setFriends}/>
                <EventsInput events={events} setEvents={setEvents}/>
                <ListItem>
                <div style={{ flexGrow: 1 }}></div>
                        <Button variant="outlined" onClick={onFinish}>決定</Button>
                </ListItem>
                
            </List>
        </Dialog>
        </DialogWrap>
        </div>
    )
}

export default DialogComponent

// -- styled components --

const DialogWrap = styled.div`
    padding: 10px;
`

const TextWrap = styled.div`
    display: flex;
`

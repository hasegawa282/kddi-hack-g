import React from 'react'
import { Button, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Props {
  events: string[];
  setEvents: (friends: string[]) => void;
}

const EventsInput = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const addFriends = () => {
    let new_friends = [...props.events, '']
    props.setEvents(new_friends)
  }

  const removeFriends = (index: number) => {
    let new_friends = [...props.events.slice(0, index), ...props.events.slice(index + 1)]
    props.setEvents(new_friends)
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    let new_friends = [...props.events]
    new_friends[index] = e.currentTarget.value
    props.setEvents(new_friends)
  }

  return (
    <>
      <ListItemButton onClick={() => (setOpen(!open))}>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="イベントの追加" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <div style={{ padding: '10px' }}>
            <Button startIcon={<AddIcon />} onClick={addFriends}>追加</Button>
            <form onSubmit={() => { }}>
              {props.events.map((friend, index) => {
                return (
                  <div key={index}>
                    <TextField id="outlined-basic" label="イベント名を入力" variant="outlined" value={friend} onChange={(e) => onChange(e, index)} />
                    <Button startIcon={<DeleteIcon />} onClick={() => removeFriends(index)}>削除</Button>
                  </div>
                )
              })}
            </form>
          </div>
        </List>
      </Collapse>
    </>
  )
}

export default EventsInput
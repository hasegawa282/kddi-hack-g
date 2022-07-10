import React from 'react'
import { Button, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Props {
  friends: string[];
  setFriends: (friends: string[]) => void;
}

const FriendInput = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const addFriends = () => {
    let new_friends = [...props.friends, '']
    props.setFriends(new_friends)
  }

  const removeFriends = (index: number) => {
    let new_friends = [...props.friends.slice(0, index), ...props.friends.slice(index + 1)]
    props.setFriends(new_friends)
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    let new_friends = [...props.friends]
    new_friends[index] = e.currentTarget.value
    props.setFriends(new_friends)
  }

  return (
    <>
      <ListItemButton onClick={() => (setOpen(!open))}>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="友達の追加" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <div style={{ padding: '10px' }}>
            <Button startIcon={<AddIcon />} onClick={addFriends}>追加</Button>
            <form onSubmit={() => { }}>
              {props.friends.map((friend, index) => {
                return (
                  <div key={index}>
                    <TextField id="outlined-basic" label="友達の名前を入力" variant="outlined" value={friend} onChange={(e) => onChange(e, index)} />
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

export default FriendInput
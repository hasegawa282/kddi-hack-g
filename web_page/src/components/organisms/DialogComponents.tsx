import React, { useState } from 'react'
import styled from 'styled-components';

//MUI
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const DialogComponent = (props: DialogProps) => {

    const handleClose = () => {
        props.onClose();
    }

    return (
        <Dialog onClose={handleClose} open={props.isOpen}>
            <DialogTitle>設定</DialogTitle>
            <List sx={{ pt: 0 }}>
            <Stack>
            <TextWrap>
                <TextField
                    id = 'start_date'
                    label = '開始日'
                    type = 'date'
                    defaultValue = '2022-07-10'
                    sx = {{ width: 220 }}
                    InputLabelProps = {{
                        shrink: true
                    }}
                />
                <TextField
                    id = 'start_date'
                    label = '開始日'
                    type = 'date'
                    defaultValue = '2022-07-10'
                    sx = {{ width: 220 }}
                    InputLabelProps = {{
                        shrink: true
                    }}
                />
            </TextWrap>

        
    </Stack>
            </List>
        </Dialog>
    )
}

export default DialogComponent

// -- styled components --
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TextWrap = styled.div`
    display: flex;
`
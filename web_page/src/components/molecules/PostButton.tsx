import React from 'react'
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export interface ButtonProps {
  onClick: any;
  style?: React.CSSProperties;
}

export default function PostButton(props: ButtonProps){
  return (
    <Button style={{width: '180px', ...props.style}} type="submit" variant="contained" startIcon={<CalendarMonthIcon/>} onClick={props.onClick}>カレンダー作成</Button>
  );
}
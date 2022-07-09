import React from 'react'
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export interface ButtonProps {
  onClick: any;
}

export default function PostButton(props: ButtonProps){
  return (
      <Button type="submit" variant="contained" startIcon={<CalendarMonthIcon/>} onClick={props.onClick}>カレンダー作成</Button>
  );
}
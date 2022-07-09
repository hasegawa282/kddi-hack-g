import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'

type FromPropsType = {
  setEvent: React.Dispatch<React.SetStateAction<string>>;
  getEvent: (e:any) => void;
}

const EventInput = () => {
  const { control } = useForm()
  const { fields, append, remove } = useFieldArray( {control, name: 'event'} )
  return (
    <>
      <div>
        イベントの追加
        <Button onClick={() => append( { eventname: '' } )}>追加</Button>
      </div>
      <form onSubmit={()=>{}}>
        {fields.map((field,index)=>{
            return (
              <div key={field.id}>
                <Controller
                  name={`event.${index}.eventname`}
                  control={control}
                  render={({ field }) => (
                      <TextField label = 'イベント名の入力' sx = {{ width: 220 ,height: 70}} {...field}/>
                  )}
                />
                <Button onClick={() => remove(index)}>削除</Button>
              </div>  
            )
        })}
      </form>
    </>
  )
}

export default EventInput
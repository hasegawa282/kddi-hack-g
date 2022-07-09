import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'


type FromPropsType = {
    setPeriod: React.Dispatch<React.SetStateAction<string>>;
    getPeriod: (e:any) => void;
}

const PeriodInput = () => {
  return (
      <>
        <form>
          <input type="datetime-local" onChange={() => {}}></input> 
          <input type="datetime-local" onChange={() => {}}></input> 
        </form>
      </>
// =======
//       <Stack>
//           <TextField
//             id = 'start_date'
//             label = '開始日'
//             type = 'date'
//             defaultValue = '2022-07-10'
//             sx = {{ width: 220 }}
//             InputLabelProps = {{
//                 shrink: true
//             }}
//           />
//           <TextField
//             id = 'start_date'
//             label = '開始日'
//             type = 'date'
//             defaultValue = '2022-07-10'
//             sx = {{ width: 220 }}
//             InputLabelProps = {{
//                 shrink: true
//             }}
//           />
//       </Stack>

// >>>>>>> b5be19aebaa234fbc3c51b7f78fcae72fb7bb081
  )
}

export default PeriodInput
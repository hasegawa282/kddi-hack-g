import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export interface MaxProps {
    max: number;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number } & MaxProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{ width: '50%', mr: 1 }}>
                    <LinearProgress color='secondary' style={{border: '2px solid black', borderRadius: '15px',height: '20px'}} variant="buffer" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`宿題${Math.round(props.max *(props.value)/100)}/${props.max}`}
                </Typography>
            </Box>
        </Box>
    );
}

export interface ProgressProps {
    progress: number; 
    max: number;
}

export default function ProgressBar(props: ProgressProps) {
    const normalise = (value: number) => ((value) * 100) / (props.max);

    return (
    <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={normalise(props.progress)} valueBuffer={props.max} max={props.max}/>
    </Box>
    );
}
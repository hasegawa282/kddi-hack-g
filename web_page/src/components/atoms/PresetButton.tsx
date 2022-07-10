import { Button } from '@mui/material'
import { RequestEventsGetProps } from 'api/events';
import { new_presets } from 'utils/preset';

interface Props {
  onPlanClick: (detail: RequestEventsGetProps) => void
}

const PresetButton = (props: Props) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Button onClick={() => props.onPlanClick(new_presets.a_preset)} style={{marginRight: '5px'}}>Aプラン：アウトドアコース</Button>
      <Button onClick={() => props.onPlanClick(new_presets.b_preset)} style={{marginLeft: '5px'}}>Bプラン：スポーツコース</Button>
    </div>
  )
}

export default PresetButton
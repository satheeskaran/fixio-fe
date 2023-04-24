import {Typography, Grid} from '@mui/material';
import MuButton from '../common/MuButton';
import DamageCard from '../common/DamageCard';
import { useSelector } from 'react-redux';

export default function Home() {
  
  const reports = useSelector(state => state.reports);

  return (
    <>
      <Grid item sm={12} md={10} sx={{paddingBottom: 2}}  display={'flex'} 
        justifyContent={'space-between'} alignItems={'center'}>
        <Typography className="typography-bold" variant="h4">
          Damage Reports
        </Typography>
        <MuButton variant="contained" title="New Report" type="link" href="/report/new-report"/>
      </Grid>
      <Grid item sm={12} md={10} columns={{ sm: 12, md: 10 }} 
        display={'flex'} flexWrap={'wrap'} 
      >
        {reports.length == 0 && <Typography className="typography-bold" variant="p">
          No damage reports.
        </Typography>}
        {reports.map(e => {
          return(
            <DamageCard key={e.uuid} info={e}/>
          )
        })}
      </Grid>
    </> 
  )
}
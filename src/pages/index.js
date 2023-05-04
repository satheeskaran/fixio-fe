import {Typography, Grid} from '@mui/material';
import { useSelector } from 'react-redux';
import DamageCard from '../components/common/DamageCard';
import MuButton from '../components/common/MuButton';

export default function Home() {
  
  //get damage reports from redux store
  const reports = useSelector(state => state.reports);

  return (
    <>
      <Grid item sm={12} md={10} sx={{paddingBottom: 2}}  display={'flex'} 
        justifyContent={'space-between'} alignItems={'center'}>
        <Typography className="typography-bold" variant="h4">
          Damage Reports
        </Typography>
        <MuButton variant="contained" title="New Report" type="link" href="/new-report"/>
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
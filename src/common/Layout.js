import {Typography, Grid} from '@mui/material';
import MuButton from '../common/MuButton';
import { red } from '@mui/material/colors';
import DamageCard from '../common/DamageCard';

export default function Layout({children}) {
  return (
    <>
      <Grid container sx={{px:4, py:4}} display={'flex'} justifyContent={'center'}>
        {children}
      </Grid>
    </>
  )
}
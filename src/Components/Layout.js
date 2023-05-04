import {Grid} from '@mui/material';

export default function Layout({children}) {
  return (
    <>
      <Grid container sx={{px:4, py:4}} display={'flex'} justifyContent={'center'}>
        {children}
      </Grid>
    </>
  )
}
import * as React from 'react';
import { TextField, Grid} from '@mui/material';

const StepThree = ({register}) => {
  
  return(
    <Grid sx={{mt:3}} display={'flex'} flexWrap={'wrap'}>
      <Grid item sm={12} md={6} sx={{p:1}}>  
        <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          required
          id="customerName"
          label="Customer Name"
          {...register("customerName")}
        />
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1}}>  
        <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          required
          id="mobileNumber"
          label="Mobile Number"
          {...register("mobileNumber")}
        />
      </Grid>
      <Grid item sm={12} md={12} sx={{p:1}}>   
       <TextField
          multiline
          rows={4}
          sx={{width:'100%'}}
          required
          id="address"
          label="Address"
          {...register("address")}
        />
      </Grid>
    </Grid>
  )
}

export default StepThree;
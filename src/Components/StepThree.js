import * as React from 'react';
import { TextField, Grid} from '@mui/material';
import { useFormContext } from 'react-hook-form';

const StepThree = () => {
  const { formState, register} = useFormContext();

  return(
    <Grid sx={{mt:3}} display={'flex'} flexWrap={'wrap'}>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}}>  
        <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          id="customerName"
          label="Customer Name"
          {...register("customerName", { required: true })}
        />
        {formState.errors.customerName && 
        <div className="input-error">
          Please enter the customer name
        </div>}
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}}>  
        <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          id="mobileNumber"
          label="Mobile Number"
          {...register("mobileNumber", { required: true })}
        />
        {formState.errors.mobileNumber && 
        <div className="input-error">
          Please enter the mobile number
        </div>}
      </Grid>
      <Grid item sm={12} md={12} sx={{p:1, width: '100%'}}>   
       <TextField
          multiline
          rows={4}
          sx={{width:'100%'}}
          id="address"
          label="Address"
          {...register("address", { required: true })}
        />
        {formState.errors.address && 
        <div className="input-error">
          Please enter the address
        </div>}
      </Grid>
    </Grid>
  )
}

export default StepThree;
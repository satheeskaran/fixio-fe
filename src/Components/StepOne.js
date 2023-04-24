import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const StepOne = ({register, setValue, getValues, vehicles}) => {
  
  const [models, setModels] = useState([]);
  const [modelId, setModelId] = useState();
  const values = getValues();

  useEffect(() => {
    if(values.vehicleId){
      setModels(vehicles.filter(e => e.id == values.vehicleId)[0].models);
    }
  }, [])

  const handleOnChangeVehicle = (e) => {
    const id = Number(e.target.value);
    setModels(vehicles.filter(e => e.id == id)[0].models);
    setValue('vehicleModel', '', true)
    setValue('vehicleId', id, true)
  }

  const handleOnChangeVehicleModel = (e) => {
    const id = Number(e.target.value);
    setValue('vehicleModel', id, true);
    setModelId(id);
  }

  return(
    <Grid sx={{mt:3}} display={'flex'} flexWrap={'wrap'}>
      <Grid item sm={12} md={6} sx={{p:1}}>  
        <FormControl fullWidth>
          <InputLabel id="vehicle-name-label">Vehicle Name *</InputLabel> 
          <Select
            autoComplete='off'
            required
            labelId="vehicle-name-label"
            id="vehicleId"
            label="Vehicle Name"
            value={values.vehicleId}
            {...register("vehicleId")}
            onChange={(e) => handleOnChangeVehicle(e)}
          >
            {vehicles.map(element => {
              return <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1}}>  
        <FormControl fullWidth>
          <InputLabel id="vehicle-model-label">Vehicle Model *</InputLabel> 
          <Select
            autoComplete="off"
            required
            labelId="vehicle-model-label"
            id="vehicleModel"
            label="Vehicle Model"
            {...register("vehicleModel")}
            onChange={(e) => handleOnChangeVehicleModel(e)}
            value={values.vehicleModel ? values.vehicleModel : modelId}
          >
            {models.map(element => {
              return <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1}}>   
       <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          required
          id="color"
          label="Color"
          {...register("color")}
        />
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1}}>   
       <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          required
          id="vehicleNumber"
          label="Vehicle Number"
          {...register("vehicleNumber")}
        />
      </Grid>
    </Grid>
  )
}

export default StepOne;
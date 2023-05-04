import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const StepOne = ({vehicles}) => {
  const { formState, register, setValue, getValues, clearErrors } = useFormContext();
  const [models, setModels] = useState([]);
  const [modelId, setModelId] = useState('');

  //get form values
  const values = getValues();

  useEffect(() => {
    //set vehicle models
    if(values.vehicleId){
      setModels(vehicles.filter(e => e.id == values.vehicleId)[0].models);
    }
  }, [])

  const handleOnChangeVehicle = (e) => {
    //set vehicle models
    const id = Number(e.target.value);
    setModels(vehicles.filter(e => e.id == id)[0].models);

    //set vehicleModel value
    setValue('vehicleModel', '', true)

    //set vehicleId value
    setValue('vehicleId', id, true)

    //clear vehicle id error
    clearErrors("vehicleId")
  }

  const handleOnChangeVehicleModel = (e) => {
    const id = Number(e.target.value);
    if(id){
      setModelId(id);
      setValue('vehicleModel', id, true);

      //clear vehicle model error
      clearErrors("vehicleModel")
    } else {
      setModelId('');
    } 
  }
  
  return(
    <Grid sx={{mt:3}} display={'flex'} flexWrap={'wrap'}>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}} >  
        <FormControl fullWidth>
          <InputLabel id="vehicle-name-label">Vehicle Name *</InputLabel> 
          <Select
            autoComplete='off'
            labelId="vehicle-name-label"
            id="vehicleId"
            label="Vehicle Name"
            value={values.vehicleId}
            defaultValue={''}
            {...register("vehicleId", { required: true })}
            onChange={(e) => handleOnChangeVehicle(e)}
          >
            {vehicles.map(element => {
              return <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        {formState.errors.vehicleId && 
        <div className="input-error">
          Please select the vehicle
        </div>}
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}}>  
        <FormControl fullWidth>
          <InputLabel id="vehicle-model-label">Vehicle Model *</InputLabel> 
          <Select
            autoComplete="off"
            labelId="vehicle-model-label"
            id="vehicleModel"
            label="Vehicle Model"
            defaultValue={''}
            {...register("vehicleModel", { required: true })}
            onChange={(e) => handleOnChangeVehicleModel(e)}
            value={values.vehicleModel ? values.vehicleModel : modelId}
          >
            {models.map(element => {
              return <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        {formState.errors.vehicleModel && 
        <div className="input-error">
          Please select the vehicle model
        </div>}
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}}>   
       <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          id="color"
          label="Color"
          {...register("color", { required: true })}
        />
        {formState.errors.color && 
        <div className="input-error">
          Please enter the vehicle color
        </div>}
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}}>   
       <TextField
          autoComplete="off"
          sx={{width:'100%'}}
          id="vehicleNumber"
          label="Vehicle Number"
          {...register("vehicleNumber", { required: true })}
        />
        {formState.errors.vehicleNumber && 
        <div className="input-error">
          Please enter the vehicle number
        </div>}
      </Grid>
    </Grid>
  )
}

export default StepOne;
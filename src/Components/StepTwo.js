import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';


const StepTwo = () => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const { formState, register, setValue, getValues, setError, clearErrors } = useFormContext();

  //get form values
  const values = getValues();

  useEffect(() => {
    if(!image && values.imageUrl){
      setImage(values.imageUrl);
      setValue('imageId', values.imageId, true);
      setValue('imageUrl', values.imageUrl, true);
      setValue('imageName', values.imageName, true);
      //clear image error
      clearErrors("imageId")
    }
  }, [])

  const handleOnChangeImage = async (e) => {
    setLoading(true);

    //clear image error
    clearErrors("imageName")
    try{
      if(e.target.files){
        const file = e.target.files[0];
        if (!file) {
          setError("imageName", { required: true });
          return false;
        }
       
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          setError("imageName", { invalidType: true });
          return false;
        }

        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post("/api/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json'
        }
        });
        if(res.status == 201){
          setValue('imageId', res.data.uuid, true);
          setValue('imageUrl', res.data.url, true);
          setImage(res.data.url);
        }
        setImage(URL.createObjectURL(file))
      } else {
        setError("imageName", { required: true });
      }
    } catch(error){
      console.log(error.response?.data);
    }
    setLoading(false);
  }
  
  return(
    <Grid sx={{mt:3}} display={'flex'} flexWrap={'wrap'}>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}}>  
        <label>
          <input 
            style={{display: 'none'}}
            type="file" 
            {...register("imageName", { required: true })} 
            id="imageName"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => handleOnChangeImage(e)}
          />
          <Box
            className="cursor-pointer"
            sx={{
              width: '100%',
              height: 308,
              borderRadius: '4px',
              border: '1px solid #1565c0;',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position:'relative'
            }}
          >
            {image ?
              <Image
                src={image}
                alt="Damage picture of fixico"
                layout='fill'
                objectFit='contain'
              />: 
              <Typography className="typography-bold">
                {loading ? 'Uploading' : 'Upload Image'}
              </Typography>
            }
          </Box>
          {formState.errors.imageName && 
          <div className="input-error">
            Please upload damage image
          </div>}
        </label>
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1, width: '100%'}}>  
        <TextField
          className='description-textarea'
          multiline
          sx={{width:'100%'}}
          id="description"
          label="Description"
          defaultValue={''}
          {...register("description", { required: true })}
        />
        {formState.errors.description && 
          <div className="input-error">
            Please enter the description
          </div>}
      </Grid>
    </Grid>
  )
}

export default StepTwo;
import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';


const StepTwo = ({register, setValue, setError, errors, getValues}) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const values = getValues();

  useEffect(() => {
    setError("imageId", { required: "Please upload image." });
    setImage(values.imageUrl);
  }, [])

  const handleOnChangeImage = async (e) => {
    setLoading(true);
    try{
      if(e.target.files){
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post("/api/upload", formData);
        if(res.status == 201){
          setValue('imageId', res.data.uuid, true);
          setValue('imageUrl', res.data.url, true);
          setImage(res.data.url);
        }
        setImage(URL.createObjectURL(file))
      }
    } catch(error){
      console.log(error.response?.data);
    }
    setLoading(false);
  }

  return(
    
    <Grid sx={{mt:3}} display={'flex'} flexWrap={'wrap'}>
      <Grid item sm={12} md={6} sx={{p:1}}>  
        <label>
          <input type="file" {...register("imageId")} id="imageId" name="imageId" accept="image/png, image/gif, image/jpeg" hidden
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
              alignItems: 'center'
            }}
          >
            {image ?
              <Grid width={400} height={400} position={'relative'}>
                <Image
                  src={image}
                  alt="Picture of the author"
                  layout='fill'
                  objectFit='contain'
                />
              </Grid>: 
              <Typography className="typography-bold">
                {loading ? 'Uploading' : errors.image ? errors.image.message : 'Upload Image'}
              </Typography>
            }
          </Box>
        </label>
      </Grid>
      <Grid item sm={12} md={6} sx={{p:1}}>  
        <TextField
          required
          className='description-textarea'
          multiline
          sx={{width:'100%'}}
          id="description"
          label="Description"
          defaultValue={''}
          {...register("description")}
        />
      </Grid>
    </Grid>
  )
}

export default StepTwo;
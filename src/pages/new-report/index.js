import * as React from 'react';
import { useState } from 'react';
import { Box, Stepper, Typography, StepLabel, Button, Step, Grid } from '@mui/material';
import MuButton from '../../components/common/MuButton';
import { FormProvider, useForm } from "react-hook-form";
import vehicles from '../../vehicles.json';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addReport } from '../../slices/reportsSlice';
import StepOne from '../../components/StepOne';
import StepTwo from '../../components/StepTwo';
import StepThree from '../../components/StepThree';

const steps = ['Vehicle information', 'Photo upload + description', 'Customer details'];

const NewReport = () => {
  const methods = useForm({
    defaultValues: {
      vehicleId: '',
      vehicleModel: '',
      color: '',
      vehicleNumber: '',
      description: '',
      image: '',
      customerName: '',
      mobileNumber: '',
      address: ''
    }
  });

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //reset form 
  const handleReset = () => {
    methods.reset({
      defaultValues: {
        vehicleId: '',
        vehicleModel: '',
        color: '',
        vehicleNumber: '',
        description: '',
        imageId: '',
        imageUrl: '',
        imageName: '',
        customerName: '',
        mobileNumber: '',
        address: ''
      }
    });
    setActiveStep(0);
    setLoading(false);
    setSubmitError(false);
    setSuccess(false);
  };

  //submit form
  const onSubmit = () => {
    const error = Object.keys(methods.formState.errors)
    const isNotSubmitError = error.length === 0;
    if(isNotSubmitError){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }

  //verify damage info and submit
  const handleVerifyAndSubmit = async () => {
    setLoading(true);
    const dateAndTime = new Date();
    const values = methods.getValues();
    const payLoad = {...values, createdDate: dateAndTime.toDateString()};

    const res = await axios.post("/api/submit", payLoad);
    if(res.status == 201){
      setLoading(false);

      //add damage report to redux store
      dispatch(addReport(
        {...values, uuid: res.data.uuid, createdDate: dateAndTime.toDateString()}
      ));
      setSuccess(true);
    } else {
      setSubmitError(true);
    }
  }

  const ReportInfo = ({getValues}) => {
    const reportInfo = getValues();
    const vehicle = vehicles.filter(e => e.id == reportInfo.vehicleId);
    const model = vehicle[0].models.filter(e => e.id == reportInfo.vehicleModel);
    return(
      <Grid item sx={{marginTop: 3, p: 2}} md={12} position={'relative'}>
        <Grid item md={4}>
          <Grid>
            <Typography className="typography-bold" variant="h5">
              {reportInfo.customerName}
            </Typography>
            <Typography variant="p">
              {reportInfo.address} | mobile: {reportInfo.mobileNumber}
            </Typography>
          </Grid>
          <Grid sx={{marginTop: 3}}>
            <Typography className="typography-bold" variant="h5">
              {vehicle[0].name} | {reportInfo.vehicleNumber}
            </Typography>
            <Typography variant="p">
              model : {model[0].name} | color: {reportInfo.color}
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={8}>
          <Grid display={'flex'} flexWrap={'wrap'}>
            <Grid width={300} height={200} position={'relative'}>
              <Image
                src={reportInfo.imageUrl}
                alt="Picture of the author"
                layout='fill'
                object-fit="cover"
              />
            </Grid>
            <Typography variant="p" sx={{marginLeft: 1, marginTop: 1}}>
              {reportInfo.description}
            </Typography>
          </Grid>
        </Grid>
        { loading ? 
          <div className='overlay'>
            <Typography variant="h5" className="typography-bold" sx={{marginLeft: 1}} color={submitError ? 'red' : 'black'}>
              {submitError ? 'Something went wrong' : 'Submitting..'} 
            </Typography>
          </div> : 
          success && <div className='overlay'>
            <Typography variant="h5" className="typography-bold" sx={{marginLeft: 1}} color={'black'}>
              Submitted Successfully.
            </Typography>
          </div>
        }
      </Grid>
    )
  }

  return(
    <>
      <Grid item sm={12} md={8} sx={{paddingBottom: 4}}  display={'flex'} 
        justifyContent={'space-between'} alignItems={'center'}>
        <Typography className="typography-bold" variant="h4">
          Damage Report Form
        </Typography>
        <MuButton variant="contained" title="Back" type="link" href="/"/>
      </Grid>
      <Grid item sm={12} md={8}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Grid>
                <ReportInfo getValues={methods.getValues}/>
              </Grid>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <MuButton
                  disabled={activeStep === 0 || success || (loading && !submitError)}
                  handleClick={handleBack}
                  sx={{ mr: 1 }}
                  title="Back"
                  variant="outlined"
                />
                <Box sx={{ flex: '1 1 auto' }} />
                <MuButton
                  disabled={activeStep === 0}
                  handleClick={handleReset}
                  sx={{ mr: 1 }}
                  title="Reset"
                  variant="outlined"
                />
                <Box sx={{marginLeft: 1}}>
                  <MuButton
                    handleClick={handleVerifyAndSubmit}
                    title="Submit"
                    variant="contained"
                    disabled={success || (loading && !submitError)}
                  />
                </Box>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  {
                    activeStep == 0 ? (<StepOne vehicles={vehicles} />) : 
                    activeStep == 1 ?  (<StepTwo/>) : 
                    activeStep == 2 && (<StepThree/>)
                  }
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <MuButton
                      disabled={activeStep === 0}
                      handleClick={handleBack}
                      sx={{ mr: 1 }}
                      title="Back"
                      variant="outlined"
                    />
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button 
                      variant="contained"
                      type="submit"
                    >
                      <div className='typography-bold'>{activeStep === steps.length - 1 ? 'Verify' : 'Next'}</div>
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </>
  )
}

export default NewReport;
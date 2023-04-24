import * as React from 'react';
import { useState } from 'react';
import { Box, Stepper, Typography, StepLabel, Button, Step, Grid } from '@mui/material';
import StepOne from '../../Components/StepOne';
import StepTwo from '../../Components/StepTwo';
import StepThree from '../../Components/StepThree';
import MuButton from '../../common/MuButton';
import { useForm } from "react-hook-form";
import vehicles from '../../vehicles.json';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addReport } from '../../slices/reportsSlice';
import { getReportByUUID, getReports } from '../api/reports';

const ReportDetails = ({report}) => {
  const reportInfo = JSON.parse(report);
  const vehicle = vehicles.filter(e => e.id == reportInfo.vehicleId);
  const model = vehicle[0].models.filter(e => e.id == reportInfo.vehicleModel);
  return(
    <>
      <Grid item sm={12} md={8} sx={{paddingBottom: 4}}  display={'flex'} 
        justifyContent={'space-between'} alignItems={'center'}>
        <Typography className="typography-bold" variant="h4">
          Damage Report Detail
        </Typography>
        <MuButton variant="contained" title="Back" type="link" href="/"/>
      </Grid>
      <Grid item sm={12} md={8}>
        <Box sx={{ width: '100%' }}>
          <Typography className="typography-bold" variant="h5">
            {reportInfo.customerName} | {vehicle[0].name} | Model : {model[0].name}
          </Typography>
          <Typography variant="p">
            {reportInfo.createdDate}
          </Typography>
          <Grid width={'100%'} height={400} position={'relative'} sx={{marginTop: 2}}>
            <Image
              src={reportInfo.imageUrl}
              alt="Picture of the author"
              layout='fill'
              objectFit='cover'
            />
          </Grid>
          <Typography variant="h6" sx={{marginTop: 2}}>
            {reportInfo.description}
          </Typography>
          <Grid width={'100%'} sx={{marginTop: 2}}>
            <Typography variant="h6" sx={{marginTop: 2}}>
              Customer Details
            </Typography>
            <Typography variant="p">
              Address : {reportInfo.address}
            </Typography><br/>
            <Typography variant="p">
              Mobile : {reportInfo.mobileNumber}
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export default ReportDetails;

export async function getStaticProps({params}) {
  const report = await getReportByUUID(params.uuid);
  return {
    props: {report: report}
  }
}

export async function getStaticPaths() {
  const response = await getReports();
  const reports = response.uuids;
  return {
    paths: reports.map(e => {
      return {params: {uuid: e}}
    }),
    fallback: false
  }
}

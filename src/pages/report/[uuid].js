import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import vehicles from '../../vehicles.json';
import Image from 'next/image';
import { getReportByUUID, getReports } from '../api/reports';
import MuButton from '../../components/common/MuButton';

const ReportDetails = ({report}) => {

  //get report information from prom and parse to json 
  const reportInfo = JSON.parse(report);

  //get vehicle details by vehicle id
  const vehicle = vehicles.filter(e => e.id == reportInfo.vehicleId);

  //get vehicle model by vehicle model id
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
  //get damage report by UUID
  const report = await getReportByUUID(params.uuid);
  return {
    props: {report: report}
  }
}

export async function getStaticPaths() {
  //get all damage reports' UUIDs
  const response = await getReports();
  const reports = response.uuids;

  return {
    paths: reports.map(e => {
      return {params: {uuid: e}}
    }),
    fallback: false
  }
}

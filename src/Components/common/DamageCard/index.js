import {Grid, Typography, Card, CardHeader, Avatar, CardMedia, CardContent} from '@mui/material';
import Link from 'next/link';
import vehicles from '../../../vehicles.json';
import { grey } from '@mui/material/colors';

const DamageCard = ({info}) => {

  //get vehicle details by vehicle id
  const vehicle = vehicles.filter(e => e.id == info.vehicleId);

  return(
    <Grid className="tablet-cloums" item md={3} sm={1} sx={{padding: 1}}>
      <Link href={`/report/${info.uuid}`}>
        <Card className="card cursor-pointer card-hover-anim">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: grey }} aria-label="recipe">{info.customerName.charAt(0).toUpperCase()}</Avatar>
            }
            className="damage-card"
            title={info.customerName}
            subheader={vehicle[0].name}
          />
          <div className='date-text'>{info.createdDate}</div>
          <CardMedia
            component="img"
            height="194"
            image={info.imageUrl}
          />
          <CardContent>
            <Typography height={'35px'} className="text-ellipsis" variant="body2" color="text.secondary">
              {info.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}

export default DamageCard;
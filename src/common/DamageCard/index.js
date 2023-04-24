import {Grid, Typography, Card, CardHeader, Avatar, CardMedia, CardContent} from '@mui/material';
import Link from 'next/link';
import vehicles from '../../vehicles.json';

const DamageCard = ({info}) => {

  const randomColor = Math.floor(Math.random()*16777215).toString(16);

  const vehicle = vehicles.filter(e => e.id == info.vehicleId);
  const model = vehicle[0].models.filter(e => e.id == info.vehicleModel);

  return(
    <Grid className="tablet-cloums" item md={3} sm={1} sx={{padding: 1}}>
      <Link href={`/report/${info.uuid}`}>
        <Card className="card cursor-pointer card-hover-anim">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: randomColor }} aria-label="recipe">{info.customerName.charAt(0).toUpperCase()}</Avatar>
            }
            title={info.customerName + " | " + vehicle[0].name}
            subheader={info.createdDate}
          />
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
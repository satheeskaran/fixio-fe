import {Button} from '@mui/material';
import Link from 'next/link';

const MuButton = (props) => {
  return(
    props.type == "link" ? 
      <Link href={props.href}>
        <Button 
          variant={props.variant}
          disabled={props.disabled}
        >
          <div className='typography-bold'>{props.title}</div>
        </Button>
      </Link>
    :
      <Button 
        variant={props.variant}
        disabled={props.disabled}
        onClick={() => props.handleClick()}
        type={props.type == 'submit' ? props.type : 'button'}
      >
        <div className='typography-bold'>{props.title}</div>
      </Button>
  )
}

export default MuButton;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginLeft: '20%',
    position : 'absolute',
    top : '0',
    screenLeft : '0',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomAlert() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">Item Added to Cart</Alert>
    </div>
  );
}

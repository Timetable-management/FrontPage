import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './LogIn.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function SignIn() {
  const classes = useStyles();

  //Boton submit del formulario
  const submitInfo = (event) => {
    event.preventDefault();
    console.log('funciona')
  }
  //Estado con los datos del formulario
  const [data, updateData] = useState({
    correo: "",
    contraseña: ""
  })

  return (
    <div className="SignIn">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => submitInfo(event)}>
        <div className="row">
          <div className="col-12">
            <TextField id="correo" label="Email" type="email" name="correo"
              value={data.correo}
              onChange={(event) => updateData({ ...data, correo: event.target.value })} />
          </div>
          <div className="col-12">
            <TextField id="contraseña" label="Contraseña" type="text" name="contraseña"
              value={data.contraseña}
              onChange={(event) => updateData({ ...data, contraseña: event.target.value })} />
          </div>
          < div className = "col-12 aligItems" >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
            >
              Log In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

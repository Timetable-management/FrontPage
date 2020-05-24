import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './LogIn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
  //ver/ocultar contraseña
  const [viewPassword, setViewPassword] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} size="xs" />
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} size="xs" />

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
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
              <Input
                value={data.contraseña}
                id="contraseña"
                name="contraseña"
                type={viewPassword ? 'text' : 'password'}
                onChange={(event) => updateData({ ...data, contraseña: event.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setViewPassword(!viewPassword)}
                    >
                      {viewPassword ? eye : eyeSlash}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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

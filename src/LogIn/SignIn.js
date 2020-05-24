import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './SignIn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import MyContext from '../context';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function SignIn() {

  //Global Context
  const contextInfo = useContext(MyContext);
  const hooksState = contextInfo.hooksState;
  const setHooksState = contextInfo.setHooksState;

  const classes = useStyles();

  const [fetchData, setFetchData] = useState([]);

  //Estado con los datos del formulario
  const [data, updateData] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    cargo: "",
    contraseña: "",
    repeatPassword: ""
  })

  //ver/ocultar contraseña
  const [viewPassword, setViewPassword] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} size="xs" />
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} size="xs" />

  //Boton submit del formulario
  const submitInfo = async (event) => {
    event.preventDefault();

    await fetch('https://timetable-managment-backend.herokuapp.com/signIn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => { return response.json() })
      .then((responseJson) => {
        setFetchData(responseJson);
        return responseJson;
      })
      .then((errorsArray) => {
        console.log(errorsArray)
        if ((errorsArray.errors || []).length === 0) {
          document.getElementById('buttonToRegister').click();
          setHooksState({currentUser: errorsArray});
        }
      })
  }

  return (
    <div className="SignIn">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => submitInfo(event)}>
        <div className="row">
          <div className="col-12">
            <TextField id="nombre" label="Nombre" type="text" name="nombre"
              value={data.nombre}
              onChange={(event) => updateData({ ...data, nombre: event.target.value })} required />
          </div>
          <div className="col-12">
            <TextField id="primerApellido" label="Primer apellido" type="text" name="primerApellido"
              value={data.primerApellido}
              onChange={(event) => updateData({ ...data, primerApellido: event.target.value })} required />
          </div>
          <div className="col-12">
            <TextField id="segundoApellido" label="Segundo apellido" type="text" name="segundoApellido"
              value={data.segundoApellido}
              onChange={(event) => updateData({ ...data, segundoApellido: event.target.value })} required />
          </div>
          <div className="col-12">
            <TextField id="correo" label="Email" type="email" name="correo"
              value={data.correo}
              onChange={(event) => updateData({ ...data, correo: event.target.value })} required />
          </div>
          <div className="col-12">
            <TextField id="cargo" label="Cargo" type="text" name="cargo"
              value={data.cargo}
              onChange={(event) => updateData({ ...data, cargo: event.target.value })} required />
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
          <div className="col-12">
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Repite contraseña</InputLabel>
              <Input
                value={data.repeatPassword}
                id="repiteContraseña"
                name="repiteContraseña"
                type={viewPassword ? 'text' : 'password'}
                onChange={(event) => updateData({ ...data, repeatPassword: event.target.value })}
              />
            </FormControl>
          </div>
          <div className="col-12 aligItems">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
            >
              Enviar
            </Button>
          </div>
        </div>
      </form>
      <Link to="/principalPage" id="buttonToRegister" style={{ display: 'none' }}>boton transparente</Link>
      <div className="errores">
        {((fetchData || {}).errors || []).length !== 0 && fetchData.errors.map(error =>
          <div>
            <p>{error.msg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;

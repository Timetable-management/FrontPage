import React, { useState } from 'react';
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

import { Alert } from 'reactstrap';



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
  const submitInfo = async(event) => {
    event.preventDefault();
    
    await fetch('https://timetable-managment-backend.herokuapp.com/signIn',{
      method: 'POST',
      // mode: "no-cors",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: data.nombre,
        primerApellido: data.primerApellido,
        segundoApellido: data.segundoApellido,
        correo: data.correo,
        cargo: data.cargo,
        contraseña: data.contraseña
      })
    })
  }
  //Array de checkEmptyFields
  const [checkEmptyFields, setCheckEmptyFields] = useState([])
  //Comprobamos que campos del formulario NO estan rellenos
  let checkFillFields = () => {
    setCheckEmptyFields([])
    let prueba = []
    for (const prop in data) {
      if (data[prop] === ""){
        prueba.push(prop)
      }
    }
    setCheckEmptyFields(prueba)
    console.log(checkEmptyFields)
  }
  //Estado con los datos del formulario
  const [data, updateData] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    cargo: "",
    contraseña: ""
  })
  //Comparamos contraseñas
  const [repeatpassword, setRepeatpassword] = useState({
    repeatpassword: ""
  })
  //Estado de OK/KO contraseña para ver mensaje de error
  const [checkPassword, setCheckPassword] = useState(true);
  //ver/ocultar contraseña
  const [viewPassword, setViewPassword] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} size="xs"/>
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} size="xs"/>
  

  return (
    <div className="SignIn">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => submitInfo(event)}>
        <div className="row">
          <div className="col-12">
            <TextField id="nombre" label="Nombre" type="text" name="nombre"
              value={data.nombre}
              onChange={(event) => updateData({ ...data, nombre: event.target.value })} required/>
          </div>
          <div className="col-12">
            <TextField id="primerApellido" label="Primer apellido" type="text" name="primerApellido"
              value={data.primerApellido}
              onChange={(event) => updateData({ ...data, primerApellido: event.target.value })} required/>
          </div>
          <div className="col-12">
            <TextField id="segundoApellido" label="Segundo apellido" type="text" name="segundoApellido"
              value={data.segundoApellido}
              onChange={(event) => updateData({ ...data, segundoApellido: event.target.value })} required/>
          </div>
          <div className="col-12">
            <TextField id="correo" label="Email" type="email" name="correo"
              value={data.correo}
              onChange={(event) => updateData({ ...data, correo: event.target.value })} required/>
          </div>
          <div className="col-12">
            <TextField id="cargo" label="Cargo" type="text" name="cargo"
              value={data.cargo}
              onChange={(event) => updateData({ ...data, cargo: event.target.value })} required/>
          </div>
          <div className="col-12">
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
              <Input
                value = {data.contraseña}
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
                value={repeatpassword.repeatpassword}
                id="repiteContraseña"
                name="repiteContraseña"
                type={viewPassword ? 'text' : 'password'}
                onChange={(event) => setRepeatpassword({ ...repeatpassword, repeatpassword: event.target.value })}
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
          <div className="col-12">
            {checkPassword != true &&
              <Alert className="alert" color="danger">
              Las contraseñas no coinciden
            </Alert>
            }
          </div>
          <div className="col-12">
            {checkEmptyFields.length !== 0 &&
              <Alert  className="alert" color="danger">
                Rellena todos los campos
              </Alert>}
            {/* {checkEmptyFields.length !== 0 &&
              <Alert color="danger">
              te falta por rellenar:
                {checkEmptyFields.map(x =>
                  <p>{x}</p>)}
              </Alert>
            } */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

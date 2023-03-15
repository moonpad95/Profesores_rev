import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Col, Image } from 'react-bootstrap';
import axios from "axios";

const initialState = '';
const initialStateProfesor = {
	clave:'',
	nombres:'',
	apellidos:'',
	fnacimiento:'',
	email:'',
	sexo:'',
	estadocivil:'',
	tcasa:'',
	tcelular:'',
	curp:'',	
	calle:'',
	colonia:'',
	cp:'',
	municipio:'',
	estado:'',
	estatus:'',
	password:'',
	foto:'',
}
const ProfesorFoto = () => {
	const [archivo, setArchivo] = useState(initialState);
	const [profesor, setProfesor] = useState(initialStateProfesor);
	const { clave, nombres, apellidos, fnacimiento, email, sexo, estadocivil, tcasa, tcelular, curp, calle, colonia, cp, municipio, estado, estatus, password, foto } = profesor;

	useEffect(() => {
	 traerProfesor();
	}, [])

	const traerProfesor = () => {
		axios
		.get("http://localhost:5000/profesor/traer/token",{
		  headers:{
			  'x-access-token':localStorage.getItem('token')
		  }
		})
		.then(function (response) {
		  setProfesor(response.data.result[0]);
		})
		.catch(function (error) {
		  // handle error
		  console.log(error);
		});

	}
	
	
	const handleChange = (e) => {
		setArchivo(e.target.files[0]);
	}
	const handleSubmit = async (e) => {

		e.preventDefault();
		if(archivo==='') {
			return(
				alert('selecciona archivo')
			)
		}
		const formData = new FormData();
		formData.append('clave', clave);
		formData.append('foto', foto);
		formData.append('archivo', archivo);

		const config = {
			headers:{
				'x-access-token':localStorage.getItem('token')
			}
		}

		axios
      .post("http://localhost:5000/profesor/foto/subir", formData, config)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
	}
  return (
    <Container>
      <Row>
        <Col>
		{/* antiguo */}
		<p className='h4'>Avatar actual</p>
			<Image
			style={{width:'50%', height:'50%', verticalAlign:'center'}}
			variant='top'
			roundedCircle={true}
			src={`http://localhost:5000/img/${ foto }`}
		/>

		
		</Col>
        <Col>
          {/* nuevo */}
		 {
			archivo!==''
			? (
				<Image
				style={{width:'50%', height:'50%', verticalAlign:'center'}}
				variant='top'
				roundedCircle={true}
				src = { URL.createObjectURL(archivo) }
			  />
			)
			:
			<p>Selecciona una imagen</p>
		 }
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="h3">Selecciona imagen</Form.Label>
              <Form.Control
			  	accept='image/*'
                name="archivo"
                type="file"
                size="lg"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type='submit' variant="light">Subir</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfesorFoto;

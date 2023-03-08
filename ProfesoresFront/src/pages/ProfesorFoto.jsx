import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from "axios"


const initialState = '';
function ProfesorFoto() {
    const [archivo, setArchivo] = useState(initialState);
    const handleChange = (e) =>{
        setArchivo(
            e.target.files[0]
        );
    }
    const handleSubmit = () =>{
        const formData = new FormData();
        formData.append('archivo', archivo);
        const config = {
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        }
    }
 /*    axios
      .get("http://localhost:5000/profesor/traer/token",{
		headers:{
			'x-access-token':localStorage.getItem('token')
		}
	  })
      .then(function (response) {
        // handle success
        // console.log(response);
		setProfesor(response.data.result[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }); */
  
    
return (
    <Container onSubmit={handleSubmit}>
        <h1>Formato para agreagar foto a profesores</h1>
    <Form>
        <Form.Group className="mb-3">
        <Form.Label className='h3 mt-5'>Selecciona una imagen</Form.Label>
        <Form.Control name="archivo" type="file" size="lg" onChange={handleChange}/>
        </Form.Group>
        <Button
            variant='secondary'
        >Subir</Button>
    </Form>
    </Container>
    

  )
}

export default ProfesorFoto
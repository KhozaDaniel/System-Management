import { useEffect } from 'react'
import "./UpdateUser.css";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateUser() {

    const {id} = useParams();
    const navigate =  useNavigate();

    const [formData, setFormData] = useState({
            name: "",
            email: "",
            phone: "",
            classes: ""
        })
    
        const handleInputChange = (event) => {
            const {name, value} = event.target;
            setFormData({
                ...formData,
                [name]:value,
            })
        }

        useEffect(() =>{
            const fetchStudent = async () =>{
                try {
                    const response = await fetch(`http://localhost:8080/api/student/${id}`);
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error("Error fetching user:", error.message);
                }
            }
            fetchStudent();
        }, [id])

        const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch(`http://localhost:8080/api/student/${id}`,{
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Student created:", data);
            navigate(`/`)

        } catch (error) {
            console.log("Error updating user:", error.message)

            const stored = JSON.parse(localStorage.getItem("mockStudents") || "[]");

            const index = stored.findIndex(
            (s) => s.id === Number(id) || s.email === formData.email
            );

            if (index !== -1) {
            stored[index] = { ...stored[index], ...formData };
            localStorage.setItem("mockStudents", JSON.stringify(stored));
            alert("Backend offline. Student updated locally.");
            } else {
            alert("Student not found in local data. Cannot update.");
            }

            navigate(`/`);
        }

    }

  return (
    <>
      <div className='center-form'>
        <h1>Edit Student</h1>
        <Form onSubmit={handleSubmit}> 
            <Form.Group controlId="formBasicName">
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}                
                />
            </Form.Group>

            <Form.Group controlId="formBasicName">
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}                
                />
            </Form.Group>

            <Form.Group controlId="formBasicName">
                <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter phone"
                    value={formData.phone}
                    onChange={handleInputChange}                
                />
            </Form.Group>

            <Form.Group controlId="formBasicName">
                <Form.Control
                    type="text"
                    name="classes"
                    placeholder="Enter classes"
                    value={formData.classes}
                    onChange={handleInputChange}                
                />
            </Form.Group>
        
        <Button variant="primary" type="submit" className="w-100">Update Student </Button>
        </Form>
      </div>
    </>
  )
}

import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import "./PostUser.css"
import { useNavigate } from 'react-router-dom'

export default function PostUser() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        classes: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch("http://localhost:8080/api/student",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Student created:", data);
            navigate(`/`);

        } catch (error) {
            console.log("Error creating student:", error.message)

            // 
            const localStudents = JSON.parse(localStorage.getItem("mockStudents") || "[]");
            const newStudent = {
                id: Date.now(), 
                ...formData,
            };
            const updatedStudents = [...localStudents, newStudent]; 
            localStorage.setItem("mockStudents", JSON.stringify(updatedStudents));
            setFormData(updatedStudents); 
            console.log("Student created locally:", formData);
            navigate(`/`);
        }
    }

  return (
    <>
      <div className='center-form'>
        <h1>Post New Student</h1>
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
        
        <Button variant="primary" type="submit" className="w-100">Post Student </Button>
        </Form>
      </div>
    </>
  )
}

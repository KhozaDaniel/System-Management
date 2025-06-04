import { useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css"



export default function Dashboard() {

  const [student, setStudent] = useState([]);
  const navigate = useNavigate();

  useEffect( () => {
    const fetchStudent = async () =>{
      try {
        const response = await fetch("http://localhost:8080/api/student");
        const data = await response.json();
        setStudent(data)
        localStorage.setItem("mockStudents", JSON.stringify(data));
      } catch (error) {

        console.warn("Backend offline. Loading students from localStorage.")

        const localStudents = JSON.parse(localStorage.getItem("mockStudents") || "[]");
        setStudent(localStudents);
      }
    }
    fetchStudent();
  }, [])

    const handleDelete = async (studentId) =>{
      try {
        const response = await fetch(`http://localhost:8080/api/student/${studentId}`,{
          method: "DELETE",
        });

        if(response.ok){
          const updated = student.filter((s) => s.id !== studentId);
          setStudent(updated);
          localStorage.setItem("mockStudents", JSON.stringify(updated));
          console.log(`Student with ID ${studentId} deleted from backend.`);
        }

        

      } catch (error) {

        console.warn("Backend offline. Deleting student locally...");
        const localStudents = JSON.parse(localStorage.getItem("mockStudents") || "[]");
        const updatedStudents = localStudents.filter((s) => String(s.id) !== String(studentId));
        localStorage.setItem("mockStudents", JSON.stringify(updatedStudents));
        setStudent(updatedStudents);
        
      }
    };

    const handleUpdate = (studentId) =>{
      navigate(`/student/${studentId}`);
    }

  return (
    <div className='wrapper'>
      <Container className="mt-5">
        <Row>
          <Col>
              <h1 className="text-center">Students</h1>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Classes</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.map((student) => 
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.classes}</td>
                            <td>
                            <div className="d-flex flex-wrap gap-2">
                              <Button variant="outline-secondary" className="me-2 same-width-btn" onClick={() => handleUpdate(student.id)}>Update</Button>
                              <Button variant="outline-danger" className="same-width-btn" onClick={() => handleDelete(student.id)}>Delete</Button>
                            </div>                            
                            </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    email: ""
  });


  function onTextFeildChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  async function onFormSubmit(e) {
    setIsEditing(false)
    e.preventDefault();
    try {
      await axios.post("http://localhost:3004/students", student);
    }

    catch (error) {
      console.log("error on Submit")
    }

  }
  async function onFormUpdate(e,id) {
    e.preventDefault();
    try{
      await axios.put(`http://localhost:3004/students/${id}`, student);
        
    }catch(error){
      console.log("error on Submit")
      
    }
    setIsEditing(false)
  }


  useEffect(() => {
    async function getAllStudents() {
      try {
        const students = await axios.get("http://localhost:3004/students");
        setStudents(students.data);


      } catch (error) {
        console.log("error has ocured");

      }
    }
    getAllStudents();
  }
  )

  const handleDelete = async id => {
    await axios.delete(`http://localhost:3004/students/${id}`);
    var newList = students.filter((item) => {
      return item.id !== id;
    })
    setStudents(newList)
  }

  const handleEdit = async id => {
   const student= await axios.get(`http://localhost:3004/students/${id}`);
    
    setStudent(student.data);
    setIsEditing(true);
    
  }
    
  
  
  return (
    <>
      <h1 className="heading">CRUD App in React with JSON-server API</h1>
      <div className="container">
        <div className="inputForm">
          <h1>Add Student</h1>
          <form action="">
            <input type="text" placeholder="Name" name="name" onChange={e => onTextFeildChange(e)}
              value={student.name}
            /><br>
            </br>
            <input type="email" placeholder="Email" name="email" onChange={e => onTextFeildChange(e)}
              value={student.email} /><br>
            </br>{ isEditing ?
            <button type='button'className='updateBtn' onClick={e => onFormUpdate(e,student.id)}>Update</button>:
            <button type='button' onClick={e => onFormSubmit(e)}>ADD</button>}
          
          </form>
        </div>
        <div className="displayData">
          <h1>Student's List</h1>
          <table>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
              <th>Action</th>
              <th></th>

            </tr>
            {
              students.map((student, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                   <td></td>
                    <td><button className='editBtn'   onClick={()=>handleEdit(student.id)}>Edit</button></td>
                    <td><button className='deleteBtn' onClick={() => handleDelete(student.id)}>Delete</button></td>
                  </tr>

                )
              })
            }
            {/*<tr>
            <td>1</td>
            <td>ved prakash</td>
            <td>ved@gmail.com</td>
            <td><button>Detail</button></td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
          </tr>

          <tr>
            <td>2</td>
            <td>ravi</td>
            <td>ved@gmail.com</td>
            <td><button>Detail</button></td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
</tr>*/}
          </table>
        </div>
      </div>
    </>
  )
}

export default App;

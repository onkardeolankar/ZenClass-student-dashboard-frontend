import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import Loading from '../utils/loading';
import Error from '../utils/error';
import Alert from '../utils/alert';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      rollno: '',
      canDisplayView: false,
      isError: false,
      alertVariant: 'none',
      alertMsg: '',
    }
  }

  componentDidMount() {
    axios.get('/students/edit-student/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          rollno: response.data.rollno,
          canDisplayView: true,
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          isError: true,
          canDisplayView: true,
        });
      })
  }

  handleStudentNameChange = (evt) => {
    this.setState({
      name: evt.target.value,
    })
  }

  handleStudentEmailChange = (evt) => {
    this.setState({
      email: evt.target.value,
    })
  }

  handleStudentRollnoChange = (evt) => {
    this.setState({
      rollno: evt.target.value,
    })
  }

  handleSubmitDetails = () => {
    const { name, email, rollno } = this.state;
    const data = {
      name,
      email,
      rollno
    };

    if (name === '' || email === '' || rollno === '') {
      this.setState({
        alertVariant: 'danger',
        alertMsg: 'All field are required',
      })
    } else {
      axios.put('/students/update-student/' + this.props.match.params.id, data)
        .then((res) => {
          this.setState({
            alertVariant: 'success',
            alertMsg: 'Student successfully updated'
          })
        }).catch((error) => {
          this.setState({
            alertVariant: 'danger',
            alertMsg: 'Something went wrong! Please try again later.',
          })
          console.log(error);
        })
    }
  }

  handleAlertClose = () => {
    this.setState({
      alertVariant: 'none',
      alertMsg: '',
    })
  }
  
  render() {
    const { name, email, rollno, canDisplayView, isError, alertVariant, alertMsg } = this.state;

    if (!canDisplayView) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    return (
      <>
        {
          <div className="student-create-wapper">
            <h1> Update student list</h1>
            {
              alertVariant === 'none' ? null : <Alert alertVariant={alertVariant} alertMsg={alertMsg} handleAlertClose={this.handleAlertClose}/>
            }
            <Form>
              <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleStudentNameChange} />
              </Form.Group>

              <Form.Group controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={this.handleStudentEmailChange} />
              </Form.Group>

              <Form.Group controlId="Name">
                <Form.Label>Roll No</Form.Label>
                <Form.Control type="number" value={rollno} onChange={this.handleStudentRollnoChange} />
              </Form.Group>

              <Button variant="danger" size="lg" block="block" onClick={this.handleSubmitDetails}>
                Update Student
              </Button>
            </Form>
          </div>
        }
      </>
    );
  }
}

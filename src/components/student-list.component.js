import React, { Component } from "react";
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Loading from '../utils/loading';
import Error from '../utils/error';
import Alert from '../utils/alert';

export default class StudentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      canDisplayView: false,
      isError: false,
      alertVariant: 'none',
      alertMsg: '',
      showModal: false,
      selectedData: {},
    };
  }

  componentDidMount() {
    axios.get('/students')
      .then(res => {
        this.setState({
          students: res.data,
          canDisplayView: true,
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isError: true,
          canDisplayView: true,
        });
      })
  }

  deleteStudent(id) {
    const { students } = this.state;
    axios.delete('/students/delete-student/' + id)
      .then((res) => {
        this.setState({
          alertVariant: 'success',
          alertMsg: 'Student successfully deleted!'
        })
      }).catch((error) => {
        this.setState({
          alertVariant: 'danger',
          alertMsg: 'Something went wrong! Please try again later.',
        })
        console.log(error);
      })
    this.setState({
      students: students.filter(student => student._id !== id),
    })
    this.handleModalClose();
  }

  handleModalClose = () => {
    this.setState({
      showModal: false,
      selectedData: {},
    })
  }

  handleModalShow = (data) => {
    this.setState({
      showModal: true,
      selectedData: data,
    })
  }

  confirmationModal() {
    const { showModal, selectedData: data } = this.state;
    return (
      <Modal show={showModal} onHide={this.handleModalClose} key={data._id}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete <b>{data.name}</b> details?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => this.deleteStudent(data._id)}>
            Delete
            </Button>
          <Button variant="secondary" onClick={this.handleModalClose}>
            Close
            </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  getTableData() {
    const { students } = this.state;
    return students.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.rollno}</td>
          <td>
            <Link className="btn btn-primary btn-sm edit-link" to={"/edit-student/" + student._id}>
              Edit
            </Link>
          </td>
          <td>
            <Button size="sm" variant="danger" onClick={() => this.handleModalShow(student)}>Delete</Button>
          </td>
        </tr>
      )
    }
    )
  }

  handleAlertClose = () => {
    this.setState({
      alertVariant: 'none',
      alertMsg: '',
    })
  }

  render() {
    const { students, canDisplayView, isError, alertVariant, alertMsg } = this.state;

    if (!canDisplayView) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    return (
      <>
        {
          canDisplayView ?
            <div className="student-list-wrapper">
              <h1> Student list</h1>
              {
                alertVariant === 'none' ? null : <Alert alertVariant={alertVariant} alertMsg={alertMsg} handleAlertClose={this.handleAlertClose} />
              }
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roll No</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    students.length ? this.getTableData() : <tr><td colSpan="5"> No data found.</td></tr>
                  }
                  {this.confirmationModal()}
                </tbody>
              </Table>
            </div>
            : <Loading />
        }
      </>
    );
  }
}

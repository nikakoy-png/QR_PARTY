import  React, { Component } from  'react';
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users_admin: [],
            users_moder: [],
            users_user: [],
            statuses: [],
            myself: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    getUser() {
        fetch('http://127.0.0.1:8000/api/auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        myself: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        let {id} = this.props.params;
        fetch(`http://127.0.0.1:8000/api/room/get_user_status/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        users_admin:result.items[0].user.users[0]['admin'],
                        users_moder:result.items[0].user.users[1]['moder'],
                        users_user:result.items[0].user.users[2]['user'],
                        statuses:result.items[1].status.statuses[0]['status'],
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
        this.getUser()
    }

    ChengeStatus_() {
        let {id} = this.props.params;
        fetch(`http://127.0.0.1:8000/api/room/get_user_status/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        statuses:result.items[1].status.statuses[0]['status'],
                    });
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    handleClick(e, user, room) {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/room/chenge_status/${room.id}/user/${user}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        }).then(res => res.json())
      .then(

       )
        this.ChengeStatus_()
    }


    render() {
        let {id} = this.props.params;
        const {error, isLoaded, users_admin, users_moder, users_user, statuses, myself} = this.state;
        console.log(myself)
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            for (let i = 0; i < users_admin.length; i++) {
                try {
                    if (myself.id === users_admin[i].pk) {
                    return (
                        <PermAdmin onClick={this.handleClick} users_admin={users_admin} users_moder = {users_moder}
                                   users_user = {users_user} statuses={statuses} id_room={this.props.params}/>
                        )
                    } else {
                        return (
                <div className="opacity-75 cover-container d-flex w-75 h-auto p-3 mx-auto flex-column bg-white">
                    <Example room={id} user={myself.id}/>
                    {users_admin.map(item => (
                            <div className="container text-center bg-danger py-3 rounded-5 rounded border-dark bg-opacity-75 mt-2">
                              <div className="row">
                                <div className="col-sm-10">
                                    <h1 className="float-md-start mb-0 align-middle px-2 grad_green"> {item.username} </h1>
                                </div>
                              </div>
                            </div>

                    ))}
                    {users_moder.map(item => (
                            <div className="container text-center bg-danger py-3 rounded-5 rounded border-dark bg-opacity-75 mt-2">
                              <div className="row">
                                <div className="col-sm-10">
                                    <h1 className="float-md-start mb-0 align-middle px-2 grad_green"> {item.username} </h1>
                                </div>
                              </div>
                            </div>
                    ))}
                    {users_user.map(item => (
                            <div className="container text-center bg-info py-3 rounded-5 rounded border-dark bg-opacity-75 mt-2">
                              <div className="row">
                                <div className="col-sm-10">
                                    <h1 className="float-md-start mb-0 align-middle px-2"> {item.username} </h1>
                                </div>
                              </div>
                            </div>
                    ))}
                </div>
            )
                    }
                }catch(err) {
                    console.log(err)

                }

            }
        }
    }
}


function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        QR_code
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Qr_code</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={require(`./image/${props.user}_${props.room}.png`)} alt={''}/></Modal.Body>
      </Modal>
    </>
  );
}

function StatusUserShow(props) {
    for (let i = 0; i < props.statuses.length; i++) {
        if (props.user === props.statuses[i]['user']) {
            if (props.statuses[i]['status'] === true) {
                return <div>Status: True</div>
            }
            return <div>Status: False</div>
        }
    }
}


function LoginButton(props) {
    return (
      <button onClick={(id) => props.onClick(id, props.user, props.id_room)}
              className="nav-link border-button text">Change status</button>
  );
}


function PermAdmin(props) {
    return (
        <div className="opacity-75 cover-container d-flex w-75 h-auto p-3 mx-auto flex-column bg-white">
                    {props.users_admin.map(item => (
                            <div className="container text-center bg-danger py-3 rounded-5 rounded border-dark bg-opacity-75 mt-2">
                              <div className="row">
                                <div className="col-sm-10">
                                    <h1 className="float-md-start mb-0 align-middle px-2 grad_green"> {item.username} </h1>
                                </div>
                              </div>
                            </div>
                    ))}
                    {props.users_moder.map(item => (
                            <div className="container text-center bg-danger py-3 rounded-5 rounded border-dark bg-opacity-75 mt-2">
                              <div className="row">
                                <div className="col-sm-10">
                                    <h1 className="float-md-start mb-0 align-middle px-2 grad_green"> {item.username} </h1>
                                </div>
                                  <nav className="nav nav-masthead justify-content-center">
                                    <LoginButton onClick={props.onClick}/>
                                  </nav>
                              </div>
                            </div>
                    ))}
                    {props.users_user.map(item => (
                            <div className="container text-center bg-info py-3 rounded-5 rounded border-dark bg-opacity-75 mt-2">
                              <div className="row">
                                <div className="col-sm-10">
                                    <h1 className="float-md-start mb-0 align-middle px-2"> {item.username} </h1>
                                    <nav className="nav nav-masthead justify-content-center">
                                        <StatusUserShow statuses={props.statuses} user={item.pk}/>
                                        <LoginButton onClick={props.onClick} user={item.pk} id_room={props.id_room}/>
                                  </nav>
                                </div>
                              </div>
                            </div>
                    ))}
                </div>
    )
}

export default withParams(Room);


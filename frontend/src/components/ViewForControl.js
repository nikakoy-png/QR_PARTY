import  React, { Component } from  'react';
import { useParams } from "react-router-dom";



function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class ViewForControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            room: [],
            user: [],
            status: [],
        };
    }


    componentDidMount() {
        console.log(this.props.params)
        fetch(`http://127.0.0.1:8000/api/room/get_user_for_control/${this.props.params.id_user}/user/${this.props.params.id_room}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        room: result.items[0].room,
                        user: result.items[1].user,
                        status: result.items[2].status,
                    });
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }


    render() {
        const {error, isLoaded, room, user, status} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <div className="cover-container d-flex w-75 h-100 p-3 mx-auto flex-column bg-white bg-opacity-50">
                        <main className="px-3">
                            <h1>Для комнаты: {room.name}</h1>
                            <h2 className="lead">Пользователь: {user.username}</h2>
                            <p className="lead">Почта пользователя: {user.email}</p>
                            <p className="lead">
                                <StuatusView status={status.status}/>
                            </p>
                        </main>
                    </div>
                </div>
            )
        }
    }
}

function StuatusView(props) {
    if (props.status === true) {
        return (<h1 className="center-block btn btn-lg btn-secondary bg-success fw-bold border-white">Доступ разрешен</h1>)
    }
    return (<h1 className="center-block btn btn-lg btn-secondary bg-danger fw-bold border-white">Доступ запрещен</h1>)
}



export default withParams(ViewForControl);


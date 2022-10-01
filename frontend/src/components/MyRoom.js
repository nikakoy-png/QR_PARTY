import  React, { Component } from  'react';
import Cookies from "js-cookie";
import GetCountPeople from "./GetCountPeople";
import {Link} from "react-router-dom";



class MyRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items_admin: [],
            items_moder: [],
            items_user: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }
    copyText(text) {
        navigator.clipboard.writeText('http://localhost:3000/invite/' + text);
    }

    handleClick(e, text) {
        e.preventDefault();
        let copyText = document.getElementById(`${text}`);
        console.log(copyText)
        let elementText = copyText.textContent;
        this.copyText(elementText);
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/room/get_room', {
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
                        items_admin: result.items[0]['admin_items'],
                        items_moder: result.items[1]['moder_items'],
                        items_user: result.items[2]['user_items'],
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }


    render() {
        const {error, isLoaded, items_admin, items_moder, items_user} = this.state;
        const items = [];
        items.push.apply(items, items_admin)
        items.push.apply(items, items_moder)
        items.push.apply(items, items_user)
        console.log(items)
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div className="cover-container d-flex w-75 h-100 p-3 mx-auto flex-column bg-white bg-opacity-50">
                    {items.map(item => (
                        <div className="container text-center bg-white py-3 rounded-5 rounded-end border-dark bg-opacity-75 mt-2">

                                  <div className="row">
                                      <Link  style={{ textDecoration: 'none', color: 'black' }} to= {`/room/${ item.pk }`}>
                                            <div className="col-sm-10">
                                                <h1 className="float-md-start mb-0 align-middle px-2 grad_green"> {item.name} </h1>
                                            </div>
                                      </Link>
                                    <div className="col-sm-9">
                                      <div className="row">
                                        <div className="col-8 col-sm-6">
                                            <GetCountPeople params = {item.pk}/>
                                        </div>
                                        <div className="col-4 col-sm-6">
                                          <h3 className="nav-link text" href="/">{item.description}</h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="border-button btn-group float-md-end">
                                        <button name="dropdown-toggle" type="button" className="btn dropdown-toggle px-5" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                            <h2 className="float-md-start mb-0 align-middle px-5"> {this.state.username} </h2>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-lg-end bg-opacity-50 ">
                                            <button id={item.invite_code}  className="dropdown-item" onClick={(text) => this.handleClick(text, item.invite_code)}>{item.invite_code}</button>
                                        </div>
                                    </div>

                            <div className="dropdown-menu dropdown-menu-lg-end bg-opacity-50 ">
                                                <button id={item.invite_code}  className="dropdown-item" onClick={(text) => this.handleClick(text, item.invite_code)}>{item.invite_code}</button>
                                            </div>
                        </div>
                        ))}
                </div>
            )
        }
    }
}
export default MyRoom;


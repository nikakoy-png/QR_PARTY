import  React, { Component } from  'react';
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Invite extends Component {
    // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  Inv(link) {
    const API = `http://127.0.0.1:8000/api/room/invite/${link}`;
    console.log(link)
    fetch(API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        }).then(res => res.json())
      window.location.href = '/'
    }

  componentDidMount() {
    let { link } = this.props.params;
    this.Inv(link)

  }

  render() {
    return (
        <h1></h1>
    )
  }
}

export default  withParams(Invite);

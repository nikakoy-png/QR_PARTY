import  React, { Component } from  'react';


class GetCountPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    componentDidMount() {
        this.getCountLike();
    }

    getCountLike() {
        fetch(`http://127.0.0.1:8000/api/room/get_count_user/${this.props.params}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        count: result.count
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    render() {
        return (
            <h4>User: {this.state.count}</h4>
        )
    }
}

export default GetCountPeople;
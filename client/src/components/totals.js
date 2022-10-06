import React, { Component } from "react";
import Card from 'react-bootstrap/Card';

export default class Totals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            total: this.props.total,
            dollar: this.props.dollar
        }
    }

    render() {
        let text;

        if(this.state.dollar) {
            text = <Card.Text>${this.props.total}</Card.Text>
        }
        else {
            text = <Card.Text>{this.props.total} points</Card.Text>
        }

        return(
                <Card border="primary" style={{ width: '18rem', marginTop: '15px' }}>
                    <Card.Body>
                        <Card.Title>{this.state.title}</Card.Title>
                        {text}
                    </Card.Body>
                </Card>
        )
    }
}
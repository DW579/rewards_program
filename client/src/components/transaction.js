import React, { Component } from "react";
import Card from 'react-bootstrap/Card';

export default class Transaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            name: this.props.name,
            total: this.props.total
        }
    }

    render() {
        return (
            <Card border="primary" style={{ width: '18rem', marginTop: '15px' }}>
                <Card.Header>{this.state.date}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                        ${this.state.total}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
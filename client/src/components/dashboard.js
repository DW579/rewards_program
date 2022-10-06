import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: "Dustin"
        }
    }

    handleCustomer(customer) {
        this.setState({
            customer: customer
        })
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary">
                                Select Customer
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.handleCustomer("Dustin")}>Dustin</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleCustomer("Joe")}>Joe</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    {/* Totals */}
                </Row>
                <Row>
                    {/* Sub totals */}
                </Row>
                <Row>
                    {/* Transactions */}
                </Row>
            </Container>
        )
    }
}
import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import data from '../data/data.json';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: "Dustin",
            transactions: []
        }
    }

    componentDidMount() {
        // Simulate an asynchronous API call to fetch data
        const getAllData = () => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve({
                    data: data
                }), Math.random() * 1000)
            })
        }

        getAllData()
            .then(data => {
                let current_customer_transactions = [];

                // Loop through data and only include transactions that are associated to the current customer
                for(const transaction of data.data) {
                    if(transaction.customer === this.state.customer) {
                        current_customer_transactions.push(transaction);
                    }
                }

                // Add the transactions of the current customer to state
                this.setState({
                    transactions: current_customer_transactions
                })
            })

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
                    <Col>Welcome back, {this.state.customer}</Col>
                </Row>
                <Row>
                    {/* Totals */}
                </Row>
                <Row>
                    {/* Sub totals */}
                </Row>
                <Row>
                    <Col>
                        Past 3 months of transactions
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            this.state.transactions.map(transaction => (
                                <div key={transaction.id}>{transaction.name}</div>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}
import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import data from '../data/data.json';

import Transaction from "./transaction";
import Totals from "./totals";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: "Dustin",
            transactions: [],
            dollar_total: 0,
            reward_total: 0,
            reward_oct: 0,
            reward_sept: 0,
            reward_aug: 0
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
                // Initial totals of dollar and points
                const filtered_transactions = data.data.filter(transaction => transaction.customer.includes(this.state.customer));
                const [dollar_total, reward_total, reward_total_oct, reward_total_sept, reward_total_aug] = this.calculateTotals(filtered_transactions);

                this.setState({
                    transactions: data.data,
                    dollar_total: dollar_total,
                    reward_total: reward_total,
                    reward_oct: reward_total_oct,
                    reward_sept: reward_total_sept,
                    reward_aug: reward_total_aug
                })
            })

    }

    calculateTotals(transactions){
        let dollar_total = 0;
        let reward_total = 0;
        let dollar_total_oct = 0;
        let dollar_total_sept = 0;
        let dollar_total_aug = 0;
        let reward_total_oct = 0;
        let reward_total_sept = 0;
        let reward_total_aug = 0;

        // Calculate dollar totals for the past 3 months
        for(const transaction of transactions) {
            const date = new Date(transaction.date);

            if(date.getMonth() === 9) {
                dollar_total_oct += transaction.total;
            }
            if(date.getMonth() === 8) {
                dollar_total_sept += transaction.total;
            }
            if(date.getMonth() === 7) {
                dollar_total_aug += transaction.total;
            }

        }

        dollar_total = dollar_total_oct + dollar_total_sept + dollar_total_aug;

        // Calculate reward totals for the past 3 months
        if(dollar_total_oct >= 50 && dollar_total_oct > 100) {
            reward_total_oct += 50;
            reward_total_oct += (Math.floor(dollar_total_oct) - 100) * 2;
        }

        if(dollar_total_sept >= 50 && dollar_total_sept > 100) {
            reward_total_sept += 50;
            reward_total_sept += (Math.floor(dollar_total_sept) - 100) * 2;
        }

        if(dollar_total_aug >= 50 && dollar_total_aug > 100) {
            reward_total_aug += 50;
            reward_total_aug += (Math.floor(dollar_total_aug) - 100) * 2;
        }

        reward_total = reward_total_oct + reward_total_sept + reward_total_aug;

        return [dollar_total.toFixed(2), reward_total, reward_total_oct, reward_total_sept, reward_total_aug];
    }

    handleCustomer(customer) {
        const filtered_transactions = this.state.transactions.filter(transaction => transaction.customer.includes(customer));
        const [dollar_total, reward_total, reward_total_oct, reward_total_sept, reward_total_aug] = this.calculateTotals(filtered_transactions);

        this.setState({
            customer: customer,
            dollar_total: dollar_total,
            reward_total: reward_total,
            reward_oct: reward_total_oct,
            reward_sept: reward_total_sept,
            reward_aug: reward_total_aug
        })
    }
    
    render() {
        return (
            <Container>
                <Row style={{ marginTop: '30px' }}>
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
                    <Col>
                        <Totals
                            title="3 Month Dollar Total"
                            total={this.state.dollar_total}
                            dollar={true}
                        ></Totals>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Totals
                            title="3 Month Reward Total"
                            total={this.state.reward_total}
                            dollar={false}
                        ></Totals>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Totals
                            title="Oct. Reward Points"
                            total={this.state.reward_oct}
                            dollar={false}
                        ></Totals>
                    </Col>
                    <Col>
                        <Totals
                            title="Sept. Reward Points"
                            total={this.state.reward_sept}
                            dollar={false}
                        ></Totals>
                    </Col>
                    <Col>
                        <Totals
                            title="Aug. Reward Points"
                            total={this.state.reward_aug}
                            dollar={false}
                        ></Totals>
                    </Col>
                </Row>
                <Row style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '18px' }}>
                    <Col>
                        Past 3 months of transactions
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            // Populate transactions that are filtered according to the current customer
                            this.state.transactions.filter(transaction => transaction.customer.includes(this.state.customer)).map(filteredTransaction => (
                                <Transaction
                                    key={filteredTransaction.id}
                                    date={filteredTransaction.date}
                                    name={filteredTransaction.name}
                                    total={filteredTransaction.total}
                                ></Transaction>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}
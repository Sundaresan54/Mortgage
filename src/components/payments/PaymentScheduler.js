import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import axios from 'axios'

import { Icon, Dropdown, Table } from 'semantic-ui-react'
import './style.css'
class PaymentScheduler extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            emi: undefined,
            tenure: undefined
        }
    }


    async componentDidMount() {
        let id = localStorage.getItem("reqID")
        console.log(id, "iiiiiii")
        // let data = localStorage.getItem('searchData1')
        // let a = JSON.parse(data)
        // this.setState({
        //     userData: a
        // })
        const res = await axios.get(`http://localhost:4000/users/${id}`, )
            .then(res => {
                console.log(res.data, "data")
                this.setState({
                    user: res.data
                }, () => console.log(this.state.user, "-------------------"))

                let cal = res.data.expLoan.principle;
                // let finalRate = (cal * 95) / 100;
                let tenure = res.data.expLoan.tenure;
                let interest = res.data.expLoan.interest;
                let i = (interest / (12 * 100))
                let r = 1 + i;

                // console.log(tenure, finalRate, interest, "jjjj")
                let e = Math.pow(r, tenure)
                let finalEmi = e / (e - 1)
                console.log(finalEmi, "uuuuuu")
                let emi = (cal * i * finalEmi)

                console.log(cal, "fina", emi)
                this.setState({
                    emi: emi,
                    tenure: tenure,

                })

                // if (cal) {
                //     for(var i = 1;i <=tenure ; i++){

                //     }
                // }

            })
            .catch(e => {
                throw new Error(e.response.data);
            });




        // localStorage.removeItem("ReqID");
        return res;
    }


    render() {
        // let emiTable = [];
        // // for (var i = 1; i <= this.state.tenure.length; i++) {

        // // }

        return (
            <div>
                <h2>Payment Scheduler</h2>

                <Paper style={{ marginRight: '0px', padding: '15px', width: '97%', height: "fit-content", marginBottom: '10px', marginLeft: '18px' }}>
                    <div className="align">
                        <h3>Payement Scheduler</h3>
                        {
                            this.state.user.expLoan &&
                            <p>
                                Principal amount: £{this.state.user.expLoan.principle}, Tenure: {this.state.user.expLoan.tenure} months and interest:{this.state.user.expLoan.interest}%
                            </p>
                        }

                    </div>

                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>SNo</Table.HeaderCell>
                                <Table.HeaderCell>Month</Table.HeaderCell>
                                <Table.HeaderCell>Payment</Table.HeaderCell>
                                <Table.HeaderCell>Principal</Table.HeaderCell>
                                <Table.HeaderCell>Interest</Table.HeaderCell>
                                <Table.HeaderCell>Unpaid Balance</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>


                        </Table.Body>
                    </Table>
                </Paper>

            </div>

        )
    }

}

export default PaymentScheduler;
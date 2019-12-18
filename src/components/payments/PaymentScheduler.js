import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import axios from 'axios'

import { Icon, Dropdown, Table } from 'semantic-ui-react'
import { Form, FormControl } from 'react-bootstrap'
import './style.css'
class PaymentScheduler extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            emi: undefined,
            tenure: undefined,
            search: '',
            interest: '',
            emiSchedule: []
        }
    }

    searchKey = (e) => {
        console.log("hello", e.target.value)
        let val = e.target.value
        this.setState({
            search: val
        })

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

                let cal = (res.data.expLoan.principle);
                // let finalRate = (cal * 95) / 100;
                let tenure = Number(res.data.expLoan.tenure);
                let interest = Number(res.data.expLoan.interest);
                let intr = Number(interest / (12 * 100))
                let r = 1 + intr;

                // console.log(tenure, finalRate, interest, "jjjj")
                let e = Math.pow(r, tenure)
                let finalEmi = e / (e - 1)
                console.log(typeof finalEmi, "uuuuuu", cal)
                let emi = Math.round(cal * intr * finalEmi)

                console.log(cal, "fina", emi)
                this.setState({
                    emi: emi,
                    tenure: tenure,
                    interest: intr

                })


                let arr = [];
                let date = this.state.user.expLoan.startDate.split('-');
                let day = Number(date[2]);
                // console.log(typeof month)
                let j = 0;
                let outstandingBal = 0;
                console.log("check", outstandingBal, outstandingBal, intr)
                let yr = Number(date[0]);
                console.log()
                let mon = 0;
                if (cal) {
                    for (var i = 0; i < tenure; i++) {



                        let row = {
                            month: '',
                            interest: '',
                            principal: '',
                            outstandingBal: '',
                            emi: ''
                        }
                        if (i === 0) {
                            mon = Number(date[1]);
                            outstandingBal = cal
                            console.log(outstandingBal, "iiiiii")
                        }
                        else {
                            mon = mon + 1;
                        }
                        row.month = day + '-' + mon + '-' + yr;
                        row.emi = emi;




                        let a = (intr * outstandingBal);
                        let b = emi - a;
                        row.interest = Math.round(a);
                        row.principal = Math.round(b);
                        outstandingBal = outstandingBal - (emi - Math.floor(a));
                        outstandingBal = Math.round(outstandingBal);
                        outstandingBal = (outstandingBal < 0) ? 0 : outstandingBal;
                        row.outstandingBal = outstandingBal;
                        // console.log('int:' + Math.round(a), 'prin:' + b, 'outstanding bal: ' + outstandingBal, 'emi : ', a + b, "-----")
                        console.log('EMI :', emi, 'INT:', Math.round(a), 'Prin:', (emi - a), (emi - Math.floor(a)), 'Balance:', outstandingBal);
                        if (mon >= 12) {
                            mon = 0;
                            yr = yr + 1
                        }
                        arr.push(row);
                        j++;
                    }
                    console.log(arr, "date value")
                }
                this.setState({
                    emiSchedule: arr
                })
            })
            .catch(e => {
                throw new Error(e.response.data);
            });

        return res;
    }


    render() {
        // let emiTable = [];
        // // for (var i = 1; i <= this.state.tenure.length; i++) {

        // // }
        console.log(this.state.emiSchedule, "jjj")

        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <h2 className="heading-m">
                        Payment Scheduler
                </h2>
                    <Form inline style={{ marginLeft: '200px' }} >
                        <FormControl type="text" placeholder="Request Number...." className="mr-sm-2"
                            ref={el => this.search = el}
                            onChange={(e) => this.searchKey(e)} defaultValue={this.state.search} style={{ marginLeft: '90px', paddingRight: '35px' }} />
                        <Icon size="large" inverted name='search' className="searchIcon" color='black' link onClick={() => this.fetchKey()} />
                    </Form>
                </div>

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
                                <Table.HeaderCell>Principal</Table.HeaderCell>
                                <Table.HeaderCell>Interest</Table.HeaderCell>
                                <Table.HeaderCell>TotalEmi</Table.HeaderCell>
                                <Table.HeaderCell>OutstandingAmount</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                this.state.emiSchedule && this.state.emiSchedule.map((data, i) => {
                                    return <Table.Row key={i}>
                                        <Table.Cell>{i + 1}</Table.Cell>
                                        <Table.Cell>{data.month}</Table.Cell>
                                        <Table.Cell>{data.principal}</Table.Cell>
                                        <Table.Cell>{data.interest}</Table.Cell>
                                        <Table.Cell>{data.emi}</Table.Cell>
                                        <Table.Cell>{data.outstandingBal}</Table.Cell>
                                    </Table.Row>
                                })
                            }


                        </Table.Body>
                    </Table>
                </Paper>

            </div>

        )
    }

}

export default PaymentScheduler;
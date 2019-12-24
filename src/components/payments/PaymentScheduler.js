import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import axios from 'axios'

import { Icon, Dropdown, Table, Modal, Button } from 'semantic-ui-react'
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
            emiSchedule: [],
            open: false,
            currentData: [],
            paid: false,
            indexValue: -1,

        }
    }

    searchKey = (e) => {
        console.log("hello", e.target.value)
        let val = e.target.value
        this.setState({
            search: val
        })

    }


    close = () => this.setState({ open: false })
    show = (data, i) => {
        this.setState({
            open: true,
            currentData: data,
            indexValue: i
        })

    }
    handleOnChange = (e) => {
        let currentData = { ...this.state.currentData, ctDate: e.target.value }
        this.setState({
            currentData: currentData
        })
    }
    paymentDone() {
        const id = this.state.user.id;
        console.log(this.state.user, "user data current")
        let i = this.state.indexValue
        let property = this.state.user.emiScheduler;
        property[i]["paymentMode"] = this.state.currentData.paymentType;
        property[i]["ctDate"] = this.state.currentData.ctDate;
        this.setState({
            open: false,
            emiSchedule: property,
            user: { ...this.state.user, emiScheduler: property }
        }, () => {
            const res = axios.put(`http://localhost:4000/users/${id}`, this.state.user)
                .then(res => {
                    console.log(res.data, "patched")
                })
                .catch(e => {
                    throw new Error(e.response.data);
                });
            return res;
        })

    }
    paymentMode = (e, { value }) => {
        let currentData = { ...this.state.currentData, paymentType: value }
        this.setState({
            currentData: currentData
        }, () => {
            console.log("adding data", this.state.currentData)

        })
    }

    async fetchKey() {

        if (this.state.search !== '') {
            console.log("inside fetch method")
            const res = await axios.get(`http://localhost:4000/users/${this.state.search}`, )
                .then(res => {
                    console.log(res.data, "data")
                    this.setState({
                        user: res.data
                    }, () => {
                        console.log(res.data, "all dattaaaaa")
                    })
                    let cal = (res.data.expLoan.principle);
                    let tenure = Number(res.data.expLoan.tenure);
                    let interest = Number(res.data.expLoan.interest);
                    let intr = Number(interest / (12 * 100))
                    let r = 1 + intr;
                    let e = Math.pow(r, tenure)
                    let finalEmi = e / (e - 1)
                    let emi = Math.round(cal * intr * finalEmi)
                    this.setState({
                        emi: emi,
                        tenure: tenure,
                        interest: intr

                    })
                    let arr = [];
                    let date = this.state.user.expLoan.startDate.split('-');
                    let day = Number(date[2]);
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
                            console.log(outstandingBal, "before 0")
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
                    }
                    this.setState({
                        emiSchedule: arr
                    })
                    this.search.value = "";
                })
                .catch(e => {
                    window.alert("Invalid request number")
                    this.search.value = "";


                    // throw new Error(e.response.data);
                });
            return res;
        }
        else {
            window.alert("please enter valid Request number")

        }

    }


    render() {
        console.log(typeof this.state.ctDate, "whole")
        const { open } = this.state;
        const payment = [
            {
                key: 'cash',
                text: 'cash',
                value: 'cash'
            },
            {
                key: 'cheque',
                text: 'cheque',
                value: 'cheque'
            },
            {
                key: 'NFFT',
                text: 'NFFT',
                value: 'NFFT'
            },
            {
                key: 'IMPS',
                text: 'IMPS',
                value: 'IMPS'
            },
        ]
        let modal = (
            <div>
                <Modal size='small' open={open} onClose={this.close} closeOnDimmerClick={false} className="modalEdit" style={{ marginTop: '150px', marginLeft: '30%' }} closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}>
                    <Modal.Header>Payment details</Modal.Header>
                    <Modal.Content>
                        <Table striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell> EMI Due Date</Table.HeaderCell>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.HeaderCell>Payment Date</Table.HeaderCell>
                                    <Table.HeaderCell>Payment Mode</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row >

                                    <Table.Cell>{this.state.currentData.month}</Table.Cell>
                                    <Table.Cell>{this.state.currentData.emi}</Table.Cell>
                                    <Table.Cell>
                                        <input type="date"
                                            name="Date" onBlur={(e) => this.handleOnChange(e)}
                                            placeholder="Payment Date"
                                            defaultValue={this.state.currentData.ctDate} />

                                    </Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            onChange={this.paymentMode}
                                            options={payment}
                                            placeholder='select'
                                            selection={true}
                                            defaultValue={this.state.currentData.paymentType}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => this.paymentDone()} style={{ marginRight: '230px', width: '120px', color: "white", backgroundColor: 'green' }}>Done</Button>

                    </Modal.Actions>
                </Modal>
            </div>
        )
        return (
            <div className="head-m" style={{ backgroundColor: '#f5f6fa', paddingBottom: '45px', marginTop: '0px' }}>
                <div style={{ display: 'flex' }}>
                    <h2 className="heading-m">
                        Payment Scheduler
                </h2>
                    <Form inline style={{ marginLeft: '200px' }} >
                        <FormControl type="text" placeholder="Request Number...." className="mr-sm-2"
                            ref={el => this.search = el}
                            onChange={(e) => this.searchKey(e)} defaultValue={this.state.search} style={{ marginLeft: '187px', paddingRight: '35px' }} />
                        <Icon size="large" inverted name='search' className="searchIcon" color='black' link onClick={() => this.fetchKey()} />
                    </Form>
                </div>

                <Paper style={{ marginRight: '0px', padding: '15px', width: '97%', height: "fit-content", marginBottom: '10px', marginLeft: '18px', marginTop: '25px' }}>
                    <div className="align">
                        <h3>Payement Scheduler</h3>
                        {
                            this.state.user.expLoan &&
                            <p>
                                Principal amount: £{this.state.user.expLoan.principle}, Tenure: {this.state.user.expLoan.tenure} months and interest:{this.state.user.expLoan.interest}%
                            </p>
                        }

                    </div>

                    <Table >
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

                        <Table.Body className="tableHover">
                            {
                                this.state.emiSchedule && this.state.emiSchedule.map((data, i) => {
                                    { console.log(this.state.selectedRow === i, "checking.....") }
                                    return <Table.Row className={this.state.user.emiScheduler[i].paymentMode !== undefined ? "tableSelected" : ""} key={i}
                                        style={{
                                            cursor: 'pointer',
                                            textDecoration: 'none'
                                        }} onClick={() => this.show(data, i)}
                                        disabled={this.state.user.emiScheduler[i].paymentMode !== undefined ? true : false} >
                                        <Table.Cell>{i + 1}</Table.Cell>
                                        <Table.Cell >{data.month}</Table.Cell>
                                        <Table.Cell>{data.principal}</Table.Cell>
                                        <Table.Cell>{data.interest}</Table.Cell>
                                        <Table.Cell>{data.emi}</Table.Cell>
                                        <Table.Cell>{data.outstandingBal}</Table.Cell>
                                    </Table.Row>
                                })
                            }


                        </Table.Body>
                    </Table>
                    {modal}
                </Paper>

            </div>

        )
    }

}

export default PaymentScheduler;
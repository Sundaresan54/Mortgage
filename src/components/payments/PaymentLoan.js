import React, { Component } from 'react'
import axios from 'axios'
import { Icon, Dropdown, Table } from 'semantic-ui-react'
import { Data } from '../../config'
class PaymentLoan extends React.Component {
  constructor() {
    super();
    this.state = {
      status: '',
      user: []
    }
  }

  componentDidMount() {

    // console.log(this.state.reqId, "khjkhj.kdjhskdhcskhcskdhjkk")
    const res = axios.get(`${Data.url}/users/`, )
      .then(res => {
        console.log(res.data, "datakdhjskdjhsdjkhsdhjk")
        this.setState({
          user: res.data
        }, () => console.log(this.state.user, "-------------------"))



      })
      .catch(e => {
        throw new Error(e.response.data);
      });

    return res;
  }
  async componentWillReceiveProps(userUpdate) {
    let id = userUpdate.id
    let body = userUpdate;
    const res = await axios.patch(`${Data.url}/users/${id}`, body)
      .then(res => {
        console.log(res.data, "patched")

        // this.setState({
        //   status:
        // })

      })
      .catch(e => {
        throw new Error(e.response.data);
      });





    return res;

  }
  handleStatus = (value, i, user) => {
    console.log(value, i, user)
    let userUpdate = { ...this.state.user[i], status: value }
    console.log(userUpdate, "uhiuhh")
    this.setState({
      status: value,


    }, () => console.log(this.state.status, "ttttt"))

    this.componentWillReceiveProps(userUpdate)

  }

  render() {
    console.log(this.state.status)
    const status = [
      {
        key: 'Pending',
        text: 'Pending',
        value: 'Pending'
      },
      {
        key: 'Approved',
        text: 'Approved',
        value: 'Approved'
      },
      {
        key: 'Other',
        text: 'Other',
        value: 'Other'
      },
    ]
    return (
      <div className="head-m" style={{ backgroundColor: '#f5f6fa', paddingBottom: '45px', marginTop: '0px' }}>
        <h2>Payment Loan</h2>



        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>ReqId</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>PropertyType</Table.HeaderCell>
              <Table.HeaderCell>Princiapl</Table.HeaderCell>
              <Table.HeaderCell>Tenure</Table.HeaderCell>
              <Table.HeaderCell>Intrest</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Documents</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.user && this.state.user.map((user, i) => {
              console.log(user, user.totalProperty[0].file1.name, "file name")
              return <Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.user.fname}</Table.Cell>
                <Table.Cell>{user.expLoans.propertyType}</Table.Cell>
                <Table.Cell>{user.expLoans.principle}</Table.Cell>
                <Table.Cell>{user.expLoans.tenure}</Table.Cell>
                <Table.Cell>{user.expLoans.intrest}</Table.Cell>
                <Table.Cell>{user.expLoans.startDate}</Table.Cell>
                {/* <Table.Cell>{user.status}</Table.Cell> */}
                <Table.Cell>

                  <Dropdown search key={i}
                    onChange={(e, data) => { this.handleStatus(data.value, i, user) }}
                    options={status}
                    placeholder='select'
                    selection={true}
                    defaultValue={user.status ? user.status : ''}
                  />
                </Table.Cell>
                <Table.Cell>
                  {
                    user.totalProperty.map((total, key) => {
                      return (<div>
                        <p key={key}>
                        <a href="javascript:;">{total ? total.file1.name : ''}</a> ,
                        
                      </p>
                      <p>
                      <a href="javascript:;">{total ? total.file2.name : ''}</a>,
                        

                      </p>
                      <p>
                      <a href="javascript:;">{total ? total.file3.name : ''}</a>
                      </p>
                      </div>
                      )
                    })
                  }
                </Table.Cell>
                {/* {console.log(user.totalProperty.map(property => { property }), "tpotal property ......")} */}
              </Table.Row>

            })}

          </Table.Body>
        </Table>
      </div>

    )
  }

}

export default PaymentLoan;
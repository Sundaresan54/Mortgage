import React from 'react';

import { withRouter } from 'react-router'

import { Accordion, Icon, Dropdown, Input, Table } from 'semantic-ui-react'
import { Paper } from '@material-ui/core'
import { Row, Col, Button } from 'react-bootstrap'
import './style.css';

class Mortgage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: false,
            activeIndex: 0,
            sameAddr: false,
            mortgageInfo: {
                fname: '',
                lname: '',
                age: undefined,
                gender: '',
                mobno: '',
                alter1: ''
            },
            expLoan: '',
            asset: [{
                assetType: "",
                assetValue: '',
                doc: ''
            }],
            Address: {
                permanentAddr: {
                    aline1: '',
                    aline2: '',
                    landmark: '',
                    city: '',
                    state: '',
                    country: ''
                },
                currentAddr: {
                    aline1: '',
                    aline2: '',
                    landmark: '',
                    city: '',
                    state: '',
                    country: ''
                }
            },
            finacialDetails: {
                employee: '',
                income: '',
                company: ''
            },



        }

    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleCheckBox() {
        this.setState({
            sameAddr: !this.state.sameAddr
        }
        )
    }
    handleOnChange(e) {
        let mortgageInfo = this.state.mortgageInfo;
        mortgageInfo[e.target.name] = e.target.value
        // if(e.target.name==="email"){
        //     mortgageInfo["emailId"] = e.target.value
        // }
        console.log(mortgageInfo, "hgello")
        console.log("inside");


    }

    handleProceed() {

        this.props.history.push('/preview')

        console.log("preview", this.props);


    }

    handleGender = (e, { value }) => {
        console.log(value);
        this.setState({ gender: value }, () => {
            console.log("gender", this.state.gender)
        })

    }

    addAsset = () => {
        this.setState({ tab: true })

        console.log("icon clicked");
    }
    render() {
        const { activeIndex, value } = this.state
        const options = [
            {
                key: 'Male',
                text: 'Male',
                value: 'Male'
            },
            {
                key: 'Female',
                text: 'Female',
                value: 'female'
            },
            {
                key: 'Other',
                text: 'Other',
                value: 'Other'
            },
        ]
        const employee = [
            {
                key: 'Self Employee',
                text: 'Self Employee',
                value: 'Self Employee'
            },
            {
                key: 'Salried',
                text: 'Salried',
                value: 'Salried'
            }

        ]

        const AssetType = [
            {
                key: 'Gold loan',
                text: 'Gold loan',
                value: 'Gold loan'
            },
            {
                key: 'property against',
                text: 'property against',
                value: 'property against'
            },
            {
                key: ' against',
                text: 'property against',
                value: 'property against'
            }


        ]


        let PermanentData = (
            <div>
                <Row >
                    <Col className="same-row">
                        <div className="name-space">
                            <div className="name-wd" >
                                Address line 1:
        </div >
                            <div className="ui input"><input type="text" name='line1' onChange={(e) => this.handleOnChange(e)} placeholder="Address line 1" /></div>
                        </div>

                        <div className="name-space">
                            <div className="name-wd">
                                Address line 2:
        </div >
                            <div className="ui input"><input type="text" name='line2' onChange={(e) => this.handleOnChange(e)} placeholder="Address line 2" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                LandMark:
        </div >
                            <div className="ui input"><input type="text" name='landmark'
                                onChange={(e) => this.handleOnChange(e)}
                                placeholder="LandMark" /></div>
                        </div>
                    </Col></Row>


                <Row >
                    <Col className="same-row">
                        <div className="name-space">
                            <div className="name-wd" >
                                City:
        </div >
                            <div className="ui input"><input type="text" name="city"
                                onChange={(e) => this.handleOnChange(e)}
                                placeholder="City" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                State:
        </div >
                            <div className="ui input"><input type="text"
                                onChange={(e) => this.handleOnChange(e)}
                                placeholder="State" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                Country:
        </div >
                            <div className="ui input"><input type="text"
                                onChange={(e) => this.handleOnChange(e)}
                                placeholder=" Country" /></div>
                        </div>
                    </Col>
                </Row>
            </div>

        )


        let assetTab = (
            <div style={{ marginTop: '10px' }}>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>AssetType</Table.HeaderCell>
                            <Table.HeaderCell>Asset Value</Table.HeaderCell>
                            <Table.HeaderCell>Document</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>abc</Table.Cell>
                            <Table.Cell>bbbbb</Table.Cell>
                            <Table.Cell>bbbbb</Table.Cell>

                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie Harington</Table.Cell>
                            <Table.Cell>January 11, 2014</Table.Cell>
                            <Table.Cell>bbbbb</Table.Cell>


                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie Harington</Table.Cell>
                            <Table.Cell>January 11, 2014</Table.Cell>
                            <Table.Cell>bbbbb</Table.Cell>


                        </Table.Row>

                    </Table.Body>
                </Table>
            </div>
        )


        return (
            <div className="head-m" style={{ backgroundColor: '#f5f6fa', paddingBottom: '45px' }}>
                <h2 className="heading-m">
                    Welcome to the Mortgages
                </h2>

                <Paper style={{ marginRight: '0px', padding: '15px', width: '97%', height: "fit-content", marginBottom: '10px', marginLeft: '18px' }}>
                    <Accordion styled className="acc-m">
                        <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Enter your personal details
        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>

                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            FirstName:
                            </div >
                                        <div className="ui input"><input type="text" name="fname" onChange={(e) => this.handleOnChange(e)} value={this.state.mortgageInfo.fName} placeholder="firstName" /></div>
                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            LastName:
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="lname" onChange={(e) => this.handleOnChange(e)} value={this.state.mortgageInfo.lName}
                                            placeholder="lastName" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            Age:
                            </div >
                                        <div className="ui input"><input type="number"
                                            name="age" onChange={(e) => this.handleOnChange(e)} value={this.state.mortgageInfo.age}
                                            placeholder="age" /></div>
                                    </div>
                                </Col></Row>

                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            Gender:
                            </div >
                                        <Dropdown
                                            onChange={this.handleGender}
                                            options={options}
                                            placeholder='Choose an option'
                                            selection
                                            value={value}
                                        />

                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            MobileNo:
                            </div >
                                        <div className="ui input"><input type="number"
                                            name="mobileNo" onChange={(e) => this.handleOnChange(e)} value={this.state.mortgageInfo.mobileNo} placeholder=" MobileNo" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            Email:
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="email" onChange={(e) => this.handleOnChange(e)} value={this.state.mortgageInfo.emailId} placeholder=" email" /></div>
                                    </div>
                                </Col>
                            </Row>
                        </Accordion.Content>
                    </Accordion>
                    <Accordion styled className="acc-m">
                        <Accordion.Title
                            active={activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Address
        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <div>
                                <p>
                                    Current Address
                        </p>
                            </div>
                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            Address line 1:
        </div >
                                        <div className="ui input"><input type="text" name='line1' onChange={(e) => this.handleOnChange(e)} value={this.state.Address.currentAddr.aline1} placeholder="Address line 1" /></div>
                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            Address line 2:
        </div >
                                        <div className="ui input"><input type="text" name='line2' onChange={(e) => this.handleOnChange(e)} placeholder="Address line 2" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            LandMark:
        </div >
                                        <div className="ui input"><input type="text" name='landmark'
                                            onChange={(e) => this.handleOnChange(e)}
                                            placeholder="LandMark" /></div>
                                    </div>
                                </Col></Row>


                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            City:
        </div >
                                        <div className="ui input"><input type="text" name="city"
                                            onChange={(e) => this.handleOnChange(e)}
                                            placeholder="City" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            State:
        </div >
                                        <div className="ui input"><input type="text"
                                            onChange={(e) => this.handleOnChange(e)}
                                            placeholder="State" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            Country:
        </div >
                                        <div className="ui input"><input type="text"
                                            onChange={(e) => this.handleOnChange(e)}
                                            placeholder=" Country" /></div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="ui checkbox top-align" >
                                <input type="checkbox" tabIndex="0" onChange={(e) => this.handleOnChange(e)} value={this.state.sameAddr} onChange={() => this.handleCheckBox()} />
                                <label>Permanent address is as same as current address</label>
                            </div>

                            {!this.state.sameAddr && PermanentData}
                        </Accordion.Content>
                    </Accordion>
                    <Accordion styled className="acc-m">
                        <Accordion.Title
                            active={activeIndex === 2}
                            index={2}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Financial Details
        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            Employee:
                            </div >
                                        <Dropdown
                                            placeholder='Select Type'

                                            selection
                                            options={employee}
                                        />
                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            Income:
                            </div >
                                        <div className="ui input"><input type="text" placeholder="Annual Income" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            Company:
                            </div >
                                        <div className="ui input"><input type="text" placeholder="company" /></div>
                                    </div>
                                </Col></Row>
                        </Accordion.Content>
                    </Accordion>

                    <Accordion styled className="acc-m">
                        <Accordion.Title
                            active={activeIndex === 3}
                            index={3}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Property Details:
        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 3}>
                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            AssetType:
                            </div >
                                        <Dropdown
                                            placeholder='Select Type'

                                            selection
                                            options={AssetType}
                                        />
                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            AssetValue:
                            </div >
                                        <div className="ui input"><input type="text"
                                            //  name="AssetValue" onChange = {(e)=>this.handleOnChange(e)}value={this.state.Asset.assetValue}
                                            placeholder=" asset value" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            Doc:(less than 10MB)

                            </div >
                                        <div className="ui input btn-style"><input className="btn-style" style={{ border: '0' }} type="file" name="upload"
                                            //  name="doc" onChange = {(e)=>this.handleOnChange(e)}value={this.state.Asset.doc}
                                            placeholder="upload" accept=".doc,.pdf" /></div>


                                    </div>

                                    <Icon name='add circle' className="ml-auto" style={{ marginTop: '15px' }} size="large" onClick={this.addAsset} />


                                </Col></Row>
                            <Row>
                                <Col>
                                    {this.state.tab && assetTab}
                                </Col>
                            </Row>
                        </Accordion.Content>
                    </Accordion>

                    <Accordion styled className="acc-m">
                        <Accordion.Title
                            active={activeIndex === 4}
                            index={4}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Expected Loan amount
        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 4}>
                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            Principle:
                            </div >
                                        <div className="ui input"><input type="text" placeholder="principle" /></div>

                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            Tenure:
                                            (months)
                            </div >
                                        <div className="ui input"><input type="text" placeholder="Tenure" /></div>
                                    </div>
                                </Col></Row>
                        </Accordion.Content>
                    </Accordion>
                    <Row>
                        <Button className="ml-auto" style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '250px' }} onClick={() => this.handleProceed()}>Proceed</Button>
                    </Row>

                </Paper>
            </div>
        )
    }
}


export default withRouter(Mortgage);
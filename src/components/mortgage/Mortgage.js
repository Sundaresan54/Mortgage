import React from 'react';

import { withRouter } from 'react-router'

import { Accordion, Icon, Dropdown, Input, Table, Radio } from 'semantic-ui-react'
import { Paper } from '@material-ui/core'
import { Row, Col, Button, } from 'react-bootstrap'
import './style.css';

class Mortgage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifLiability: false,
            radio: '',
            tab: false,
            activeIndex: 0,
            sameAddr: false,
            user: {},
            address: {
                currentAddress: {},
                permanentAddress: {}
            },
            annualIncome: '',
            liability: {},
            expLoan: '',
            asset: [{
                assetType: "",
                assetValue: '',
                doc: ''
            }],
            finacialDetails: {

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
        let sameAddr = this.state.user.Address;

        console.log("---->", sameAddr)
        this.setState({
            sameAddr: !this.state.sameAddr
        }
        )

    }
    handleOnChange(e) {
        let user = this.state.user;
        user[e.target.name] = e.target.value
        this.setState({
            user: user
        })
        // if(e.target.name==="email"){
        //     user["emailId"] = e.target.value
        // }this.setState


        console.log(this.state.user, "jgsjhsg", "hgello")
        console.log("inside");


    }

    handleProceed() {

        this.props.history.push('/preview')

        console.log("preview", this.props);


    }

    handleGender = (e, { value }) => {
        console.log(value);
        let details = { ...this.state.user, gender: value }
        console.log(details)
        this.setState({ user: details }, () => {

        })

    }
    handleOccup = (e, { value }) => {
        let details = { ...this.state.user, occupation: value }
        console.log(details)
        this.setState({ user: details }, () => {

        })

    }
    addAsset = () => {
        this.setState({ tab: true })

        console.log("icon clicked");
    }

    handleLiability = (e) => {
        this.setState({
            ifLiability: !this.state.ifLiability
        })
    }

    handleRadio = (e, { value }) => {
        this.setState({
            value,
            radio: value
        }, () => {
            console.log(this.state.radio, "radioooo")
        })

    }
    handleCtAddress = (e) => {

        let addr = { ...this.state.address.currentAddress };
        console.log('Address : ', addr);
        addr[e.target.name] = e.target.value;

        console.log('Address2 : ', addr)
        this.setState({
            address: { ...this.state.address, currentAddress: addr },
            user: { ...this.state.user, Address: { ...this.state.address, currentAddress: addr } }

        }, console.log('---', this.state.address, ">>>>>>>>", this.state.user))
    }
    handlePtAddress = (e) => {

        let addr = { ...this.state.address.permanentAddress };
        addr[e.target.name] = e.target.value;
        this.setState({
            address: { ...this.state.address, permanentAddress: addr },
            user: { ...this.state.user, Address: { ...this.state.address, permanentAddress: addr } }

        }, console.log('---', this.state.address, ">>>>>>>>", this.state.user))



    }
    handleIncome = (e) => {
        this.setState({
            annualIncome: e.target.value
        })
        console.log("annual", this.state.annualIncome)
    }


    handleLiabilityType = (e, { value }) => {
        let data = { ...this.state.liability, liabilityType: value };
        this.setState({
            liability: data
        })

    }
    handleOnLiability = (e) => {
        console.log("........", e.target.value)
        let liability = { ...this.state.liability };
        console.log(liability, "///////////jjjjjj")
        liability[e.target.name] = e.target.value;
        this.setState({
            liability: liability,
            // user: { ...this.state.user, ...this.state.liability,lib}
        })
        console.log(this.state.liability)
    }

    render() {
        const { activeIndex, value } = this.state
        console.log(this.state.user, "fullll")
        console.log(this.state.liability, "liiiii")

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
        const LibType = [
            {
                key: 'Gold loan',
                text: 'Gold loan',
                value: 'Gold loan'
            },
            {
                key: 'property Morgaged',
                text: 'property Morgaged',
                value: 'property Morgaged'
            },
        ]

        let PermanentData = (
            <div>
                <Row >
                    <Col className="same-row">
                        <div className="name-space">
                            <div className="name-wd" >
                                Address line 1:
        </div >
                            <div className="ui input"><input type="text" name='ptline1' onChange={(e) => this.handlePtAddress(e)}
                                value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptline1 : ''}
                                placeholder="Address line 1" /></div>
                        </div>

                        <div className="name-space">
                            <div className="name-wd">
                                Address line 2:
        </div >
                            <div className="ui input"><input type="text" name='ptline2' onChange={(e) => this.handlePtAddress(e)}
                                value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptline2 : ''}
                                placeholder="Address line 2" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                LandMark:
        </div >
                            <div className="ui input"><input type="text" name='ptlandmark'
                                onChange={(e) => this.handlePtAddress(e)}
                                value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptlandmark : ''}
                                placeholder="LandMark" /></div>
                        </div>
                    </Col></Row>


                <Row >
                    <Col className="same-row">
                        <div className="name-space">
                            <div className="name-wd" >
                                City:
        </div >
                            <div className="ui input"><input type="text" name="ptcity"
                                onChange={(e) => this.handlePtAddress(e)}
                                value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptcity : ''}
                                placeholder="City" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                State:
        </div >
                            <div className="ui input"><input type="text"
                                onChange={(e) => this.handlePtAddress(e)}

                                name="ptstate"
                                value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptstate : ''}
                                placeholder="State" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                Country:
        </div >
                            <div className="ui input"><input type="text"
                                onChange={(e) => this.handlePtAddress(e)}
                                name="ptcountry"
                                value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptcountry : ''}
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

        let liability = (
            <div style={{ display: 'flex' }}>
                <div className="name-space">
                    <div className="name-wd" >
                        LiabilityType:
                            </div >
                    <Dropdown style={{ height: '20px' }}
                        placeholder='Select Type'
                        onChange={this.handleLiabilityType}
                        selection
                        options={LibType}
                        value={value}
                    />
                </div>

                <div className="name-space">
                    <div className="name-wd" style={{ marginTop: '-1px' }}>
                        Remaining
                        Value:
                            </div >
                    <div className="ui input" ><input type="text" style={{ height: '38px' }}
                        name="AssetValue"
                        onChange={(e) => this.handleOnLiability(e)}
                        // value={this.state.Asset.assetValue}
                        placeholder=" RemainingValue" /></div>
                </div>
                <div className="name-space">
                    <div className="name-wd" style={{ marginTop: '-1px' }}>
                        Remaining
                        Tenure:
                        (months)
                            </div >
                    <div className="ui input" ><input type="text" style={{ height: '38px' }}
                        name="AssetTenure"
                        onChange={(e) => this.handleOnLiability(e)}
                        // value={this.state.Asset.assetValue}
                        placeholder=" RemainingValue" /></div>


                </div>

                <Icon name='add circle' className="ml-auto" style={{ marginTop: '15px' }} size="large" onClick={this.addAsset} />

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
                                        <div className="ui input"><input type="text" name="fname" onChange={(e) => this.handleOnChange(e)} placeholder="firstName" value={this.state.user.fname && this.state.user.fname} /></div>
                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            LastName:
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="lname" onChange={(e) => this.handleOnChange(e)}
                                            value={this.state.user.lname && this.state.user.lname}
                                            placeholder="lastName" /></div>
                                    </div>


                                    <div className="name-space">
                                        <div className="name-wd">
                                            FatherName:
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="faName" onChange={(e) => this.handleOnChange(e)}
                                            value={this.state.user.faname && this.state.user.faname}
                                            placeholder="Father Name" /></div>
                                    </div>

                                </Col></Row>

                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd">
                                            DOB:
                            </div >
                                        <div className="ui input"><input type="date"
                                            name="age" onBlur={(e) => this.handleOnChange(e)} value={this.state.user.age}

                                            placeholder="age" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            MobileNo:
                            </div >
                                        <div className="ui input"><input type="number"
                                            name="mobileNo" onChange={(e) => this.handleOnChange(e)} value={this.state.user.mobileNo} placeholder=" MobileNo" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            Email:
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="emailId" onChange={(e) => this.handleOnChange(e)} value={this.state.user.emailId} placeholder=" email" /></div>
                                    </div>
                                </Col>
                            </Row>

                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            Gender:
                            </div >
                                        <Dropdown
                                            onChange={this.handleGender}
                                            options={options}
                                            placeholder='select'
                                            selection
                                            value={value}
                                        />

                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            PanNo:
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="panNo:" onChange={(e) => this.handleOnChange(e)} placeholder=" PanNo:"
                                            value={this.state.user.panNo}
                                        /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            AadharNo:
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="AadharNo" onChange={(e) => this.handleOnChange(e)} placeholder=" AadharNo"
                                            value={this.state.user.AadharNo}
                                        /></div>
                                    </div>
                                </Col>
                            </Row>
                            <Row >
                                <Col className="same-row">
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            Occupation:
                            </div >
                                        <Dropdown
                                            onChange={this.handleOccup}
                                            options={employee}
                                            placeholder='Choose an option'
                                            selection
                                            value={value}
                                        />

                                    </div>
                                    <div className="name-space" style={{ marginLeft: '58px' }}>
                                        <div className="name-wd">
                                            Company:
                                            </div >
                                        <div className="ui input" ><input type="text"
                                            name="company:" onChange={(e) => this.handleOnChange(e)} placeholder=" company"
                                            value={this.state.user.company}
                                        />
                                        </div>
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
                                        <div className="ui input"><input type="text" name='line1' onChange={(e) => this.handleCtAddress(e)} value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.line1 : ''} placeholder="Address line 1" /></div>
                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            Address line 2:
        </div >
                                        <div className="ui input"><input type="text" name='line2' onChange={(e) => this.handleCtAddress(e)}
                                            // value={this.state.user.Address.line2}
                                            value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.line2 : ''}
                                            placeholder="Address line 2" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            LandMark:
        </div >
                                        <div className="ui input"><input type="text" name='landmark'
                                            value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.landmark : ''}
                                            // value={this.state.user.Address.landmark}
                                            onChange={(e) => this.handleCtAddress(e)}
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
                                            onChange={(e) => this.handleCtAddress(e)}
                                            value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.city : ''}
                                            // value={this.state.user.Address.city}
                                            placeholder="City" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            State:
        </div >
                                        <div className="ui input"><input type="text"
                                            onChange={(e) => this.handleCtAddress(e)}
                                            value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.state : ''}
                                            // value={this.state.user.Address.state}
                                            name="state"
                                            placeholder="State" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            Country:
        </div >
                                        <div className="ui input"><input type="text"
                                            name="country"
                                            onChange={(e) => this.handleCtAddress(e)}
                                            value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.country : ''}
                                            // value={this.state.user.Address.country}
                                            placeholder=" Country" /></div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="ui checkbox top-align" >
                                <input type="checkbox" tabIndex="0" value={this.state.sameAddr} onChange={() => this.handleCheckBox()} />
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

                                    <div className="name-space" style={{ marginBottom: '15px' }}>
                                        <div className="name-wd">
                                            Income:
                                         </div >
                                        <div className="ui input"><input type="text" placeholder="Annual Income" onChange={(e) => this.handleIncome(e)} /></div>
                                    </div>


                                </Col></Row>
                            <Row>
                                <Col>
                                    <div style={{ display: 'flex' }}>
                                        <div className="ui checkbox top-align" >
                                            <input type="checkbox" tabIndex="0" value={this.state.ifLiability} onChange={() => this.handleLiability()} />
                                            <label>If any Liabilities:</label>
                                        </div>
                                        <div style={{ marginTop: '-5px' }}>
                                            {this.state.ifLiability && <div className="name-space">
                                                <div className="name-wd">
                                                    BankName:
                                         </div >
                                                <div className="ui input"><input type="text" name="bankName"
                                                    onChange={(e) => this.handleOnLiability(e)}
                                                    placeholder="Bank Name" /></div>
                                            </div>}
                                        </div>
                                    </div>



                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: '10px' }}>
                                    {this.state.ifLiability && liability}
                                </Col>
                            </Row>
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
                                    <form className='same-row'>
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
                                                placeholder="upload" accept=".doc,.pdf" multiple /></div>


                                        </div>

                                        <Icon name='add circle' className="ml-auto" style={{ marginTop: '15px' }} size="large" onClick={this.addAsset} />

                                    </form>


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
                                    <div className="name-spaced">
                                        <div className="name-wd" >
                                            Principle:
                            </div >
                                        <div className="ui input"><input type="text" placeholder="principle" /></div>

                                    </div>

                                    <div className="name-spaced">
                                        <div className="name-wd">
                                            Tenure:
                                            (months)
                            </div >
                                        <div className="ui input"><input type="text" placeholder="Tenure" /></div>
                                    </div>
                                    <div className="name-spaced">
                                        <div className="name-wd">
                                            Interest(%):

                            </div >
                                        <div className="ui input"><input type="text" placeholder="Interest" /></div>
                                    </div>
                                    <div >
                                        <Radio
                                            label='flexable'
                                            name='flexable'
                                            value='flexable'
                                            checked={this.state.value === 'flexable'}
                                            onChange={this.handleRadio}
                                            className='radio-space'
                                        />
                                        <Radio
                                            label='fixed'
                                            name='fixed'
                                            value='fixed'
                                            checked={this.state.value === 'fixed'}
                                            onChange={this.handleRadio}
                                        />
                                    </div>


                                </Col>
                            </Row>
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
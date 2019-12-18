import React from 'react';

import { withRouter } from 'react-router'
import { uuid } from 'uuidv4'
import axios from 'axios'
import { Accordion, Icon, Dropdown, Table, Radio, Select, Modal } from 'semantic-ui-react'
import { Paper } from '@material-ui/core'
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import './style.css';

class Mortgage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifLiability: false,
            tabOpen: false,
            radio: '',
            tab: false,
            activeIndex: 0,
            sameAddr: false,
            user: {},
            reqId: '',
            address: {
                currentAddress: {},
                permanentAddress: {}
            },
            annualIncome: '',
            liability: {},
            expLoan: {},
            financial: [],
            property: {},
            upload: {},
            open: false,
            totalProperty: [],
            status: 'pending',
            search: ''

        }

    }


    handleProperty = (e, { value }) => {
        console.log(value);
        let propertyType = { ...this.state.property, propertyType: value }
        console.log(propertyType)
        this.setState({ property: propertyType }, () => {
            console.log(this.state.property)
        })
    }

    handleAssetVAlue = (e) => {
        let value = e.target.value;
        this.setState({
            property: { ...this.state.property, assestValue: value }
        })
    }
    show = () => {
        console.log("hello1212")
        this.setState({ open: true })
        console.log("hello")
    }
    close = () => this.setState({ open: false })
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
    }
    searchKey = (e) => {
        console.log("hello", e.target.value)
        let val = e.target.value
        this.setState({
            search: val
        })

    }

    async handleProceed() {
        const { financial, user, expLoan, totalProperty, annualIncome, radio, status } = this.state;
        let id = `Req${Math.floor(Date.now() / 1000)}`
        // reqId = id;
        let expLoans = { ...expLoan, radio }
        localStorage.setItem("ReqId", id);
        let body = { user, annualIncome, financial, expLoans, totalProperty, id, status }
        const res = await axios.post("http://localhost:4000/users/", body, )
            .then(res => {
                console.log(res.data, "data")
                return res.data

            })
            .catch(e => {
                throw new Error(e.response.data);
            });

        this.props.history.push('/preview', id)

        console.log("preview", this.props);

        return res;
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
        this.setState({
            tab: true, open: false,
            property: { ...this.state.property, uploadDoc: this.state.upload }

        })

        let property = this.state.totalProperty;
        property.push({ ...this.state.property });
        console.log('-----', property)
        this.propValue.value = "";
        this.setState({
            totalProperty: property,
            property: {},
            tab: true
        }, () => {
            console.log("icon clicked", this.state.totalProperty);
        })
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
            //  user: { ...this.state.user, ...this.state.liability}
        })

    }

    addLiability = () => {

        let financial = this.state.financial
        financial.push({ ...this.state.liability });
        console.log('-----', financial)
        this.inputTitle.value = "";
        this.inputTenure.value = "";
        // this.inputType.selected = false;
        this.inputBank.value = "";

        this.setState({
            financial: financial,
            liability: {},
            tabOpen: true
        })

        console.log("..........", this.state.financial)
    }

    handleLoan = (e) => {
        let expLoan = this.state.expLoan
        expLoan[e.target.name] = e.target.value;
        this.setState({
            expLoan: expLoan
        })
        console.log(",.,.,.,.,.,.,.", this.state.expLoan)
    }

    handleUpload = (e) => {
        let property = { ...this.state.property }
        let file1 = {}
        file1["name"] = e.target.files[0].name;
        file1["size"] = e.target.files[0].size;
        file1["type"] = e.target.files[0].type;
        console.log(file1, "inside")
        this.setState({
            upload: { ...this.state.upload, file1: file1 },
            property: { ...property, ...this.state.upload, file1: file1 }
        })
    }
    handleDoc1 = (e) => {
        let property = { ...this.state.property }
        let file2 = {}
        file2["name"] = e.target.files[0].name;
        file2["size"] = e.target.files[0].size;
        file2["type"] = e.target.files[0].type;
        this.setState({
            upload: { ...this.state.upload, file2: file2 },
            property: { ...property, ...this.state.upload, file2: file2 }

        })
    }
    handleDoc2 = (e) => {
        let property = { ...this.state.property }
        let file3 = {}
        file3["name"] = e.target.files[0].name;
        file3["size"] = e.target.files[0].size;
        file3["type"] = e.target.files[0].type;
        this.setState({
            upload: { ...this.state.upload, file3: file3 },
            property: { ...property, ...this.state.upload, file3: file3 }

        })
    }

    render() {
        const { activeIndex, value, open } = this.state
        console.log(this.state.user, "user");
        console.log(this.state.liability, "liability");
        console.log(this.state.expLoan, "exploan")
        console.log(this.state.totalProperty, "totalProperty")
        console.log(this.state.financial, "financial")

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
        let lib = (

            <div style={{ marginTop: '10px' }}>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>BankName</Table.HeaderCell>
                            <Table.HeaderCell>liabilityType</Table.HeaderCell>
                            <Table.HeaderCell>RemaningValue</Table.HeaderCell>
                            <Table.HeaderCell>RemaningTenure</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.financial.map((financial, i) => {
                            return < Table.Row key={i} >
                                <Table.Cell>{financial.bankName}</Table.Cell>
                                <Table.Cell>{financial.liabilityType}</Table.Cell>
                                <Table.Cell> £ {financial.AssetValue}</Table.Cell>
                                <Table.Cell>{financial.AssetTenure}</Table.Cell>


                            </Table.Row>

                        })
                        }



                    </Table.Body>
                </Table>
            </div>

        )
        let modal = (
            <div >
                <Modal size='tiny' open={open} onClose={this.close} closeOnDimmerClick={false} className="modalEdit" style={{ marginTop: '150px', marginLeft: '30%' }} closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}>
                    <Modal.Header>Please Upload Required Document</Modal.Header>
                    <Modal.Content>
                        <div className="name-space">
                            <div className="name-wd" >
                                MorgagedDoc:
                            </div >
                            <div className="ui input"><input type="file" name="morgageDoc" style={{ border: '0px', marginLeft: '12px' }}
                                onChange={(e) => this.handleUpload(e)}

                            /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                Document2:
                            </div >
                            <div className="ui input"><input type="file" name="document2" style={{ border: '0px', marginLeft: '25px' }}
                                onChange={(e) => this.handleDoc1(e)}

                            /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                Document3:
                            </div >
                            <div className="ui input"><input type="file" name="document3" style={{ border: '0px', marginLeft: '25px' }}
                                onChange={(e) => this.handleDoc2(e)}

                            /></div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => this.addAsset()} style={{ marginRight: '230px', width: '120px' }}>Done</Button>

                    </Modal.Actions>
                </Modal>
            </div>
        )
        let PermanentData = (
            <div>
                <Row >
                    <Col className="same-row">
                        <div className="name-space">
                            <div className="name-wd" >
                                Address line 1:
        </div >
                            <div className="ui input"><input type="text" name='ptline1' onChange={(e) => this.handlePtAddress(e)}
                                // value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptline1 : ''}
                                placeholder="Address line 1" /></div>
                        </div>

                        <div className="name-space">
                            <div className="name-wd">
                                Address line 2:
        </div >
                            <div className="ui input"><input type="text" name='ptline2' onChange={(e) => this.handlePtAddress(e)}
                                // value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptline2 : ''}
                                placeholder="Address line 2" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                LandMark:
        </div >
                            <div className="ui input"><input type="text" name='ptlandmark'
                                onChange={(e) => this.handlePtAddress(e)}
                                // value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptlandmark : ''}
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
                                // value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptcity : ''}
                                placeholder="City" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                State:
        </div >
                            <div className="ui input"><input type="text"
                                onChange={(e) => this.handlePtAddress(e)}
                                name="ptstate"
                                // value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptstate : ''}
                                placeholder="State" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                Country:
        </div >
                            <div className="ui input"><input type="text"
                                onChange={(e) => this.handlePtAddress(e)}
                                name="ptcountry"
                                // value={(this.state.user.address && this.state.user.address.permanentAddress) ? this.state.user.address.permanentAddress.ptcountry : ''}
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
                            <Table.HeaderCell>AssetValue</Table.HeaderCell>
                            <Table.HeaderCell>Document</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.totalProperty.map((property, i) => {

                            return < Table.Row key={i} >
                                <Table.Cell>{property.propertyType}</Table.Cell>
                                <Table.Cell> £ {property.assestValue}</Table.Cell>
                                <Table.Cell> {property.file1 ? property.file1.name + "," : ' '}{' '}{property.file2 ? property.file2.name + "," : ' '}{' '}{property.file3 ? property.file3.name : ' '}</Table.Cell>
                            </Table.Row>

                        })
                        }
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
                    <Select style={{ height: '20px' }}
                        clearable={true}
                        placeholder='Select Type'
                        ref={el => this.inputType = el}
                        onChange={this.handleLiabilityType}
                        selection
                        options={LibType}
                        value={this.state.liability.liabilityType}
                    />
                </div>

                <div className="name-space">
                    <div className="name-wd" style={{ marginTop: '-1px' }}>
                        Remaining
                        Value:
                            </div >
                    <div className="ui input" ><input type="text" style={{ height: '38px' }}
                        ref={el => this.inputTitle = el}
                        name="AssetValue"
                        onChange={(e) => this.handleOnLiability(e)}
                        value={this.state.liability.AssetValue}
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
                        ref={el => this.inputTenure = el}
                        onChange={(e) => this.handleOnLiability(e)}
                        value={this.state.liability.AssetTenure}
                        placeholder=" RemainingValue" /></div>


                </div>

                <Icon name='add circle' className="ml-auto" style={{ marginTop: '15px' }} size="large" onClick={this.addLiability} />

            </div>
        )


        return (
            <div className="head-m" style={{ backgroundColor: '#f5f6fa', paddingBottom: '45px' }}>
                <div style={{ display: 'flex' }}>
                    <h2 className="heading-m">
                        Welcome to the Mortgages
                </h2>
                    <Form inline style={{ marginLeft: '200px' }} >
                        <FormControl type="text" placeholder="Request Number...." className="mr-sm-2"
                            ref={el => this.search = el}
                            onChange={(e) => this.searchKey(e)} defaultValue={this.state.search} style={{ marginLeft: '90px', paddingRight: '35px' }} />
                        <Icon size="large" inverted name='search' className="searchIcon" color='black' link onClick={() => this.fetchKey()} />
                    </Form>
                </div>


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
                                            selection={true}
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
                                    <div className="name-space" style={{ marginLeft: '40px' }}>
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
                                        <div className="ui input"><input type="text" name='line1' onChange={(e) => this.handleCtAddress(e)}
                                            // value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.line1 : ''}
                                            placeholder="Address line 1" /></div>
                                    </div>

                                    <div className="name-space">
                                        <div className="name-wd">
                                            Address line 2:
        </div >
                                        <div className="ui input"><input type="text" name='line2' onChange={(e) => this.handleCtAddress(e)}
                                            // value={this.state.user.Address.line2}
                                            // value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.line2 : ''}
                                            placeholder="Address line 2" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd">
                                            LandMark:
        </div >
                                        <div className="ui input"><input type="text" name='landmark'
                                            // value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.landmark : ''}
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
                                            // value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.city : ''}
                                            // value={this.state.user.Address.city}
                                            placeholder="City" /></div>
                                    </div>
                                    <div className="name-space">
                                        <div className="name-wd" >
                                            State:
        </div >
                                        <div className="ui input"><input type="text"
                                            onChange={(e) => this.handleCtAddress(e)}
                                            // value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.state : ''}
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
                                            // value={(this.state.user.address && this.state.user.address.currentAddress) ? this.state.user.address.currentAddress.country : ''}
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
                                                    ref={el => this.inputBank = el}
                                                    value={this.state.liability.bankName}
                                                    placeholder="Bank Name" /></div>
                                            </div>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: '10px' }}>
                                    {this.state.ifLiability && liability}
                                    {this.state.tabOpen && lib}
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
                                                onChange={this.handleProperty}
                                                selection
                                                options={AssetType}
                                                value={value}
                                            />
                                        </div>

                                        <div className="name-space">
                                            <div className="name-wd">
                                                AssetValue:
                            </div >
                                            <div className="ui input"><input type="text"
                                                ref={el => this.propValue = el}
                                                name="AssetValue" onChange={(e) => this.handleAssetVAlue(e)}
                                                placeholder=" asset value" /></div>
                                        </div>
                                        <div>
                                            <Button className="ml-auto" style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '100px', marginTop: '10px' }} onClick={() => this.show()}>Upload Document</Button>
                                            {modal}
                                        </div>
                                        {/* <Icon name='add circle' className="ml-auto" style={{ marginTop: '15px' }} size="large" onClick={this.addAsset} /> */}

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
                                        <div className="ui input"><input type="text" placeholder="principle"
                                            name="principle"
                                            value={this.state.expLoan.principle}
                                            onChange={(e) => { this.handleLoan(e) }}
                                        /></div>

                                    </div>

                                    <div className="name-spaced">
                                        <div className="name-wd">
                                            Tenure:
                                            (months)
                            </div >
                                        <div className="ui input"><input type="text"
                                            name="tenure"
                                            value={this.state.expLoan.tenure}
                                            onChange={(e) => { this.handleLoan(e) }}
                                            placeholder="Tenure" /></div>
                                    </div>
                                    <div className="name-spaced">
                                        <div className="name-wd">
                                            Intrest(%):

                            </div >
                                        <div className="ui input"><input type="text" placeholder="Intrest"
                                            name="intrest"
                                            value={this.state.expLoan.intrest}
                                            onChange={(e) => { this.handleLoan(e) }} /></div>
                                    </div>
                                    <div >
                                        <Radio
                                            label='flexible'
                                            name='flexible'
                                            value='flexible'
                                            checked={this.state.value === 'flexible'}
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

                        <Button className="ml-auto" style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '-70%' }} onClick={() => this.handleProceed()}>Save</Button>
                        <Button className="ml-auto" style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '250px' }} onClick={() => this.handleProceed()}>Proceed</Button>
                    </Row>

                </Paper>
            </div>
        )
    }
}


export default withRouter(Mortgage);

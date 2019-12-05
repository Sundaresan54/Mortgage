import React from 'react';
import { Accordion, Icon, Dropdown } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import './style.css';
export default class Mortgage extends React.Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
            sameAddr: false,


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

    render() {
        const { activeIndex } = this.state
        const friendOptions = [
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
                            <div class="ui input"><input type="text" placeholder="Address line 1" /></div>
                        </div>

                        <div className="name-space">
                            <div className="name-wd">
                                Address line 2:
        </div >
                            <div class="ui input"><input type="text" placeholder="Address line 2" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                LandMark:
        </div >
                            <div class="ui input"><input type="text" placeholder="LandMark" /></div>
                        </div>
                    </Col></Row>


                <Row >
                    <Col className="same-row">
                        <div className="name-space">
                            <div className="name-wd" >
                                City:
        </div >
                            <div class="ui input"><input type="email" placeholder="City" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                State:
        </div >
                            <div class="ui input"><input type="email" placeholder="State" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                Country:
        </div >
                            <div class="ui input"><input type="text" placeholder=" Country" /></div>
                        </div>
                    </Col>
                </Row>
            </div>

        )



        return (
            <div>
                <h2>
                    Welcome to the Mortgages
                </h2>
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
                                    <div class="ui input"><input type="text" placeholder="firstName" /></div>
                                </div>

                                <div className="name-space">
                                    <div className="name-wd">
                                        LastName:
                            </div >
                                    <div class="ui input"><input type="text" placeholder="lastName" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        Age:
                            </div >
                                    <div class="ui input"><input type="text" placeholder="age" /></div>
                                </div>
                            </Col></Row>


                        <Row >
                            <Col className="same-row">
                                <div className="name-space">
                                    <div className="name-wd" >
                                        Email:
                            </div >
                                    <div class="ui input"><input type="email" placeholder="email" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd" >
                                        Gender:
                            </div >
                                    <Dropdown
                                        placeholder='Select gender'

                                        selection
                                        options={friendOptions}
                                    />
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        MobileNo:
                            </div >
                                    <div class="ui input"><input type="number" placeholder=" MobileNo" /></div>
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
                                    <div class="ui input"><input type="text" placeholder="Address line 1" /></div>
                                </div>

                                <div className="name-space">
                                    <div className="name-wd">
                                        Address line 2:
                            </div >
                                    <div class="ui input"><input type="text" placeholder="Address line 2" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        LandMark:
                            </div >
                                    <div class="ui input"><input type="text" placeholder="LandMark" /></div>
                                </div>
                            </Col></Row>


                        <Row >
                            <Col className="same-row">
                                <div className="name-space">
                                    <div className="name-wd" >
                                        City:
                            </div >
                                    <div class="ui input"><input type="email" placeholder="City" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd" >
                                        State:
                            </div >
                                    <div class="ui input"><input type="email" placeholder="State" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        Country:
                            </div >
                                    <div class="ui input"><input type="text" placeholder=" Country" /></div>
                                </div>
                            </Col>
                        </Row>
                        <div className="ui checkbox">
                            <input type="checkbox" readonly="" tabindex="0" value={this.state.sameAddr} onChange={() => this.handleCheckBox()} />
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
                                    <div class="ui input"><input type="text" placeholder="Annual Income" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        Organisation:
                            </div >
                                    <div class="ui input"><input type="text" placeholder="Organisation" /></div>
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
                                        AssetType
                            </div >
                                    <Dropdown
                                        placeholder='Select Type'

                                        selection
                                        options={AssetType}
                                    />
                                </div>

                                <div className="name-space">
                                    <div className="name-wd">
                                        Asset Value:
                            </div >
                                    <div class="ui input"><input type="text" placeholder=" asset value" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        asset Doc:
                            </div >
                                    <div class="ui input"><input type="file" placeholder="upload" accept=".doc,.pdf" /></div>
                                </div>
                            </Col></Row>
                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}
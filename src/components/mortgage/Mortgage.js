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
            mortgageInfo:{
                fname:'',
                lname:'',
                age: undefined,
                gender:'',
                mobno:'',
                alter1:''
            },
            expLoan:'',
            asset:[{
                assetType:"",
                assetValue:'',
                doc:''
            }],
            Address:{
                permanentAddr:{
                    aline1:'',
                    aline2:'',
                    landmark:'',
                    city:'',
                    state:'',
                    country:''
                },
                currentAddr:{
                    aline1:'',
                    aline2:'',
                    landmark:'',
                    city:'',
                    state:'',
                    country:''
                }
            },
            finacialDetails:{
                employee:'',
                income:'',
                company:''
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
        let mortgageInfo =this.state.mortgageInfo;
        mortgageInfo[e.target.name] = e.target.value
        if(e.target.name==="email"){
            mortgageInfo["emailId"] = e.target.value
        }
        console.log(mortgageInfo,"hgello")
        console.log("inside");

        
    }
    // handleGender({value},event){
    //     // console.log(value,"dropdown")
    //     // let bird_name = event;
    // console.log(event,"dropppppp");
    // }

     handleGender = (e, { value }) => {
         console.log(value);
        this.setState({ gender:value },()=>{
            console.log("gender",this.state.gender)
        })
        
     }
    render() {
        const { activeIndex,value } = this.state
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
                            <div className="ui input"><input type="text"name='line1' onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.permanentAddr.aline1} placeholder="Address line 1" /></div>
                        </div>

                        <div className="name-space">
                            <div className="name-wd">
                                Address line 2:
        </div >
                            <div className="ui input"><input type="text" name='line2' onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.permanentAddr.aline2}  placeholder="Address line 2" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                LandMark:
        </div >
                            <div className="ui input"><input type="text" name='landmark'
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.permanentAddr.landmark}
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
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.permanentAddr.city}
                            placeholder="City" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                State:
        </div >
                            <div className="ui input"><input type="text"
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.permanentAddr.state}
                            placeholder="State" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                Country:
        </div >
                            <div className="ui input"><input type="text"
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.permanentAddr.country}
                            placeholder=" Country" /></div>
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
                                    <div className="ui input"><input type="text" name="fname" onChange = {(e)=>this.handleOnChange(e)}value={this.state.mortgageInfo.fName} placeholder="firstName" /></div>
                                </div>

                                <div className="name-space">
                                    <div className="name-wd">
                                        LastName:
                            </div >
                                    <div className="ui input"><input type="text" 
                                    name="lname" onChange = {(e)=>this.handleOnChange(e)}value={this.state.mortgageInfo.lName}
                                    placeholder="lastName" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        Age:
                            </div >
                                    <div className="ui input"><input type="number"
                                    name="age" onChange = {(e)=>this.handleOnChange(e)} value={this.state.mortgageInfo.age}
                                    placeholder="age" /></div>
                                </div>
                            </Col></Row>

                        <Row >
                            <Col className="same-row">
                                {/* <div className="name-space">
                                    <div className="name-wd" >
                                        Email:
                            </div >
                            <div className="ui input"><input type="text"
                                     name="email"
                                     onChange = {(e)=>this.handleOnChange(e)} 
                                     value = {this.state.mortgageInfo.emailId}
                                    placeholder="email" />
                                    </div>
                                   
                                </div> */}
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
                                    name="mobileNo" onChange = {(e)=>this.handleOnChange(e)}value={this.state.mortgageInfo.mobileNo} placeholder=" MobileNo" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        Email:
                            </div >
                                    <div className="ui input"><input type="text"
                                    name="alter1" onChange = {(e)=>this.handleOnChange(e)}value={this.state.mortgageInfo.alter1} placeholder=" email" /></div>
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
                            <div className="ui input"><input type="text"name='line1' onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.currentAddr.aline1} placeholder="Address line 1" /></div>
                        </div>

                        <div className="name-space">
                            <div className="name-wd">
                                Address line 2:
        </div >
                            <div className="ui input"><input type="text" name='line2' onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.currentAddr.aline2}  placeholder="Address line 2" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                LandMark:
        </div >
                            <div className="ui input"><input type="text" name='landmark'
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.currentAddr.landmark}
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
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.currentAddr.city}
                            placeholder="City" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd" >
                                State:
        </div >
                            <div className="ui input"><input type="text"
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.currentAddr.state}
                            placeholder="State" /></div>
                        </div>
                        <div className="name-space">
                            <div className="name-wd">
                                Country:
        </div >
                            <div className="ui input"><input type="text"
                             onChange = {(e)=>this.handleOnChange(e)}value={this.state.Address.currentAddr.country}
                            placeholder=" Country" /></div>
                        </div>
                    </Col>
                </Row>
                        <div className="ui checkbox">
                            <input type="checkbox" readonly="" tabindex="0" onChange = {(e)=>this.handleOnChange(e)}value={this.state.sameAddr} onChange={() => this.handleCheckBox()} />
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
                                        Organisation:
                            </div >
                                    <div className="ui input"><input type="text" placeholder="Organisation" /></div>
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
                                    <div className="ui input"><input type="text"
                                    //  name="AssetValue" onChange = {(e)=>this.handleOnChange(e)}value={this.state.Asset.assetValue}
                                    placeholder=" asset value" /></div>
                                </div>
                                <div className="name-space">
                                    <div className="name-wd">
                                        asset Doc:
                            </div >
                                    <div className="ui input"><input type="file"
                                    //  name="doc" onChange = {(e)=>this.handleOnChange(e)}value={this.state.Asset.doc}
                                    placeholder="upload" accept=".doc,.pdf" /></div>
                                </div>
                            </Col></Row>
                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}
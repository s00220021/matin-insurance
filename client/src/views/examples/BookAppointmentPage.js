import React from "react";

// reactstrap components
import {
    Col, Container, Row, Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Button,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import {newAppointment} from "../../actions/appointmentActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import history from "../../history";



class BookAppointmentPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
            loading: false,
            is_confirm_modal_open: false,
            description: "",
            first_name: (this.props.user.name)?this.props.user.name.split(" ")[0]: "",
            last_name: (this.props.user.name && this.props.user.name.split(" ")[1])?this.props.user.name.split(" ")[1]: "",
            email: this.props.user.email,
            selectedDate: ""
        }
        this.onChange = this.onChange.bind(this);

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    }

    componentDidMount() {
        document.addEventListener('book_appointment', e=> {
            this.setState({loading: false})
            if(e.detail.success){
                //SAOUD
                //a changer le redirect
                history.push('/video/list')
            }else{
                this.showSnackBar("Please make sure to enter all information");
                this.setState({error : true});
            }
        }, false);
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectedDate(date) {
        this.setState({selectedDate: date});
    }

    isValidInput(){
        

        if(this.state.first_name.length <= 0 || this.state.last_name.length <= 0  || 
            this.state.email.length <= 0  || this.state.selectedDate.length <= 0 )
        {
          return {message : "Please make sure to enter all fields"}
        }

        return true;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const isValid = this.isValidInput();
        if(typeof (isValid) === "object")
            return this.showSnackBar(isValid.message);
        this.setState({error: '', loading: true})
        this.props.newAppointment(this.state, this.props.user.id)
    }

    showSnackBar(message){
        const x = document.getElementById("snackbar");
        x.className = "show";

        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
        this.setState({snackbar_message: message})
    }


    render() {

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);


        const isWeekday = date => {
            const day = date.getDay();
            return day !== 0 && day !== 6;
        };

        const CustomDate = ({ value, onClick }) => (
            <>
                <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="fas fa-calendar-day"/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Select a date" value={value} onChange={this.onChange} onClick={onClick}/>
                </InputGroup>
            </>
        );
        const {error} = false;
      
        return (
            <>


                <MainHeader/>
                <Container className="mt-4" fluid>

                    <Row>
                        <Col xl="5" id="title_book_appointment">
                            <p id="title_p">Book Appointment
                            </p><br/>
                            <p id="subtitle_p"><em>Meet with Matin Tireh Dast</em></p>

                        </Col>
                        <Col xl="7">
                            <Form className="m-5" onSubmit={this.onSubmit}>
                                <h1 className="ml--3 mb-3">Information</h1>
                                <FormGroup className="mb-0">
                                    <Row>
                                        <Col xl="6">
                                            <InputGroup className="input-group-alternative mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="far fa-id-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="First Name"  type="text" name="first_name" defaultValue={(this.props.user.name)?this.props.user.name.split(" ")[0]: ""}
                                                       onChange={this.onChange}/>
                                            </InputGroup>
                                        </Col>
                                        <Col xl="6">
                                            <InputGroup className="input-group-alternative mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fas fa-id-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Last Name" defaultValue={(this.props.user.name && this.props.user.name.split(" ")[1])?this.props.user.name.split(" ")[1]: ""} type="text" name="last_name"
                                                       onChange={this.onChange}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-envelope"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email address" defaultValue={(this.props.user.email)} type="email" name="email"
                                               onChange={this.onChange}/>
                                    </InputGroup>
                                    <Row>
                                        <label for="insurance-types"><h3 className="mt-2 ml-2">Choose a type of service </h3></label>
                                    </Row>
                                    <Row>
                                    <select name="cars" id="insurance-types" className="input-group-alternative ml-3 border-white form-control">
                                        <option value="TFSA">TFSA</option>
                                        <option value="RRSP">RRSP</option>
                                        <option value="Savings">Savings</option>
                                        <option value="Loans">Loans</option>
                                    </select>
                                    
                                    </Row>
                                    <Row>
                                        <h3 className="mt-2 ml-2">Choose a date and a time interval</h3>
                                    </Row>
                                    <Row>
                                        <Col md="8">
                                                <DatePicker
                                                    selected={this.state.selectedDate}
                                                    onChange={date => this.onSelectedDate(date)}
                                                    timeFormat="p"
                                                    className="full-width"
                                                    showTimeSelect
                                                    customInput={<CustomDate/>}
                                                    minDate={tomorrow}
                                                    placeholderText="dd/mm/yyyy"
                                                    filterDate={isWeekday}
                                                    timeIntervals={30}
                                                    dateFormat="Pp"
                                                    disabledKeyboardNavigation
                                                    minTime={setHours(setMinutes(new Date(), 0), 7)}
                                                    maxTime={setHours(setMinutes(new Date(), 30), 20)}
                                                />
                                        </Col>

                                    </Row>
                                </FormGroup>
                                <div className=" mt-3">
                                <p style={{color: 'red', fontSize: 14}}>{this.state.error}</p>
                                    <Button color="primary"
                                            type="submit"
                                            className="mt-2 center"
                                    >
                                        {
                                            this.state.loading ?
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                "Book appointment"
                                        }
                                    </Button>
                                </div>
                                
                            </Form>

                        </Col>
                    </Row>

                </Container>
                <div id="snackbar">{this.state.snackbar_message}</div>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appointment: state.appointments.appointment,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {newAppointment})(BookAppointmentPage);

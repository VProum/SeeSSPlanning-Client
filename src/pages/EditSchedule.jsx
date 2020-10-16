import React, { Component } from 'react'
import FormEditSchedule from '../components/Forms/FormEditSchedule'
import { withUser } from "../components/Auth/withUser";


class EditSchedule extends Component {
    state = {
     hourDay: null,
     duration: 3,
     weekday: "",
    }

    handleAdd = (schedule) => {
        console.log("Schedule ", schedule);
        // this.setState({

        // });
    };

    render() {
        return (
            <div>
                <h1>POUE POTER</h1>
                <FormEditSchedule addSchedule={this.handleAdd}/>
            </div>
        )
    }
}

export default withUser(EditSchedule);

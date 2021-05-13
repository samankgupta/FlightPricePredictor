import React from "react";
import DjangoCSRFToken from 'django-react-csrftoken'

class PricePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Prediction: "",
            is_weekend: false
        }
    }

    datehandler = event => {
        event.preventDefault()
        const { value } = event.target;
        var date = new Date(Date.parse(value));
        if (date.getDay() === 6 || date.getDay() === 0) {
            this.setState({ is_weekend: true })
        }
        else {
            this.setState({ is_weekend: false })
        }
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:8000/predict/');
            const Prediction = await res.json();
            this.setState({
                Prediction:""
            });
            console.log(Prediction);
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="container">
                <form method="post">
                    <DjangoCSRFToken/>
                    <h2>Departure</h2>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" for="Dep_Hr" >Departure Time</label>
                        <div className="col-sm-10">
                            <input id="Dep_Hr" className="form-control" type="time" name="Dep_time" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="Journey_Month" >Journey_date</label>
                        <input id="Journey_Month" className="form-control" onChange={this.datehandler} type="date" name="Journey_date" />
                    </div>
                    <h2>Arrival</h2>
                    <div className="form-group">
                        <label for="Arrival_time" >Arrival Time</label>
                        <input id="Arrival_time" className="form-control" type="time" name="Arrival_time" />
                    </div>
                    <input type="hidden" name="is_weekend" value={this.state.is_weekend} />
                    <div className="form-group">
                        <label for="duration_hr" >duration_hr</label>
                        <input id="duration_hr" className="form-control" type="number" name="duration_hr" />
                    </div>

                    <label for="dest" >Destination</label>
                    <select class="form-control" id="dest" name="dest">
                        <option value="Dest_Cochin">Cochin</option>
                        <option value="Dest_Delhi">Delhi</option>
                        <option value="Dest_New_Delhi">New_Delhi</option>
                        <option value="Dest_Hyderabad">Hyderabad</option>
                        <option value="Dest_Kolkata">Kolkata</option>
                    </select>
                    <label for="source" >Source</label>
                    <select class="form-control" id="source" name="source">
                        <option value="Source_Chennai">Chennai</option>
                        <option value="Source_Delhi">Delhi</option>
                        <option value="Source_Kolkata">Kolkata</option>
                        <option value="Source_Mumbai">Mumbai</option>
                    </select>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" for="Total_Stops" >Total_Stops</label>
                        <div className="col-sm-10">
                            <input id="Total_Stops" className="form-control" type="number" name="Total_Stops" />
                        </div>
                    </div>
                    <select class="form-control" id="flight" name="flight">
                        <option value="Air India">Air India</option>
                        <option value="GoAir">GoAir</option>
                        <option value="IndiGo">IndiGo</option>
                        <option value="Jet Airways">Jet Airways</option>
                        <option value="Jet Airways Business">Jet Airways Business</option>
                        <option value="Multiple carriers">Multiple carriers</option>
                        <option value="Premium economy">Premium economy</option>
                        <option value="SpiceJet">SpiceJet</option>
                        <option value="Trujet">Trujet</option>
                        <option value="Vistara">Vistara</option>
                        <option value="Vistara Premium economy">Vistara Premium economy</option>
                    </select>
                    <input type="submit" className="btn btn-primary" name="submit"></input>
                </form>


                <div>
                    <label >Result:</label>
                    <span>{this.state.Prediction}</span>
                </div>
            </div>
        )
    }
}

export default PricePage;

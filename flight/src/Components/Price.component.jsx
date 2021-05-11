import React from "react";


const PricePage = () => (
    <div className="container">
        <form action="http://localhost:8000/predict/">
            <h2>Departure</h2>
            <div className="form-group row">
            <label className="col-sm-2 col-form-label"for="Dep_Hr" >Dep_Hr</label>
            <div className="col-sm-10">
            <input id="Dep_Hr" className="form-control" type="number" name="Dep_Hr" />
            </div>
            
            </div>
            <div className="form-group">
            <label for="Dep_Min" >Dep_Min</label>
            <input id="Dep_Min" className="form-control" type="number" name="Dep_Min" />
            </div>
            <div className="form-group">
            <label for="Journey_Month" >Journey_Month</label>
            <input id="Journey_Month"className="form-control" type="number" name="Journey_Month" />
            </div>
            <div className="form-group">
            <label for="Journey_Day" >Journey_Day</label>
            <input id="Journey_Day"className="form-control" type="number" name="Journey_Day" />
            </div>
            <h2>Arrival</h2>
            <div className="form-group">
            <label for="Arrival_Hr" >Arrival_Hr</label>
            <input id="Arrival_Hr"className="form-control" type="number" name="Arrival_Hr" />
            </div>
            <div className="form-group">
            <label for="Arrival_Min" >Arrival_Min</label>
            <input id="Arrival_Min"className="form-control" type="number" name="Arrival_Min" />
            </div>
            <div className="form-group">
            <label for="is_weekend" >is_weekend</label>
            <input id="is_weekend"className="form-control" type="radio" name="is_weekend"/>
            </div>
            <div className="form-group">
            <label for="duration_hr" >duration_hr</label>
            <input id="duration_hr"className="form-control" type="number" name="duration_hr"/>
            </div>

            <label for="dest" >Destination</label>
            <select class="form-control" id="dest" name="dest">
                 <option value="Dest_Cochin">Cochin</option>
                 <option value="Dest_Delhi">Delhi</option>
                 <option value="Dest_New_Delhi">New_Delhi</option>
                 <option value="Dest_Hyderabad">Hyderabad</option>
                <option  value="Dest_Kolkata">Kolkata</option>
             </select>
             <label for="source" >Source</label>
            <select class="form-control" id="source" name="source">
                 <option value="Source_Chennai">Chennai</option>
                 <option value="Source_Delhi">Delhi</option>
                 <option value="Source_Kolkata">Kolkata</option>
                 <option value="Source_Mumbai">Mumbai</option>
             </select>
             <div className="form-group row">
            <label className="col-sm-2 col-form-label"for="Total_Stops" >Total_Stops</label>
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
            <input type="submit" name="submit"></input>
        </form>
    </div>
);
export default PricePage;

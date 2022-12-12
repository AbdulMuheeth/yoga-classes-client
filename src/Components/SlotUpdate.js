import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./SlotUpdate.css";

const SlotUpdate = () => {

    const [slot,setSlot] = useState("");

    const handleSlot = (event) => {
        setSlot(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = localStorage.getItem('id');
        axios.post("http://localhost:9000/verify/updateSlot",{id:id,slot:slot}).then(res=>{
            if(res.data)
            {
                alert("Slot updated");
                return <Navigate to="/userProfile" />
            }
        })
    }


    return(
        <>
            <form onSubmit={handleSubmit} className="container">
                <h1>Select your slot for next month</h1>
                <div>
                    <div>
                        <label className="label">Select the Slot</label><br/>
                        <select name="slot" className="slot" onChange={handleSlot} value={slot}> 
                            <option value="6-7">6-7am</option>
                            <option value="7-8">7-8am</option>
                            <option value="8-9">8-9am</option>
                            <option value="5-6">5-6pm</option>
                        </select>
                    </div><br/><br/>
                    <input type='submit' className="submit" />
                </div>
            </form>
        </>
    )
}

export default SlotUpdate;
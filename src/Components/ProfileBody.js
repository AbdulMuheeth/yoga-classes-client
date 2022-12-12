import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userDetails } from "../Others/functions";

const ProfileBody = () => {
  const [details, setDetails] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    userDetails(setDetails);

    // console.log(details);
    if (!details) {
      console.log(details);
    }

    const currrentMonth = new Date().getMonth();
    const lastPaymentDate = details.lastPaymentDate;
    const nextMonthSlot = details.nextMonthSlot;

    if (nextMonthSlot !== "") {
      const paymentMonth = new Date(lastPaymentDate).getMonth();
      if (
        currrentMonth > paymentMonth ||
        (paymentMonth == 12 && currrentMonth == 1)
      ) {
        axios
          .post("https://localhost:9000/verify/changeCurrentSlot", {
            id: localStorage.getItem("id"),
            slot: nextMonthSlot,
          })
          .then((res) => {
            console.log(res);
          });
      }
    }
  }, []);

  return (
    <>
      {
        // console.log(details)
      }
      <h1>Hello ,<span className="name">Muheeth</span></h1>

      <div>
        <h3>Details</h3>
        <table>
          <tr>
            <th>Email : </th>
            <td>{details.email}</td>
          </tr>
          <tr>
            <th>Name : </th>
            <td>{details.name}</td>
          </tr>
          <tr>
            <th>age :</th>
            <td>{details.age}</td>
          </tr>
          <tr>
            <th>Current Slot :</th>
            <td>{details.slot}</td>
          </tr>
          <tr>
            <th>payment Date : </th>
            <td>
              {details.lastPaymentDate === ""
                ? "None"
                : new Date(details.lastPaymentDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
            </td>
          </tr>
          <tr>
            <th>Next Month Slot : </th>
            <td>
              {details.nextMonthSlot === ""
                ? details.slot
                : details.nextMonthSlot}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default ProfileBody;

import { Link } from "react-router-dom";
import { checkLoginValidatity } from "../Others/functions";
import classes from "./HeaderComponent.module.css";

const HeaderComponent = () => {
  const Loggedin = checkLoginValidatity();

    const logout = () => {
        console.log('Entered');
        localStorage.clear();
        location.reload();
    }

  const generalUser = (
    <ul>
      <li>
        <Link  to="/register">
          Register
        </Link>
      </li>

      <li>
        <Link to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  const loggedinUser = (
    <ul>
      <li>
        <Link  to="/userProfile">
          Profile
        </Link>
      </li>
      <li>
        <Link  to="/completePayment">
          Pay Fee
        </Link>
      </li>
      <li>
        <Link to="/updateSlot">
          Update Slot
        </Link>
      </li>
      <li>
        <a onClick={logout}>Logout</a>
      </li>

    </ul>
  );

  return (
    <header className={classes.header}>
      <nav>
        {Loggedin ? loggedinUser : generalUser}
      </nav>
    </header>
  );
};

export default HeaderComponent;

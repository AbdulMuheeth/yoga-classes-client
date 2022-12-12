import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import UserProfile from './Pages/UserProfile';
import PaymentComponent from './Components/PaymentComponent';
import SlotUpdate from './Components/SlotUpdate';
import HeaderComponent from './Components/HeaderComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/userProfile" element={<UserProfile/>} />
          <Route path="/completePayment" element={<PaymentComponent  />} />
          <Route path="/updateSlot" element={<SlotUpdate  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

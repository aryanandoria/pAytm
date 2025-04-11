import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

function App() {
  return (
    <Router> 
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/dashboard" element ={<Dashboard />} />
      <Route path="/send" element={<SendMoney />} />
    </Routes>
  </Router>
    // <>
    //   <SendMoney />
    // </>
  );
}

export default App;

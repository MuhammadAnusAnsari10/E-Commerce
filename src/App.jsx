import { BrowserRouter } from "react-router-dom";
import Home from "./Components/E-CommerceProject/FrontEnd/Component/Home";
import Navigation from "./Components/E-CommerceProject/FrontEnd/Component/Navigation";
import Dashboard from "./Components/E-CommerceProject/BackEnd/Dashborad";
// import AppRoute from "./Components/E-CommerceProject/FrontEnd/Component/AppRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Dashboard /> */}
        {/* <SignUp /> */}
        {/* <Navigation /> */}
        <Home />
        {/* <AppRoute /> */}
      </BrowserRouter>
    </>
  );
}

export default App;

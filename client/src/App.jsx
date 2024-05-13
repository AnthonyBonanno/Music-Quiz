// Bringing in the required import from 'react-router-dom'
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer/Footer";

function App() {
  // The Outlet component will conditionally swap between the different pages according to the URL
  return (
    <>
      <nav>
        <Nav />
      </nav>
      
      <div className="section">
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;

import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Details from "./pages/details";

function App() {
    return (
        <div className="app font-Lato">
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/view all/:id" element={<Details />} />
            </Routes>
            <Footer></Footer>
        </div>
    );
}

export default App;

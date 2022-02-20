import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Details from "./pages/details";
import Search from "./pages/search";
import About from "./pages/about";

function App() {
    return (
        <div className="text-gray-700 app font-Lato dark:text-gray-200">
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route
                    path="/search/:value/page/:number"
                    element={<Search />}
                />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer></Footer>
        </div>
    );
}

export default App;

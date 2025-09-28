import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./ui/pages/HomePage.jsx";
import GeneratePage from "./ui/pages/GeneratePage.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/generate-entity" element={<GeneratePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
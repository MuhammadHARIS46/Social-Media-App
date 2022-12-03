import "./App.css";
import React from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import  PostDetails  from "./components/PostDetails/PostDetails";
function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={() => <Redirect to="/posts" />} />
        </Routes>
        <Routes>
          <Route path="/posts" exact element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/posts/search" exact element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/posts/:id" exact element={<PostDetails />} />
        </Routes>
        <Routes>
          <Route path="/auth" exact element={() => (!user ? <Auth /> : <Redirect to="/posts" />)}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

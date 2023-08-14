// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import bg_shoes from './img/bg.png';
import { useState } from 'react';
import item from './JSdata/data.js'
import Card from './Component/ItemComponent'
import Detail from './Component/DetailComponent';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import About from './Component/About';


function App() {
  let [shoes, setShoes] = useState(item);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수


  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">JJamVa Shoes Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("./")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('./detail')}>Detail</Nav.Link>
            {/* <Link to="/">홈</Link>
            <Link to="/detail">상세페이지</Link> */}
          </Nav>
        </Container>
      </Navbar>
    

      <Routes>

        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage: `url(${bg_shoes})` }}></div>
            <div>
              <Row>
                {
                  shoes.map((_, i) => <Card shoes={shoes[i]}></Card>)
                }
              </Row>
            </div>
          </>
        } />

        <Route path="/detail/:itemId" element={
          // :id is url parameter
          <>{
            <Detail shoes={shoes}></Detail>
          }
          </>
        } />

        {/* nested router */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>인물 정보</div>} />
          <Route path="location" element={<div>위치 정보</div>} />
        </Route>

        <Route path="*" element={<div>없는 페이지</div>} />

      </Routes>


    </div>
  );
}

export default App;

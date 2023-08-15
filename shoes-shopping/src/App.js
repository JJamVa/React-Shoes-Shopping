// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import bg_shoes from './img/bg.png';
import { createContext, useState } from 'react';
import item from './JSdata/data.js'
import Card from './Component/ItemComponent'
import Detail from './Component/DetailComponent';
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom'
import About from './Component/AboutComponent';
import axios from 'axios';
import { useEffect } from 'react';
import Cart from './Component/CartComponent';

export let Context = createContext()

function App() {

  useEffect(() => {
    localStorage.setItem('watched',JSON.stringify([]))
  },[])
  // let obj = {name: 'park'}
  // localStorage.setItem('data', JSON.stringify(obj))
  // let a = localStorage.getItem('data')
  // console.log(JSON.parse(a))

  let [shoes, setShoes] = useState(item);
  let [countbtn, setCountBtn] = useState(2);
  let [stock] = useState([10, 11, 12]);

  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수


  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">JJamVa Shoes Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("./")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('./detail/0')}>Detail</Nav.Link>
            <Nav.Link onClick={() => navigate('./cart')}>Cart</Nav.Link>
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
            <button onClick={() => {
              // Promise(동시) , fetch
              axios.get(`https://codingapple1.github.io/shop/data${countbtn}.json`)
                // 3의 데이터도 존재하지만 파일이 존재하지 않아 2까지만 처리했음
                .then((getData) => {//데이터를 가져옴
                  // console.log(getData.data);
                  let count = countbtn;
                  {
                    count <= 2 ?
                      setShoes([...shoes, ...getData.data])
                      : alert("마지막 제품 입니다.")
                  }
                  setCountBtn(countbtn + 1)
                }).catch(() => {
                  alert("제품 미등록")
                  console.log("데이터 가져오기 실패")
                })

            }}>더 보기</button>
          </>
        } />

        <Route path="/detail/:itemId" element={
          // :id is url parameter
          <>{
            <Context.Provider value={{stock}}>
              <Detail shoes={shoes}></Detail>
            </Context.Provider>
          }
          </>
        } />

        <Route path="/about" element={<About></About>} />
        <Route path="/cart" element={<Cart></Cart>}/>




        //   {/* nested router */}
        //   {/* <Route path="/about" element={<About/>}>
        //   <Route path="member" element={<div>인물 정보</div>} />
        //   <Route path="location" element={<div>위치 정보</div>} />
        // </Route> */}

      </Routes>


    </div>
  );
}

export default App;

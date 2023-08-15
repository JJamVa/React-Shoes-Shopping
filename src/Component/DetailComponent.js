import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Nav } from "react-bootstrap";
import '../App.css';
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";

import { Context } from './../App.js'

// import { styled } from 'styled-components'

// let YellowBtn = styled.button`
//     background: ${props => props.bg};
//     color: ${props => props.bg.includes("blue") ? "white" : "black"};
//     padding: 10px;
// `

// let copyBtn = styled.button(YellowBtn)`
//     background: slatblue;
// `
// styled는 다른 js파일에 영향 x -> 장점
// 로딩시간 단축

// useEffect는 언제 사용하나?
// 실행 시점이 다르다. return 후는 rendring이 다 되고난 후 useEffect실행

function Detail(props) {
    let { itemId } = useParams();
    let findItem = props.shoes.find(x => x.id === itemId)
    // let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [tap, setTap] = useState(0);
    let dispatch = useDispatch();

    // useEffect(() => {
    //     // console.log(findItem.itemId);
    //     let value = localStorage.getItem('watched')
    //     value = JSON.parse(value)
    //     value.push(findItem.id)
    //     value = new Set([...value])
    //     value = Array.from(value)
    //     localStorage.setItem('watched', JSON.stringify(value))
    // }, [])
    // 추후 작업


    useEffect(() => {
        // 시간이 오래걸릴거 같은 작업
        //mount, update될때 실행
        let timer = setTimeout(() => { setAlert(!alert) }, 2000)

        return () => {
            // useEffect가 실행되기전에 작성하는 코드
            // 기존 데이터나 Timer에 대한 작업
            clearTimeout(timer)
        }
    }, [])


    // id값으로 routes하나로 동작가능
    return (<div className="container">
        {/* <YellowBtn bg="skyblue">버튼</YellowBtn>
        <YellowBtn bg="blue">버튼</YellowBtn> */}
        {
            alert
                ? <div className="alert alert-warning">
                    2초 이내 구매시 할인
                </div>
                : null
        }


        {/* {count}
        <button onClick={() => { setCount(count++) }}>버튼</button> */}
        <div className="row">
            <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${props.shoes[itemId].id + 1}.jpg`} width="100%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{props.shoes[itemId].title}</h4>
                <p>{props.shoes[itemId].content}</p>
                <p>{props.shoes[itemId].price}</p>
                <button className="btn btn-danger" onClick={() => {
                    dispatch(addItem({ id: `${props.shoes[itemId].id}`, name: `${props.shoes[itemId].title}`, count: 0 }))
                }}>주문하기</button>
            </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link onClick={() => setTap(0)} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setTap(1)} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setTap(2)} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent tap={tap} shoes={props.shoes}></TabContent>

    </div>
    )
}

function TabContent({ tap, shoes }) {

    let [fade, setFade] = useState('')
    let { stock } = useContext(Context)
    // context api
    // component의 관계가 깊을수록 사용하면 유용
    // state변경하면 재랜더링(성능문제, 관리 문제)

    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)
        return () => {
            setFade('')
        }
    }, [tap])

    return (<div className={`start ${fade}`}>
        {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>)
}


export default Detail
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

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
    let findItem = props.shoes.find(x => x.itemId == itemId)
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);

    useEffect(() => {
        // 시간이 오래걸릴거 같은 작업
        //mount, update될때 실행
        let timer = setTimeout(() => { setAlert(false) }, 2000)

        return () => {
            // useEffect가 실행되기전에 작성하는 코드
            // 기존 데이터나 Timer에 대한 작업
            clearTimeout(timer)
        }
    },[])


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


        {count}
        <button onClick={() => { setCount(count++) }}>버튼</button>
        <div className="row">
            <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${props.shoes[itemId].id + 1}.jpg`} width="100%" />
            </div>

            <input>수량 입력란</input>
            <div className="col-md-6">
                <h4 className="pt-5">{props.shoes[itemId].title}</h4>
                <p>{props.shoes[itemId].content}</p>
                <p>{props.shoes[itemId].price}</p>
                <button className="btn btn-danger">주문하기</button>
            </div>
        </div>
    </div>
    )
}

export default Detail
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';


function Card(props) {
    return (
        <Col sm>
            <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%"></img>
            {/* public폴더안에 사진있으면 /로 호출가능 */}
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </Col>
    )

}

export default Card
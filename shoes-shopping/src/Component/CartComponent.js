import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, changeAge } from "../store/userSlice"
import { addCount } from "../store"

// redux이용
function Cart() {

    let tableItems = useSelector((state) => { return state }) //store에 여러가지 값들이 있지만 원하는 값만 가져올수 있음
    let dispatch = useDispatch()
    console.log(tableItems)

    return (
        <div>
            <h4>{tableItems.user.age}살의 {tableItems.user.name}님 장바구니</h4>
            <button onClick={() => {
                dispatch(changeAge(1));
                dispatch(changeName())
            }}>번경 버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableItems.tableItems.map((e, i) => {
                            return (
                                <tr ket={i}>
                                    <td>{i}</td>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.count}</td>
                                    <td>
                                        <button onClick={()=>{
                                            dispatch(addCount(e.id))
                                        }}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart
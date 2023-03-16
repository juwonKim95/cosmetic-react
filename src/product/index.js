import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';
import './index.css';

const detailFetch = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
}
const Productpage = () => {
    const { p_id } = useParams();
    const Navigate = useNavigate();
    const state = useAsync(detailFetch,[], p_id);
    const { loading, data, error } = state;

    //삭제하기
    const onDelete = () => {
        //axios는 데이터를 전송하기위해 사용
        axios.delete(`${API_URL}/delProduct/${p_id}`)
        .then(result=>{
            console.log("삭제되었습니다.");
            Navigate("/");
        })
        .catch(err=>{
            console.log(err);
        })
    }
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return (
        <div className='productDetail'>
            <h2>{data[0].p_name}</h2>
            <div className='productImg'>
                <img src={`${API_URL}/upload/${data[0].p_img}`} width="600px"alt="" />
            </div>
            <div>
                <p>{data[0].p_name}</p>
                <p>{data[0].p_desc}</p>
                <p>{data[0].p_price}</p>
                <p>무료배송</p>
            </div>
            <div>
                <button onClick={onDelete}>삭제</button>
                <button>수정</button>
            </div>
        </div>
    );
};

export default Productpage;
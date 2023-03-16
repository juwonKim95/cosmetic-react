import { useEffect } from 'react';
import { useReducer } from 'react';
//1.상태초기화
const initialState = {
    loading: false,
    data: null,
    error: null
}
//2.리듀서 함수 구현
//로딩중일때 상태 업데이트 Loading
//데이터를 성공적으로 받을때 상태 업데이트 SUCCESS
//에러가 발생했을 경우 상태 업데이트 ERROR
function reducer(state, action){
    //로딩중일때 상태 업데이트    
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            }; 
        default:
            return state;         
    }
}
const useAsync = (callback, deps=[], id) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //데이터 요청 함수
    const fetchData = async () => {
        //loading값의 value를 true로 상태 업데이트
        dispatch({ type:"LOADING"});
        //에러가 발생할 확률이 높은 코드작성시 에러 핸들링을 하기위해 트라이캐치문을 쓴다.
        try {
            //await쓰면 바로 쓰이는게 아니라 결과값 받을때까지 기다려서 결과값을 받을 수 있다.
            //잘 받으면 SUCCESS
            const data = await callback(id);
            dispatch({ type: "SUCCESS", data: data }); //data:data로도 사용가능(생략가능)
        }
        catch(e){
            dispatch({ type: "ERROR" , error: e })
        }
    }
    useEffect(()=>{
        fetchData();
    },deps)
    return state
};

export default useAsync;
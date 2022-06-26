import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";
import './App.css';

// 사용자의 입력을 컨트롤하기 위해서는 state가 필요함

const DiaryEditor = () => {

  const {onCreate} = useContext(DiaryDispatchContext);

  const authorInput = useRef();
  const contentInput = useRef();
// 현재 가리키는 값을 current로 불러와서 사용가능

  const [state,setState] = useState({
    author:"",
    content:"",
    emotion:1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit =()=> {
    if(state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if(state.content.length < 5 ) {
      contentInput.current.focus();
      return;
    }


    onCreate(state.author, state.content, state.emotion)
    alert("저장 성공");
    setState({
      author:"",
      content:"",
      emotion:1,
    })
  }

  return <div className="DiaryEditor">
    <h2>오늘의 일기</h2>
    <div>
      <input 
        ref={authorInput}
        name="author"
        value={state.author} 
        onChange={handleChangeState}
      />
    </div>
    <div>
      <textarea 
        ref={contentInput}
        name="content"
        value={state.content}
        onChange={handleChangeState}
      />
    </div>
    <div>
      오늘의 감정점수 : <select 
      name="emotion" 
      value={state.emotion}
      onChange={handleChangeState}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
    <div>
      <button onClick={handleSubmit}>일기 저장하기</button>
    </div>
  </div>;
}
export default React.memo(DiaryEditor);

// onChange  = 값이 바뀌었을 때 수행하는 함수.
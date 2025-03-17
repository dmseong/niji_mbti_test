import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const [name, setName] = useState('');
    const handleChange = ({ target: { value } }) => setName(value);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); 
        navigate(`/test/${name}`); 
    };

    return (
        <div className="frame">
            <div className="rectangle"></div>
            <img className="logo" src={process.env.PUBLIC_URL +'/img/Nijisanji_Logo.webp'} />
            <h1 className="title">나에게 잘 맞는</h1>
            <h1 className="secondTitle">니지산지 라이버<br />찾아보기</h1>
            <form onSubmit={handleSubmit}>
                <input id="namefield" type="text" value={name} onChange={handleChange} placeholder="이름을 입력하세요" />
                <button id="start" type="submit" disabled={!name}>Start Test</button>
            </form>
        </div>
    )
};

export default StartPage;
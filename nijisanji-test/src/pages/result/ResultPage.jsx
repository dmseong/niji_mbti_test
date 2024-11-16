import React from 'react';
import { useLocation } from 'react-router-dom';
import mbtiresultData from './mbtiresults.json';
import { useNavigate, useParams } from 'react-router-dom';

function ResultPage() {
    const location = useLocation();
    const { result } = location.state || {};
    const { name } = useParams();
    const navigate = useNavigate();
    
    const find = (id) => {
        return mbtiresultData.find((data) => data.id === id);
    }

    const resultData = mbtiresultData.find((data) => data.id === result);
    const goodpart = find(resultData.good.id);
    const badpart = find(resultData.bad.id);

    return (
        <div className="frame" style={{overflowY: "auto", height: '1200px'}}>
            <h2 className="resulttitle">{name}님의 테스트 결과</h2>
            <h1 className="resultnickname">{resultData.title}</h1>
            <h1 className="resultname">{resultData.name}</h1>
            <img className="resultimg" src={process.env.PUBLIC_URL + `/img/${resultData.img}` || `/img/${resultData.img}`} alt={resultData.name}/>
            <p className="resultsub">{resultData.subhead}</p>
            <div className="description">
                <ul>
                    {resultData.description.map((desc, index) => (
                        <li key={index}>{desc.des}</li>
                    ))}
                </ul>
            </div>
            <div className="card-container">
                <div className="card">
                    <p>나와 잘 맞는 라이버</p>
                    <h1>{goodpart.name}</h1>
                    <img src={process.env.PUBLIC_URL + `/img/${goodpart.img}`} alt={goodpart.name}/>
                </div>
                <div className="card">
                    <p>나와 안 맞는 라이버</p>
                    <h1>{badpart.name}</h1>
                    <img src={process.env.PUBLIC_URL + `/img/${badpart.img}`} alt={badpart.name}/>
                </div>
            </div>
            <div className="restart-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                <button className="restart" onClick={() => navigate('/')}>다시하기</button>
            </div>
            <div className="rectangle" style={{bottom: '0'}}></div>
            
        </div>
    );
}

export default ResultPage;
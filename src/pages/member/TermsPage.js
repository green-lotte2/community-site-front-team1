import React, { useEffect, useState } from 'react';
import MemberLayout from '../../layout/MemberLayout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl.js';
import { useCookies } from 'react-cookie';

const rootURL = RootUrl();

const TermsPage = () => {
    const navigate = useNavigate();

    const [privacy, setPrivacy] = useState('');
    const [terms, setTerms] = useState('');
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    // 컴포넌트가 렌더링될 때(마운트)
    useEffect(() => {
        console.log('컴포넌트가 렌더링될 때(마운트)');

        axios
            .get(`${rootURL}/terms`)
            .then((data) => {
                setPrivacy(data.data.result1);
                setTerms(data.data.result2);

                console.log(data.data.result1);
                console.log(data.data.result2);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const ChageCheckBox1 = () => {
        setIsChecked1(!isChecked1);
    };

    const ChageCheckBox2 = () => {
        setIsChecked2(!isChecked2); 
    };

    const [cookies, setCookie] = useCookies(['Terms']);

    const signUpHandler = () => {
        if (isChecked1 && isChecked2) {
            setCookie('Terms', 'true', { path: '/', expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) });
            alert('회원가입을 진행합니다.');
            navigate('/signup');
        } else {
            alert('약관에 동의해야 회원가입이 가능합니다.');
        }
    };

    return (
        <MemberLayout>
            <div className="memberBack termsBack">
                <div className="memberBox">
                    <div className="memberTitle">이용약관</div>

                    <div className="memberColumn termsColumn">
                        <div>제로파이 이용 약관 (필수)</div>
                        <div>
                            <textarea name="" id="" readOnly value={terms}>
                                웹사이트 서비스 이용 약관 (필수)
                            </textarea>
                        </div>

                        <label htmlFor="agree1">
                            동의
                            <input type="checkbox" name="" id="agree1" value={isChecked1} onChange={ChageCheckBox1} />
                        </label>
                    </div>

                    <div className="memberColumn termsColumn">
                        <div>개인 정보 동의 이용 약관 (필수)</div>
                        <div>
                            <textarea name="" id="" readOnly value={privacy}>
                                개인 정보 동의 이용 약관 (필수)
                            </textarea>
                        </div>

                        <label htmlFor="agree2">
                            동의
                            <input type="checkbox" name="" id="agree2" value={isChecked2} onChange={ChageCheckBox2} />
                        </label>
                    </div>

                    <div className="memberColumn">
                        <div className="memberRow">
                            <Link className="termsBtn" to="/">
                                취소
                            </Link>
                            <input className="termsBtn" type="submit" value="회원가입" onClick={signUpHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    );
};

export default TermsPage;

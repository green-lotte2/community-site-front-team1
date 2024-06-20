import React from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLoginAction } from './KakaoLoginApi';

const KakaoRedirect = () => {
    const dispatch = useDispatch();
    console.log('dispatch!!!', dispatch);

    // 인가 코드
    let code = new URL(window.location.href).searchParams.get('code');
    console.log('code11111', code);
    React.useEffect(() => {
        const fetchData = async () => {
            await dispatch(kakaoLoginAction(code));
        };

        fetchData();
    }, [dispatch, code]);

    return (
<div
            style={{
                fontFamily: 'Arial, sans-serif',
                background: 'url(/images/loginBack.jpg) no-repeat center center fixed',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                margin: 0,
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // dark transparent background
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                    width: '400px',
                    border: '1px solid #333', // darker border
                }}
            >
                <h2 style={{ color: '#fff' }}>Kakao 로그인 중입니다....</h2>
            </div>
        </div>
    );
};

export default KakaoRedirect;

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
                backgroundColor: '#FFF',
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
                    backgroundColor: '#FFF', // 흰색 배경
                    padding: '40px', // 내부 패딩을 늘림
                    borderRadius: '8px',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // 약간의 그림자 효과
                    width: '400px', // 너비를 더 크게 조정
                }}
            >
                <h2 style={{ color: '	#FFA500' }}>Kakao 로그인 안내</h2>

                <p style={{ marginBottom: '20px', color: '#45a049', fontSize: '18px' }}>
                    초기 비밀번호는 'kakao'입니다
                </p>
            </div>
        </div>
    );
};

export default KakaoRedirect;

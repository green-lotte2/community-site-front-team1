
const SocialKakao = ()=>
        {
            const Rest_api_key='3227ae68356a2d41ac3d1a0a451d3676' //REST API KEY
            const redirect_uri = '${FEc2}/auth' //Redirect URI
            const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
            const handleLogin = ()=>{
                window.location.href = kakaoURL
            }
            return(
            <>
            <button onClick={handleLogin}>카카오 로그인</button>
            </>
            )
}

export default SocialKakao
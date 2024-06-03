import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import CommentListComponent from '../../components/common/comment/CommentListComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCsView } from '../../api/CsApi';

const CsViewPage = () => {

    const navigate = useNavigate();

       // 제목, 내용
       const [csView, setCsView] = useState("");
       // 중복 요청 방지를 위한 상태 변수
       const [isCateFetched, setIsCateFetched] = useState(false);
       const [isArticleFetched, setIsArticleFetched] = useState(false);

    // pages - article - ViewPage 참고
    const test = "test";
     // URL에서 파라미터값 추출
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const csCate = queryParams.get('csCate');
     const csNo = queryParams.get('csNo');//나옴

    console.log("이거는 url에서 추출한 값 : "+csNo);    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCsView(csNo);

                console.log(response);
                setCsView(response);
                console.log(csView);

            } catch (error) {
                console.error('Failed to fetch article title:', error);
            } finally {
                setIsArticleFetched(true);
            }
        };

        if (!isArticleFetched) {
            fetchData();
        }
    }, [isArticleFetched]);

   
    
    /** 댓글 */
    const [comment, setComment] = useState([
        {
            commentNo : 1,
            articleNo : 22,
            stfNo : 2,
            commentCnt : "댓글 내용 테스트",
            commentRdate : "24.12.12 12:23:45",
        },
        {
            commentNo : 2,
            articleNo : 22,
            stfNo : 3,
            commentCnt : "그런거 몰라요",
            commentRdate : "24.12.14 12:23:45",
        }
    ]);


  return (
    <MainLayout>
        <div className="contentBox boxStyle7">
            <div className="contentTitle font30 alignL">QnA 게시판</div>
            <div className='writeRow'>
                <p>{csView.csTitle} <span>[답변완료]</span></p>
               
                {test ? (
                <Viewer initialValue={test} />
                ) : (
                    <p>Loading...</p>
                )}
            
            </div>

            <div className='writeRow'>
                <div className='wrtieBtnBox'>
                    <input type='submit' value={"삭제"}/>
                    <input type='button' value={"목록"}/>
                </div>
            </div>

            {/* 댓글 */}
            <div className='commentColumn'>
                <p>답변 0</p>
                {/* 댓글 작성 */}
                <div className='commentRow commentColumn'>
                    <div>
                        <img src="../images/iconSample3.png" alt="" />
                        <textarea name="" id="" placeholder='답글입력'></textarea>
                    </div>
                    <div style={{alignSelf:"self-end"}}>
                        <button>답글등록</button>
                    </div>
                </div>

                {/* 댓글 목록 */}
                <CommentListComponent comment={comment}/>
                
            </div>

        </div>     
    </MainLayout>
  )
}

export default CsViewPage;
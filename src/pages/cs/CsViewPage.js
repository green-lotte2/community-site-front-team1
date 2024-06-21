import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import CommentListComponent from '../../components/common/comment/CommentListComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCsView } from '../../api/CsApi';
import { getCookie } from "../../util/cookieUtil";
import { postCsComment,getcsComment,getDeleteCsView } from '../../api/CsApi';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';




const CsViewPage = () => {

    const navigate = useNavigate();
    const auth = getCookie("auth");
    const id = auth?.userId;
    const name = auth?.username;

    // 제목, 내용
    const [csView, setCsView] = useState("");
    // 중복 요청 방지를 위한 상태 변수
    const [isCateFetched, setIsCateFetched] = useState(false);
    const [isArticleFetched, setIsArticleFetched] = useState(false);

    // URL에서 파라미터값 추출
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const csNo = queryParams.get('csNo');//나옴

    console.log("이거는 url에서 추출한 값 : "+csNo);  
    console.log("사용자 아이디 : "+id); 

    const [commentMessage,setCommentMessage] = useState(''); 
    
    /** 댓글 */
    const [comment, setComment] = useState([]);

    useEffect(() => {

        console.log("랜더링 될 때 csNo값이야",csNo);
            // csNo가 유효한 경우에만 데이터 요청
            if (csNo) {
                fetchData(csNo);
            }
            }, [csNo]); // csNo가 변경될 때마다 useEffect 실행
    
        const fetchData = async () => {
            try {
                const Content = await getCsView(csNo);//여기에 commentList들도 같이 구해오기

                console.log(Content);
                setCsView(Content);
                console.log(csView);

                const answerList = await getcsComment(csNo);

                console.log("결과값 도출 - 댓글리스트",answerList);
                setComment(answerList);


            } catch (error) {
                console.error('Failed to fetch article title:', error);
            } finally {
                setIsArticleFetched(true);
            }
        };

    const commentChange = (e) =>{

        const Message = e.target.value;
        setCommentMessage({ ...commentMessage, csComContnet: Message });
        console.log(commentMessage);
    }

     const submitHandler = async (e)=>{

        e.preventDefault();

        console.log(csNo);
        console.log(id);
        console.log(commentMessage.csComContnet);

        const newComment = {
            csNo: csNo,
            stfNo: id,
            csComContent: commentMessage.csComContnet
        };


        try {
            console.log("new : ",newComment);
            const response = await postCsComment(newComment);
            console.log('Comment submitted successfully:', response);

            {/*여기서 부터 수정 
            const updatedComment = {
                ...newComment,
                stfName: auth?.username, 
                stfImg: auth?.userImg 
            };

            setComment(prevComments => [...prevComments, updatedComment]);

            setCommentMessage('');
             여기까지 */}

                         
                const url = "/csView?csNo=" + csNo;
                window.location.href=url;
                
                
                
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    }


    const back =()=>{

        navigate("/csList");

    }

    const deleteCsView = async (e)=>{

        e.preventDefault();

        const confirmed = window.confirm('정말 삭제하시겠습니까?');

        if(confirmed){

        const response = await getDeleteCsView(csNo);

        if(response==1){

            alert("삭제되었습니다.");
            navigate('/csList');

        }else{

            alert("삭제에 실패하였습니다.");
        }
    }


    }


  return (
    <MainLayout>
        <div className="contentBox boxStyle7">
            <div className="contentTitle font30 alignL">QnA 게시판</div>
            <div className='writeRow'>
                <p>
                    {csView.csTitle} {csView.csReply > 0 ? (<span>[답변완료]</span>) : (<span>[답변대기]</span>)}
                </p>
                             
                {csView.csContent ? (
                <Viewer initialValue={csView.csContent} />
                ) : (
                    <p>Loading...</p>
                )}
            
            </div>

            <div className='writeRow'>
                <div className='wrtieBtnBox'>
         
                    {auth?.userId===csView.stfNo || auth?.userRole==="MANAGER" ||auth?.userRole==="ADMIN"?(<input type='submit' onClick={deleteCsView} value={"삭제"}/>):('')}
                    
                    <input type='button' onClick={back} value={"목록"}/>
                </div>
            </div>

            {/* 댓글 */}
            <div className='commentColumn' style={{borderTop:"1px solid #dadde6"}}>
                <p style={{fontSize:"20px", margin:"20px 0"}}>답변 {comment.length}</p>
                {/* 댓글 작성 */}
                {auth?.userRole=="MANAGER" || auth?.userRole=="ADMIN"?(<div className='commentRow commentColumn'>
                    <div>
                        {auth?.userImg?(<img src={`${RootUrl()}/images/${auth?.userImg}`}/>):(<img src="../images/iconSample3.png" alt="" />)}
                        <textarea name="csComContnet" id="csComContnet" placeholder='답글입력' value={comment.commentCnt} onChange={commentChange}></textarea>
                    </div>
                    <div style={{alignSelf:"self-end"}}>
                        <button onClick={submitHandler}>답글등록</button>
                    </div>
                </div>):("")} 

                {/* 댓글 목록 */}
                <CommentListComponent comment={comment} csNo={csView.csNo}/>
                
            </div>

        </div>     
    </MainLayout>
  )
}

export default CsViewPage;
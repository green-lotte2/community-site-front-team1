import React from 'react'
import { getCommentDelete } from '../../../api/CsApi';
import { RootUrl } from '../../../api/RootUrl';
import Moment from 'moment';
import "moment/locale/ko";
import { getCookie } from '../../../util/cookieUtil';



const CommentListComponent = ({ comment,name,csNo }) => {

    const auth = getCookie("auth");

    const deleteHandler = async (e)=>{

        e.preventDefault();

        const confirmed = window.confirm('정말 삭제하시겠습니까?');

        if(confirmed){
            const no = e.target.dataset.id;

            console.log("누른 버튼의 댓글 id : ",no);

            await getCommentDelete(no);

            const url = "/csView?csNo=" + csNo;
            window.location.href=url;   
        } 
    }


  return (
    <>
        {comment ? comment.map((each, index) => (
            <div className='commentRow commentColumn'>
                <div>
                <div key={index}>
                    <img src={`${RootUrl()}/images/${each.stfImg}`} alt='image from spring'/>    
                </div>       
                       <div className='commentContent'>
                        <div className='commentTitle'>
                            <p>{each.stfName}</p>
                            <p>{/* 날짜 포맷(import 수동) / npm install moment --save */}
                    {Moment(each.csComRdate).format('YYYY-MM-DD HH:MM:DD')}</p>
                        </div>
                        <textarea readOnly name="" id="" value={each.csComContent}></textarea>
                    </div>
                </div>

                <div style={{alignSelf:"self-end"}}>
                {auth?.userRole==="MANAGER" ||auth?.userRole==="ADMIN"? (
                            <button data-id={each.csComNo} onClick={deleteHandler}>삭제</button>
                        ) : ('')}
                </div>
            </div>
        )) : (
            <div className='commentRow commentColumn'>
                <div>
                    등록된 댓글이 없습니다.
                </div>
            </div>
        )}
    </>
  )
}

export default CommentListComponent;
import React from 'react'
import MainLayout from '../../layout/MainLayout';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import CommentListComponent from '../../components/common/comment/CommentListComponent';

const CsViewPage = () => {


    // pages - article - ViewPage 참고
    const test = "test";

  return (
    <MainLayout>
        <div className="contentBox boxStyle7">
            <div className="contentTitle font30 alignL">ㅇㅇㅇ 게시판</div>
            
            <div className='writeRow'>
                <p>제목 <span>[답변완료]</span></p>
               
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
                <CommentListComponent/>
                
            </div>

        </div>     
    </MainLayout>
  )
}

export default CsViewPage;
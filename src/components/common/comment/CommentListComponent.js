import React from 'react'

const CommentListComponent = ({ comment }) => {
  return (
    <>
        {comment ? comment.map((each, index) => (
            <div className='commentRow commentColumn'>
                <div>
                    <img src="../images/iconSample3.png" alt="" />
                    <div className='commentContent'>
                        <div className='commentTitle'>
                            <p>홍길동</p>
                            <p>{each.commentRdate}</p>
                        </div>
                        <textarea name="" id="" value={each.commentCnt}></textarea>
                    </div>
                </div>

                <div style={{alignSelf:"self-end"}}>
                    <button>삭제</button>
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
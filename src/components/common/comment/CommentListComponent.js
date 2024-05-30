import React from 'react'

const CommentListComponent = () => {
  return (
    <div className='commentRow commentColumn'>
        

        <div>
            <img src="../images/iconSample3.png" alt="" />
            <div className='commentContent'>
                <div className='commentTitle'>
                    <p>홍길동</p>
                    <p>20.12.12 12:12:12</p>
                </div>
                <textarea name="" id="" value="그런건 저도 몰라용~"></textarea>
            </div>
        </div>

        <div style={{alignSelf:"self-end"}}>
            <button>삭제</button>
        </div>
    </div>
  )
}

export default CommentListComponent;
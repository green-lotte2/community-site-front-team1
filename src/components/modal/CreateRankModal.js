import React from 'react'

const CreateRankModal = ({handelColseModal}) => {
  return (
    <div className="modlaBack modalClose">
        <div className="modalBox">
            <div className="modalHeader">
                <p>직책 생성</p>
                <p className="modalClose" style={{ cursor: 'pointer' }} onClick={handelColseModal}>
                    X
                </p>
            </div>

            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30">이름</div>
                    <div>
                        <input type="text" />
                    </div>
                </div>
            </div>

            <div className="modalRow">
                <button className="modalClose" onClick={handelColseModal}>취소</button>
                <input type="submit" value="생성"/>
            </div>
        </div>
    </div>
  )
}

export default CreateRankModal
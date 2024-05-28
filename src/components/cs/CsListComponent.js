import React from 'react'
import { Link } from 'react-router-dom'

const CsListComponent = () => {
  return (
    <div className="articleRow">
        <div>1</div>
        <div>김춘추</div>
        
        <div>
            <Link to="">[결제관련] 왜 결제가 잘 안되는거죠??</Link>
        </div>
        <div>24.05.01</div>
        <div>1563</div>
        <div>답변 대기</div>
    </div>
  )
}

export default CsListComponent
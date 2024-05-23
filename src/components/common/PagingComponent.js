import React from 'react'
import { Link } from 'react-router-dom';

const PagingComponent = () => {
  return (
    <div class="contentColumn">
        <div class="paging">
            <Link to="#">이전</Link>
            <Link class="pageOn" to="#">1</Link>
            <Link to="#">2</Link>
            <Link to="#">3</Link>
            <Link to="#">다음</Link>
        </div>
    </div>
  )
}

export default PagingComponent;
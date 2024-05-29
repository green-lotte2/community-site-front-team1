import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'



const CsListComponent = ({dtoList=[]}) => {

  return (
    <>
    {dtoList.map((item, index) => (
        <div className="articleRow" key={index}>
          <div>{index+1}</div>{/*키값이 아닌 일반 순번 출력 */}
          <div>{item.stfName}</div>
          <div>
            <Link to={`/cs/${item.csCate}/${item.csNo}`}>{item.csTitle}</Link>
          </div>
          <div>{item.csRdate}</div>
          <div>{item.csHit}</div>
          <div>{item.csReply}</div>
        </div>
      ))}   
    
    </>
    
  )
}

export default CsListComponent
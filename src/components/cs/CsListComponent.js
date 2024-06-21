import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment';
import "moment/locale/ko";
import { getCookie } from "../../util/cookieUtil";


const CsListComponent = ({serverData}) => {

  const auth = getCookie("auth"); 


  if (!serverData || !serverData.dtoList || serverData.dtoList.length === 0) {
    return <div style={{fontSize:"15px",display: "flex",
      justifyContent: "center",
      alignItems: "center"}}>자료가 없습니다.</div>;
  }
  
  return (
    <>
    {serverData.dtoList.map((item, index) => (
        <div className="articleRow" key={index}>
          <div>{serverData.startNo-index}</div>{/*키값이 아닌 일반 순번 출력 */}
          <div>{item.stfName}</div>
          <div>
            {item.secret === "전체공개" || item.stfNo === auth.userId || auth.userRole==="ADMIN" || auth.userRole==="MANAGER"? (<Link to={`/csView?csNo=${item.csNo}`}>[{item.csCate}]   {item.csTitle}</Link>):(<p style={{fontSize:"15px"}}>비밀글 입니다</p>)} 
          </div>
          <div style={{width: "150px"}}>    
                    {Moment(item.csRdate).format('YYYY-MM-DD')}
                    </div>
          <div>{item.csHit}</div>

          {(item.csReply > 0) ? (
            <div style={{color: "green"}}>답변완료</div>
          ) : (
            <div style={{color: "#615EFC"}}>답변대기</div>
          )}
          
        </div>
      ))}   
    
    </>
    
  )
}

export default CsListComponent
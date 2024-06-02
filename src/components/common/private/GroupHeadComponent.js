import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faBriefcase, faUserGear } from "@fortawesome/free-solid-svg-icons";
import GroupBodyComponent from './GroupBodyComponent';

const GroupHeadComponent = ({groupInfo, handleMemberClick}) => {

    const [accordions, setAccordions] = useState(Array(groupInfo.length).fill(false));

    const handleAccordion = (index) => {
        setAccordions(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
      }

  return (
    <div className='groupHead'>
        {groupInfo && groupInfo.map((group, index) => (
            <div key={index}>
                <p onClick={() => handleAccordion(index)}>
                    {/* 부서 아이콘 */}
                    {(group.dptName === "인사지원부") && 
                        <FontAwesomeIcon icon={faUserGear} style={{ fontSize: '18px', marginRight:"4px"}} />
                    }
                    {(group.dptName === "영업부") && 
                        <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '18px', marginRight:"4px"}} />
                    }
                    {(group.dptName === "전산부") && 
                        <FontAwesomeIcon icon={faBolt} style={{ fontSize: '18px', marginRight:"4px"}} />
                    }
                    
                    {/* 부서 이름 */}
                    {group.dptName}({group.member.length})
                </p>
                {accordions[index] && group.member.map((member, index) => (
                    <GroupBodyComponent 
                        key={member.stfNo} 
                        member={member} 
                        index={index}
                        onClick={handleMemberClick} />
                ))}
        
            </div>
        ))}
        

        
    </div>
  )
}

export default GroupHeadComponent
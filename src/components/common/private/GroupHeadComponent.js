import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faBriefcase, faUserGear } from "@fortawesome/free-solid-svg-icons";
import GroupBodyComponent from './GroupBodyComponent';

const GroupHeadComponent = ({groupInfo}) => {

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
        {groupInfo.map((group, index) => (
        <>
            <p onClick={() => handleAccordion(index)}>
                {/* 부서 아이콘 */}
                {(group.department === "인사지원부") && 
                    <FontAwesomeIcon icon={faUserGear} style={{ fontSize: '18px', marginRight:"4px"}} />
                }
                {(group.department === "영업부") && 
                    <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '18px', marginRight:"4px"}} />
                }
                {(group.department === "전산부") && 
                    <FontAwesomeIcon icon={faBolt} style={{ fontSize: '18px', marginRight:"4px"}} />
                }
                
                {/* 부서 이름 */}
                {group.department}
            </p>
            {accordions[index] && group.member.map((member, index) => (
                <GroupBodyComponent member={member} index={index} />
            ))}
        </>
        ))}
        

        
    </div>
  )
}

export default GroupHeadComponent
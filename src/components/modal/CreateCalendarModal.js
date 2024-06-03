import { faBolt, faBriefcase, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import GroupBodyComponent from '../common/private/GroupBodyComponent';
import { getDptAndStfList, getUserInfo } from '../../api/AdminApi';

const CreateCalendarModal = ({handelColseModal}) => {

    /** 조직도 */
    const [groupInfo, setGroupInfo] = useState([]);
    // 오른쪽 화면 (처음에는 안뜨고 회원 이름 클릭하면 서버에서 정보 받아와서 띄우기)
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptAndStfList();
                console.log('getDptList' + groupInfo);
                setGroupInfo(response);
               
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);


    const handleMemberClick = async (member) => {
        try {
            // 클릭된 멤버의 정보를 가져와서 userInfo를 설정
            const response = await getUserInfo(member.stfNo);
            setUserInfo(response);
        } catch (err) {
            console.log(err);
        }
    };

    const [accordions, setAccordions] = useState(Array(groupInfo.length).fill(false));

    const handleAccordion = (index) => {
        setAccordions(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            for (let i=0 ; i < newState.length; i++) {
                if (i ===index) {

                }else {
                    newState[i] = false;
                }
            }
            return newState;
        });
      }


  return (
    <div className="modlaBack modalClose">
        <div className="modalBox">
            <div className="modalHeader">
                <p>캘린더 생성</p>
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

            <div className='modalRow' >
                <div className="modalGroup" style={{width:"60%", padding:"0"}}>
                    <div className='groupHead' style={{width:"100%"}}>
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
                </div>
                <div className="modalRow">
                    <div className='inviteList'>
                        <span>홍길동</span>
                        <span>김춘추</span>
                        <span>김유신</span>
                        <span>강감찬</span>
                        <span>이순신</span>
                    </div>
                </div>
            </div>

            <div className="modalColumn">
                
            </div>

            <div className="modalRow">
                <button className="modalClose" onClick={handelColseModal}>취소</button>
                <input type="submit" value="생성"/>
            </div>
        </div>
    </div>
  )
}

export default CreateCalendarModal
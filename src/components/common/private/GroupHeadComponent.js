import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GroupBodyComponent from './GroupBodyComponent';
import GroupIconComponent from './GroupIconComponent';

const GroupHeadComponent = ({ groupInfo, handleMemberClick }) => {
    const [accordions, setAccordions] = useState(Array(groupInfo.length).fill(false));

    const handleAccordion = (index) => {
        setAccordions((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            for (let i = 0; i < newState.length; i++) {
                if (i !== index) {
                    newState[i] = false;
                }
            }
            return newState;
        });
    };

    return (
        <div className="groupHead">
            {groupInfo &&
                groupInfo.map((group, index) => (
                    <div key={index}>
                        <p onClick={() => handleAccordion(index)}>
                            {/* 부서 아이콘 */}
                            <GroupIconComponent iconName={group.dptIcon} />
                            {/* 부서 이름 */}
                            {group.dptName}({group.member.length})
                        </p>
                        {accordions[index] &&
                            group.member.map((member, index) => (
                                <GroupBodyComponent
                                    key={member.stfNo}
                                    member={member}
                                    index={index}
                                    onClick={handleMemberClick}
                                />
                            ))}
                    </div>
                ))}
        </div>
    );
};

export default GroupHeadComponent;

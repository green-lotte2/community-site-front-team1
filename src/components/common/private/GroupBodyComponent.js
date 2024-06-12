import React from 'react';
import { RootUrl } from '../../../api/RootUrl';

const GroupBodyComponent = ({ index, member, onClick }) => {
    const handleMemberClick = () => {
        console.log(member.stfNo);
        onClick(member);
    };

    return (
        <div className="groupBody" onClick={handleMemberClick} style={{ padding: '0 10px 10px 20px' }}>
            <p key={index}>
                <img src={`${RootUrl()}/images/${member.stfImg}`} alt="sft" name="stfImg" />
                {member.stfName} [{member.rankNo}]
            </p>
        </div>
    );
};

export default GroupBodyComponent;

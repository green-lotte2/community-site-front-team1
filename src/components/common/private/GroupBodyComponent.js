import React from 'react';
import { RootUrl } from '../../../api/RootUrl';

const GroupBodyComponent = ({ index, member, onClick, className }) => {
    const handleMemberClick = () => {
        console.log(member.stfNo);
        onClick(member);
    };

    return (
        <div className={className} onClick={handleMemberClick} style={{ display: 'flex', padding: '0 10px 10px 20px' }}>
            <p
                key={index}
                style={{
                    fontSize: '16px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={`${RootUrl()}/images/${member.stfImg}`}
                    alt="sft"
                    name="stfImg"
                    style={{ marginRight: '7px', width: '30px', height: '30px' }}
                />
                {member.stfName} [{member.rankNo}]
            </p>
        </div>
    );
};

export default GroupBodyComponent;

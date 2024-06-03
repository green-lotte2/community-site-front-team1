import React from 'react'

const GroupBodyComponent = ({index, member, onClick}) => {

  const handleMemberClick = () => {
    console.log(member.stfNo);
    onClick(member);
  };

  return (
    <div className='groupBody' onClick={handleMemberClick} style={{padding:"0 10px 10px 20px"}}>
        <p key={index}>{member.stfName} [{member.rankNo}]</p>
    </div>
  )
}

export default GroupBodyComponent
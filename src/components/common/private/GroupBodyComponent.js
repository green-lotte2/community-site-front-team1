import React from 'react'

const GroupBodyComponent = ({member}, {index}) => {
  return (
    <div className='groupBody'>
        <p key={index}>{member.stfName} [{member.rankNo}]</p>
    </div>
  )
}

export default GroupBodyComponent
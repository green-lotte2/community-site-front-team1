import React from 'react'

const GroupBodyComponent = ({member}, {index}) => {
  return (
    <div className='groupBody'>
        <p key={index}>{member.name} [{member.rank}]</p>
    </div>
  )
}

export default GroupBodyComponent
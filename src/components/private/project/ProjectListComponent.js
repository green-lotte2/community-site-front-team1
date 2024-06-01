import { faClipboard, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import CreateProjectModal from '../../modal/CreateProjectModal';

const ProjectListComponent = () => {

    /** 프로젝트 생성 모달 관리 */
    const [openCreateProject, setOpenCreateProject] = useState(false);

    const handelOpenModal = () => {
        setOpenCreateProject(true);
    }

    const handelColseModal = () => {
        setOpenCreateProject(false);
    }

  return (
    <div className="contentBox boxStyle9">
        <div className="chatInfo">
            <img src="../images/iconSample3.png" alt="pro" />
            <div>
                <p>홍길동</p>
                <p>abcd1234@gmail.com</p>
            </div>
        </div>

        <div className='projectList' onClick={handelOpenModal}>
            <FontAwesomeIcon icon={faSquarePlus}/>
            <div>
                <p>프로젝트 생성</p>
            </div>
        </div>

        <div className='projectList'>
            <FontAwesomeIcon icon={faClipboard} style={{color: "#13a8ae",}}/>
            <div>
                <p>롯데온 프로젝트</p>
                <p>롯데온 쇼핑몰 만들기 프로젝트</p>
            </div>
        </div>
            
        <div className='projectList'>
            <FontAwesomeIcon icon={faClipboard} style={{color: "#13a8ae",}}/>
            <div>
                <p>프로젝트 이름</p>
                <p>프로젝트 간단 설명</p>
            </div>
        </div>

        <div className='projectList'>
            <FontAwesomeIcon icon={faClipboard} style={{color: "#13a8ae",}}/>
            <div>
                <p>프로젝트 이름</p>
                <p>프로젝트 간단 설명</p>
            </div>
        </div>

        {openCreateProject && <CreateProjectModal handelColseModal={handelColseModal}/>}

    </div>
  )
}

export default ProjectListComponent
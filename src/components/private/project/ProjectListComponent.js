import { faClipboard, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import CreateProjectModal from '../../modal/CreateProjectModal';
import { useSelector } from 'react-redux';
import { RootUrl } from '../../../api/RootUrl';

const ProjectListComponent = ({ kanbanList, onSelectKanban, kanbanData }) => {
    /** 프로젝트 생성 모달 관리 */
    const [openCreateProject, setOpenCreateProject] = useState(false);

    const handelOpenModal = () => {
        console.log('kanbanList', kanbanList);
        let docCount = 0;
        let makeDoc = 0;
        kanbanList.forEach((doc) => {
            if (doc.kanbanStf === loginSlice.userId) {
                docCount++;
            }
        });
        console.log('docCount', docCount);

        if (loginSlice.planState === 1) {
            makeDoc = 5;
        } else if (loginSlice.planState === 2) {
            makeDoc = 10;
        } else if (loginSlice.planState === 3) {
            makeDoc = 1000;
        }

        if (docCount >= makeDoc) {
            alert('더 이상 문서를 생성할 수 없습니다.');
            return;
        } else {
            setOpenCreateProject(true);
        }
    };

    const handelColseModal = () => {
        setOpenCreateProject(false);
    };
    const loginSlice = useSelector((state) => state.loginSlice) || {};

    return (
        <div className="contentBox boxStyle9">
            <div className="chatInfo">
                <img src={`${RootUrl()}/images/${loginSlice.userImg}`} alt="pro" />
                <div>
                    <p>{loginSlice.username}</p>
                    <p>{loginSlice.userEmail}</p>
                </div>
            </div>

            <div className="projectList" onClick={handelOpenModal}>
                <FontAwesomeIcon icon={faSquarePlus} />
                <div>
                    <p>프로젝트 생성</p>
                </div>
            </div>

            {kanbanList.map((kanban) => (
                <div
                    key={kanban.kanbanId}
                    className="projectList"
                    onClick={() => onSelectKanban(kanban.kanbanName, kanban.kanbanId, kanban.kanbanStf)}
                >
                    <FontAwesomeIcon icon={faClipboard} style={{ color: '#13a8ae' }} />
                    <div>
                        <p>{kanban.kanbanName}</p>
                        <p>{kanban.kanbanInfo}</p>
                    </div>
                </div>
            ))}

            {openCreateProject && <CreateProjectModal handelColseModal={handelColseModal} kanbanData={kanbanData} />}
        </div>
    );
};

export default ProjectListComponent;

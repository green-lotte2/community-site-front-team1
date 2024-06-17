import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import ProjectListComponent from '../../components/private/project/ProjectListComponent';
import ProjectBoxComponent from '../../components/private/project/ProjectBoxComponent';
import { getKanban } from '../../api/KanbanApi';
import { useSelector } from 'react-redux';
import '../../index.scss';

const ProjectPage = () => {
    const [kanbanList, setKanbanList] = useState([]);
    const [selectedKanbanName, setSelectedKanbanName] = useState('');
    const [selectedKanbanNo, setSelectedKanbanNo] = useState('');
    const [selectedKanbanStf, setSelectedKanbanStf] = useState('');
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const userId = loginSlice.userId;
    const kanbanData = async () => {
        try {
            const kanbanList = await getKanban(userId);
            console.log(kanbanList);
            setKanbanList(kanbanList);
        } catch (err) {
            console.log(err);
        }
    };
    const handleKanbanSelect = (kanbanName, kanbanId, kanbanStf) => {
        setSelectedKanbanName(kanbanName);
        setSelectedKanbanNo(kanbanId);
        setSelectedKanbanStf(kanbanStf);
    };

    useEffect(() => {
        kanbanData();
    }, []);

    return (
        <MainLayout>
            <div className="chatBox">
                <ProjectListComponent
                    kanbanList={kanbanList}
                    onSelectKanban={handleKanbanSelect}
                    kanbanData={kanbanData}
                />
                <>
                    {selectedKanbanNo && (
                        <div className="contentBox boxStyle8">
                            <ProjectBoxComponent
                                kanbanName={selectedKanbanName}
                                kanbanNo={selectedKanbanNo}
                                kanbanStf={selectedKanbanStf}
                            />
                        </div>
                    )}
                </>
            </div>
        </MainLayout>
    );
};

export default ProjectPage;

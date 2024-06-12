import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import ProjectListComponent from '../../components/private/project/ProjectListComponent';
import ProjectBoxComponent from '../../components/private/project/ProjectBoxComponent';
import { getKanban } from '../../api/KanbanApi';
import { useSelector } from 'react-redux';

const ProjectPage = () => {
    const [kanbanList, setKanbanList] = useState([]);
    const [selectedKanbanName, setSelectedKanbanName] = useState('');
    const [selectedKanbanNo, setSelectedKanbanNo] = useState('');
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
    const handleKanbanSelect = (kanbanName, kanbanId) => {
        console.log(kanbanName);
        console.log(kanbanId);
        setSelectedKanbanName(kanbanName);
        setSelectedKanbanNo(kanbanId);
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

                <ProjectBoxComponent kanbanName={selectedKanbanName} kanbanNo={selectedKanbanNo} />
            </div>
        </MainLayout>
    );
};

export default ProjectPage;

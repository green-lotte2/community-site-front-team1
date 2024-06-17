import { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Board from './Board/Board';
// import data from '../data'
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Editable from './Editable/Editable';
import useLocalStorage from 'use-local-storage';
import '../../../bootstrap.css';
import { deleteBoard, getKanbanDataById, postBoard } from '../../../api/KanbanApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const ProjectBoxComponent = ({ kanbanName, kanbanNo, kanbanStf }) => {
    console.log('여기', kanbanNo, kanbanName, kanbanStf);
    const [data, setData] = useState([]);

    /** 칸반 아이디로 조회 */
    const fetchKanbanData = async (kanbanId) => {
        try {
            const response = await getKanbanDataById(kanbanId);
            setData(response);
        } catch (err) {
            console.log(err);
            setData([]);
        }
    };

    useEffect(() => {
        if (kanbanNo) {
            console.log('번호', kanbanNo);
            fetchKanbanData(kanbanNo);
        }
    }, [kanbanNo]);

    const defaultDark = window.matchMedia('(prefers-colors-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const setName = async (title, bid) => {
        const index = data.findIndex((item) => item.id === bid);
        const tempData = [...data];
        tempData[index].boardName = title;
        setData(tempData);
        await postBoard(data);
        fetchKanbanData(kanbanNo);
    };

    const dragCardInBoard = (source, destination) => {
        let tempData = [...data];
        const destinationBoardIdx = tempData.findIndex((item) => item.id.toString() === destination.droppableId);
        const sourceBoardIdx = tempData.findIndex((item) => item.id.toString() === source.droppableId);
        tempData[destinationBoardIdx].card.splice(destination.index, 0, tempData[sourceBoardIdx].card[source.index]);
        tempData[sourceBoardIdx].card.splice(source.index, 1);

        return tempData;
    };

    const dragCardInSameBoard = (source, destination) => {
        let tempData = [...data];
        const boardIdx = tempData.findIndex((item) => item.id.toString() === source.droppableId);
        const [movedCard] = tempData[boardIdx].card.splice(source.index, 1);
        tempData[boardIdx].card.splice(destination.index, 0, movedCard);
        return tempData;
    };

    /** 카드 */
    const addCard = async (title, bid) => {
        const index = data.findIndex((item) => item.id === bid);
        const tempData = [...data];
        tempData[index].card.push({
            id: uuidv4(),
            title: title,
            tags: [],
            task: [],
        });
        setData(tempData);

        await postBoard(data);
        fetchKanbanData(kanbanNo);
    };

    const removeCard = async (boardId, cardId) => {
        const index = data.findIndex((item) => item.id === boardId);
        const tempData = [...data];
        const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

        tempData[index].card.splice(cardIndex, 1);

        setData(tempData);
        await postBoard(data);
        fetchKanbanData(kanbanNo);
    };

    /** 보드 */
    const addBoard = async (title) => {
        const tempData = [...data];
        tempData.push({
            id: uuidv4(),
            boardName: title,
            kanbanId: kanbanNo,
            card: [],
        });
        setData(tempData);
        console.log(tempData);
        await postBoard(tempData);
        fetchKanbanData(kanbanNo);
    };

    const removeBoard = async (bid) => {
        const tempData = [...data];
        const index = data.findIndex((item) => item.id === bid);
        if (index !== -1) {
            tempData.splice(index, 1);
            console.log('id?', bid);
            setData(tempData);
            await deleteBoard(bid);
        }
    };

    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            setData(dragCardInSameBoard(source, destination));
            await postBoard(data);
        } else {
            setData(dragCardInBoard(source, destination));
            await postBoard(data);
        }
        fetchKanbanData(kanbanNo);
    };

    const updateCard = async (bid, cid, card) => {
        const index = data.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...data];
        const cards = tempBoards[index].card;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].card[cardIndex] = card;
        console.log(tempBoards);
        setData(tempBoards);
        await postBoard(data);
        fetchKanbanData(kanbanNo);
    };

    useEffect(() => {
        localStorage.setItem('kanban-board', JSON.stringify(data));
    }, [data]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App2" data-theme={theme}>
                <Navbar
                    switchTheme={switchTheme}
                    selectedKanbanName={kanbanName}
                    kanbanNo={kanbanNo}
                    kanbanStf={kanbanStf}
                />
                <div className="app_outer">
                    <div className="app_boards">
                        {data.map((item) => (
                            <Board
                                key={item.id}
                                id={item.id}
                                name={item.boardName}
                                card={item.card}
                                setName={setName}
                                addCard={addCard}
                                removeCard={removeCard}
                                removeBoard={removeBoard}
                                updateCard={updateCard}
                            />
                        ))}
                        <Editable
                            class={'add__board'}
                            name={'Add Board'}
                            btnName={'Add Board'}
                            onSubmit={addBoard}
                            placeholder={'Enter Board  Title'}
                        />
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

export default ProjectBoxComponent;

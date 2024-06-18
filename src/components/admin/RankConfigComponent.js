import React, { useState } from 'react';
import CreateRankModal from '../modal/CreateRankModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { deleteRank, updateRank } from '../../api/AdminApi';

const RankConfigComponent = ({ rankValue, setRankValue, handleChangeRank }) => {
    /** 부서 생서 모달 */
    const [createRank, setCreateRank] = useState(false);

    const handelOpenModal = () => {
        setCreateRank(true);
    };

    const handelCloseModal = () => {
        setCreateRank(false);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(rankValue);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const updatedItems = items.map((item, index) => ({
            ...item,
            rnkIndex: index + 1, // 인덱스를 1부터 시작하도록 설정
        }));
        setRankValue(updatedItems); // 상태 업데이트
    };

    const handleRnkDelete = async (index) => {
        console.log(rankValue[index]);
        const confirm = window.confirm('직책을 제거하시겠습니까?');
        if (confirm) {
            try {
                const response = await deleteRank(rankValue[index].rnkNo);
                console.log(response);
                setRankValue((prevRankValue) => prevRankValue.filter((_, i) => i !== index));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleUpdate = async (rankValue) => {
        console.log('수정할것', rankValue);
        const confirm = window.confirm('수정 사항을 저장하시겠습니까?');
        if (confirm) {
            try {
                updateRank(rankValue);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="contentBox boxStyle4">
            <div className="contentTitle font30 alignL">직책 설정</div>
            <div className="contentInfo alignL">
                회사 내 직책 이름, 종류 변경 가능합니다.(저장을 눌러야 반영됩니다.)
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="ranks">
                    {(provided) => (
                        <div className="scrollBox" {...provided.droppableProps} ref={provided.innerRef}>
                            {rankValue.map((rnk, index) => (
                                <Draggable key={rnk.rnkNo} draggableId={rnk.rnkNo.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            key={rnk.rnkNo}
                                            className="scrollRow configRow"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div>{index + 1}</div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={rnk.rnkName}
                                                    onChange={(event) => handleChangeRank(index, event)}
                                                />
                                            </div>
                                            <div className="configBtn">
                                                <button onClick={() => handleRnkDelete(index)}>삭제</button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="configBtn">
                <button onClick={handelOpenModal}>생성</button>
                <button onClick={() => handleUpdate(rankValue)}>저장</button>
            </div>

            {createRank && (
                <CreateRankModal
                    handelCloseModal={handelCloseModal}
                    rankValue={rankValue}
                    setRankValue={setRankValue}
                />
            )}
        </div>
    );
};

export default RankConfigComponent;

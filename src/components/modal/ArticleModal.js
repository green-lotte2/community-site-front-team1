import React, { useEffect, useState } from 'react';
import UserModifyModal from './UserModifyModal';

const ArticleModal = ({ cateData, handleModalClose }) => {
    // const [name, setName] = useState('');

    console.log('cateData : ' + JSON.stringify(cateData));

    return (
        <div className="modlaBack modalClose" onClick={handleModalClose}>
            <div className="modalBox">
                <div className="modalHeader">
                    <p>게시판 권한 변경</p>
                    <p className="modalClose" onClick={handleModalClose} style={{cursor: "pointer"}}>
                        X
                    </p>
                </div>
                <div className="modalColumn">
                    <div className="modalRow">
                        <div className="maR30">이름 변경</div>
                        <div>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">사용 여부</div>
                        <div>
                            <select name="" id="">
                                <option value="">활성화</option>
                                <option value="">비활성화</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">읽기 권한</div>
                        <div>
                            <select name="" id="">
                                <option value="">USER</option>
                                <option value="">ADMIN</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">쓰기 권한</div>
                        <div>
                            <select name="" id="">
                                <option value="">USER</option>
                                <option value="">ADMIN</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">댓글 권한</div>
                        <div>
                            <select name="" id="">
                                <option value="">USER</option>
                                <option value="">ADMIN</option>
                            </select>
                        </div>
                    </div>
                    <div className="modalRow">
                        <button className="modalClose" onClick={handleModalClose}>
                            취소
                        </button>
                        <input type="submit" value="변경" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleModal;

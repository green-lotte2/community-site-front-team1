import React, { useState } from 'react';
import { modifyArticleCate } from '../../api/AdminApi';

const ArticleModal = ({ cateData, handleModalClose }) => {
    const [formData, setFormData] = useState({
        articleCateNo: cateData.articleCateNo,
        articleCateName: cateData.articleCateName,
        articleCateStatus: cateData.articleCateStatus,
        articleCateVRole: cateData.articleCateVRole,
        articleCateWRole: cateData.articleCateWRole,
        articleCateCoRole: cateData.articleCateCoRole,
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //console.log('cateData : ' + JSON.stringify(cateData));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        modifyArticleCate(formData);
        handleModalClose(formData);
    };

    return (
        <div className="modlaBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>게시판 권한 변경</p>
                    <p className="modalClose" onClick={() => handleModalClose(formData)} style={{ cursor: 'pointer' }}>
                        X
                    </p>
                </div>
                <div className="modalColumn">
                    <div className="modalRow">
                        <div className="maR30">이름 변경</div>
                        <div>
                            <input
                                type="text"
                                name="articleCateName"
                                value={formData.articleCateName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">사용 여부</div>
                        <div>
                            <select
                                name="articleCateStatus"
                                value={formData.articleCateStatus}
                                onChange={handleInputChange}
                            >
                                <option value="1">활성화</option>
                                <option value="0">비활성화</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">읽기 권한</div>
                        <div>
                            <select
                                name="articleCateVRole"
                                value={formData.articleCateVRole}
                                onChange={handleInputChange}
                            >
                                <option value="USER">USER</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">쓰기 권한</div>
                        <div>
                            <select
                                name="articleCateWRole"
                                value={formData.articleCateWRole}
                                onChange={handleInputChange}
                            >
                                <option value="USER">USER</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">댓글 권한</div>
                        <div>
                            <select
                                name="articleCateCoRole"
                                value={formData.articleCateCoRole}
                                onChange={handleInputChange}
                            >
                                <option value="USER">USER</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </div>
                    <div className="modalRow">
                        <button className="modalClose" onClick={() => handleModalClose(formData)}>
                            취소
                        </button>
                        <input type="submit" value="변경" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleModal;

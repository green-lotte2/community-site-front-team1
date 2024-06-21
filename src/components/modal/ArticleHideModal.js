import React, { useState } from 'react';

const ArticleModal = ({ articleData, handleModalClose }) => {
    const [formData, setFormData] = useState({
        articleTitle: articleData.articleTitle,
    });

    const handleInputChange = (event) => {};

    //console.log('cateData : ' + JSON.stringify(cateData));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="modlaBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>게시글 읽기 권한 변경</p>
                    <p className="modalClose" onClick={() => handleModalClose(formData)} style={{ cursor: 'pointer' }}>
                        X
                    </p>
                </div>
                <div className="modalColumn">
                    <div className="modalColumnRow">
                        <div className="maR30">게시글 제목</div>
                        <div className="modalText">{articleData.articleTitle}</div>
                    </div>

                    <div className="modalColumnRow">
                        <div className="maR30">가시성 설정</div>
                        <div>
                            <select name="articleCateVRole" value={articleData.articleStatus}>
                                <option value="hide">비활성화</option>
                                <option value="view">활성화</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalColumnRow">
                        <div className="maR30">사유</div>
                        <div>
                            <input type="textbox" />
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
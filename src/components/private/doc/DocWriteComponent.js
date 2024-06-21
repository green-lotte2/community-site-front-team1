import { faDoorOpen, faGear, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { getDocContent, saveDocFile } from '../../../api/DocApi';
import { RootUrl, SoketUrl } from '../../../api/RootUrl';
import LoginSlice from '../../../slice/LoginSlice';

const DocWriteComponent = ({ eachDocView, setDocList, eachDocIndex, submitDoc, handleAddMemberClick, deleteDoc, userId, exitDoc }) => {
    const doc = new Y.Doc();
    const provider = useRef(null);

    /** 제목 관리 */
    const [docTitle, setDocTitle] = useState('');

    /** 페이지 정보 보관하는 useRef */
    const pageRef = useRef({
        pno: '',
        title: '',
        owner: '',
        rDate: '',
        document: '',
    });

    /** 랜더링 시점 관리 useState */
    const [loading, setLoading] = useState(false);

    /** 소켓 연결 useEffect */
    useEffect(() => {
        let roomId = 'docId' + eachDocView;
        if (eachDocView) {
            provider.current = new WebrtcProvider(roomId, doc, { signaling: [`ws://${SoketUrl}/doc`] });

            return () => {
                submitDoc(editor.document, pageRef.current);
                provider.current.destroy();
            };
        }
    }, [eachDocView]);

    /** 에디터 기본 설정 (collaboration) */
    const editor = useCreateBlockNote({
        defaultStyles: true,
        uploadFile: async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('pno', pageRef.current.pno);
    
            const response = await saveDocFile(formData);
    
            console.log("이미지", response)

            return RootUrl() + "/images" + response; // 서버에서 반환된 파일 URL
        },
        collaboration: {
            provider: provider.current,
            fragment: doc.getXmlFragment('document-store'),
            user: {
                name: 'My Username',
                color: '#ff0000',
            },
        },
    });

    /** 페이지 로드될 때 데이터 불러오기 */
    useEffect(() => {
        const selectDoc = async () => {
            try {
                const response = await getDocContent(eachDocView);
                pageRef.current = response;
                setDocTitle(response.title);
                setLoading(true);
                console.log(editor.document.length);
                if (editor.document.length === 1) {
                    console.log(response.document);
                    const docView = JSON.parse(response.document);
                    editor.replaceBlocks(editor.document, docView);
                }
            } catch (error) {
                console.log(error);
            }
        };
        selectDoc();
    }, []);

    /** 문서 제목 */
    const handleChange = (e) => {
        setDocTitle(e.target.value);
        setDocList(prev => 
            prev.map((doc, index) => 
                index === eachDocIndex ? { ...doc, title: e.target.value } : doc
            )
        );
        pageRef.current.title = e.target.value;
    };

    /** 여기까지 */

    return (
        <>
            <div className="chatInfo" style={{ justifyContent: 'space-between', padding: '14px 0' }}>

                <div>{loading && <input type="text" value={docTitle} onChange={handleChange} />}</div>

                <label htmlFor="" style={{ display: 'flex'}}>

                    {(pageRef.current.owner === userId) && 
                        <span onClick={(e) => handleAddMemberClick(pageRef.current.pno)}>
                            <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                        </span>
                    }
                    
                    {(pageRef.current.owner === userId) && 
                        <span onClick={(e) => deleteDoc(pageRef.current.pno)}>
                            <FontAwesomeIcon icon={faTrashCan} /> &nbsp;삭제
                        </span>
                    }

                    {(pageRef.current.owner !== userId) && 
                        <span onClick={(e) => exitDoc(pageRef.current.pno)}>
                            <FontAwesomeIcon icon={faDoorOpen} /> &nbsp;나가기
                        </span>
                    }

                </label>

            </div>

            <div className="docEditor">
                <div className="pageMain">{pageRef && <BlockNoteView editor={editor} />}</div>
            </div>
        </>
    );
};

export default DocWriteComponent;

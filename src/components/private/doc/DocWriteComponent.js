import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { getDocContent, saveDoc } from "../../../api/DocApi";

const DocWriteComponent = ({eachDocView, submitDoc}) => {

    const doc = new Y.Doc();
    const provider = useRef(null);

    /** 제목 관리 */
    const [docTitle, setDocTitle] = useState("");

    /** 페이지 정보 보관하는 useRef */
    const pageRef = useRef({
        pno: "",
        title: "",
        owner: "",
        rDate: "",
        document: "",
    });

    /** 랜더링 시점 관리 useState */
    const [loading, setLoading] = useState(false);

    /** 소켓 연결 useEffect */
    useEffect(() => {
        let roomId = "docId" + eachDocView;
        if (eachDocView) {
            provider.current = new WebrtcProvider(roomId, doc, { signaling: ['ws://127.0.0.1:8080/onepie/doc'] });

            return () => {
                submitDoc(editor.document, pageRef.current);
                provider.current.destroy();
            };
        }
    }, [eachDocView]);

    /** 에디터 기본 설정 (collaboration) */
    const editor = useCreateBlockNote({
        defaultStyles: true,
        uploadFile: (file) => Promise.resolve(''),
        collaboration: {
            provider: provider.current,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: "My Username",
                color: "#ff0000",
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
                console.log(editor.document.length)
                if (editor.document.length === 1) {
                    console.log(response.document)
                    const docView = JSON.parse(response.document);
                    editor.replaceBlocks(editor.document, docView); 
                }
            } catch (error) {
                console.log(error);
            }
        }
        selectDoc();
    }, []);

    const handleChange = (e) => {
        setDocTitle(e.target.value);
        pageRef.current.title = e.target.value;
    };
/** 여기까지 */


  return (
    <>
    <div className="chatInfo" style={{justifyContent:"space-between", padding:"20px 0"}}>
        <div>
            {loading &&  
                <input type="text" value={docTitle} onChange={handleChange}/>
            }
        </div>
        <label htmlFor="" style={{display:"flex"}}>
            <span>
                <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
            </span>
            <span>
                <FontAwesomeIcon icon={faGear} /> &nbsp;설정
            </span>
        </label>
    </div>

    <div className='docEditor'>
        {/** 여기 */}
        <div className='pageMain'>
            {pageRef && <BlockNoteView editor={editor}/>}
        </div>
    </div>
    </>
  )
}

export default DocWriteComponent
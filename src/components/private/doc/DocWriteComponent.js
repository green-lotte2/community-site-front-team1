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

const DocWriteComponent = ({eachDocView}) => {

    const doc = new Y.Doc();
    const provider = useRef(null);
    const destory = {
        id: "initialBlockId",
        type: "paragraph",
        content: "",
        props : {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
        }
      }

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

    /** 소켓 연결 useEffect */
    useEffect(() => {
        let roomId = "docId" + eachDocView;
        if (eachDocView) {
            provider.current = new WebrtcProvider(roomId, doc, { signaling: ['ws://127.0.0.1:8080/onepie/doc'] });

            return () => {
                //submitDoc();
                provider.current.destroy();
            };
        }
    }, [eachDocView]);


    /** 페이지 정보 보관하는 useState */
    const [page, setPage] = useState({
        pno: "",
        title: "",
        owner: "",
        rDate: "",
        document: "",
    });

    /** 페이지 로드될 때 이터 불러오기 */
    useEffect(() => {
        const selectDoc = async () => {
            try {
                const response = await getDocContent(eachDocView);
                if (editor.document.length === 1) {
                    setPage(response);
                    for(let i=0 ; i < 1; i++){
                        const docView = JSON.parse(response.document);
                        console.log(typeof docView)
                        
                        editor.replaceBlocks(editor.document, docView); 
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        selectDoc();
    }, [eachDocView]);

    /** 서버로 데이터 전송 테스트 */
    const submitDoc = async () => {
        // 에디터에 입력한 내용 JSON으로 변환
        const docContent  = JSON.stringify(editor.document);

        try {
            const response = await saveDoc({...page, document: docContent});
            setPage(response);
        } catch (error) {
            console.log(error);
        }
        
    }
/** 여기까지 */


  return (
    <>
    <div className="chatInfo" style={{justifyContent:"space-between", padding:"20px 0"}}>
        <div>문서 이름 {eachDocView} </div>
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
            {page && <BlockNoteView editor={editor}/>}
            
            <button onClick={submitDoc}>저장</button>
        </div>
    </div>
    </>
  )
}

export default DocWriteComponent
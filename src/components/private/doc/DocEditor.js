import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useRef, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { getDocContent, saveDoc } from "../../../api/DocApi";

const DocEditor = () => {

    const doc = new Y.Doc();
    const provider = useRef(null);

    /** 소켓 연결 useEffect */
    useEffect(() => {
        // 컴포넌트가 마운트될 때 WebrtcProvider를 생성합니다.
        provider.current = new WebrtcProvider('test111111', doc, { signaling: ['ws://127.0.0.1:8080/onepie/doc'] });
        // 컴포넌트가 언마운트될 때 provider를 정리합니다.

        return () => {
            submitDoc();
            provider.current.destroy();
        };
    }, []);
  
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

    /** 페이지 정보 보관하는 useState */
    const [page, setPage] = useState({
        pno: 1,
        title: "",
        owner: "",
        rDate: "",
        document: "",
    });

    /** 페이지 로드될 때 이터 불러오기 */
    useEffect(() => {
        const selectDoc = async () => {
            console.log(page);
            try {
                const response = await getDocContent(page);
                console.log(response);

                if (editor.document.length === 1) {
                    setPage(response);
                    for(let i=0 ; i < 1; i++){
                        const docView = JSON.parse(response.document);
                        console.log(docView)                    
                        editor.insertBlocks(docView, docView[i].id, "after");
                        console.log("성공");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        selectDoc();
    }, []);

    /** 서버로 데이터 전송 테스트 */
    const submitDoc = async () => {
        // 에디터에 입력한 내용 JSON으로 변환
        const docContent  = JSON.stringify(editor.document);

        try {
            const response = await saveDoc({...page, document: docContent});
            console.log(response);
            setPage(response);
        } catch (error) {
            console.log(error);
        }
        
    }
/** 여기까지 */

  return (
    <div className='pageMain'>
        <BlockNoteView
            editor={editor}
        />
        <button onClick={submitDoc}>저장</button>
    </div>
  )
}

export default DocEditor;
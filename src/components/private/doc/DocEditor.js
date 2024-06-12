import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useRef, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

const DocEditor = () => {

    const doc = new Y.Doc();
    const provider = useRef(null);
    const [ex, setEx] = useState([
        {
          type: "paragraph",
          content: "Welcome to this demo!",
        },
      ],)

    /** 소켓 연결 useEffect */
    useEffect(() => {
        // 컴포넌트가 마운트될 때 WebrtcProvider를 생성합니다.
        provider.current = new WebrtcProvider('test111111', doc, { signaling: ['ws://127.0.0.1:8080/onepie/testaa'] });
        // 컴포넌트가 언마운트될 때 provider를 정리합니다.
        return () => {
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

/** 저장 테스트 */
    async function saveToStorage(jsonBlocks) {
        // Save contents to local storage. You might want to debounce this or replace
        // with a call to your API / database.
        localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
    }

    async function loadFromStorage() {
        // Gets the previously stored editor contents.
        const storageString = localStorage.getItem("editorContent");
        return storageString
          ? JSON.parse(storageString)
          : undefined;
      }

      /** 페이지 로드될 때 스토리지에서 꺼내와서 editor 업데이트 */
      useEffect(() => {
          loadFromStorage().then((data) => {
            console.log(data)
            try {
                for(let i=0 ; i < 1; i++){
                    console.log(data[i])
                    console.log(data[i].id)
                    editor.insertBlocks(data, data[i].id, "after");
                    console.log("성공")
                }
            } catch (error) {
              console.error('Error inserting inline content:', error);
            }
          });
      }, []);

      
/** 여기까지 */


    /** 데이터 확인용 핸들러 2개 */
    const [blocks, setBlocks] = useState([]);

    const editorSelectHandler = () => {
        const selection = editor.getSelection();
        if (selection !== undefined) {
            setBlocks(selection.blocks);
        } else {
            setBlocks([editor.getTextCursorPosition().block]);
        }
    }
    const check = () => {
        console.log(editor.document)
        console.log(doc)
        console.log(editor)
    }
    /** 여기까지 */

  return (
    <div className='pageMain'>
        <BlockNoteView
            editor={editor}
            onSelectionChange={editorSelectHandler}
            onChange={() => {
                saveToStorage(editor.document)}}
        />
        <div>Selection JSON:</div>
        <div className={"item bordered"}>
            <pre>
                <code>{JSON.stringify(blocks, null, 2)}</code>
            </pre>
        </div>
        <button onClick={check}>확인</button>
    </div>
  )
}

export default DocEditor;
import React, { useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./DocEditorTool";
import { saveDoc } from "../../../api/DocApi";

const DocEditor = () => {

    const test = {
        blocks: [
          {
            id: "121ff12",
            type: "header",
            data: {
              text: "안녕하세요",
              level: "2"
            },
          },
          {
            id: "122ff12",
            type: "code",
            data: {
              code: "안녕하세요",
            },
          },
        ],
        time: 1635603431943,
        version: "2.22.2",
      };

    const ReactEditorJS = createReactEditorJS({
        holder: "editor-container",
      });

      const editorCore = useRef(null);

      const handleInitialize = React.useCallback((instance) => {
        editorCore.current = instance;
      }, []);

      const check = async () => {
        try {
            const savedData = await editorCore.current.save();
            console.log('data:', savedData);
          } catch (error) {
            console.error('failed:', error);
          }
      }

    /** 내용 저장 핸들러 */
    const handleSave = async () => {
        try {
            const docData = await editorCore.current.save();
            console.log('data:', docData);

            const formData = new FormData();
            formData.append(docData);

            const response = await saveDoc(formData);
            console.log(response);

        } catch (error) {
            console.error('failed:', error);
        }
    }
      

  return (
    <>
    <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        defaultValue={test}
    />
    <button onClick={check}>확인</button>
    <button onClick={handleSave}>저장</button>
    </>
  )
}

export default DocEditor
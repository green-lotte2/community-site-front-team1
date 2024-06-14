import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import DocListComponent from '../../components/private/doc/DocListComponent'
import DocWriteComponent from '../../components/private/doc/DocWriteComponent'
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';
import { getDocList, saveDoc, setNewDoc } from '../../api/DocApi';

const DocPage = () => {

  const loginSlice = useSelector((state) => state.loginSlice);
  const userId = loginSlice.userId;

  /** 문서 목록 useState */
  const [docList, setDocList] = useState([]);

  /** 새 문서 생성 감지 useState */
  const [newDocState, setNewDocState] = useState("");

  /** 문서 내용 조회 상태? */
  const [eachDocView, setEachDocView] = useState("");
  const [docState, setDocState] = useState(false);

  /** 페이지 로드될때 문서 목록 조회 */
  useEffect(()=>{
    const selectDocList = async () => {
      try {
        const response = await getDocList(userId);
        setDocList(response);

      } catch (error) {
        console.log(error)
      }
    }
    selectDocList();
  }, [newDocState])

    /** 문서 목록 클릭 시 문서 번호 가져오는 핸들러 */
    const openDocument = (pno) => {
      setDocState(false);
      setTimeout(() => {
        setEachDocView(pno);
        setDocState(true);
      }, 100);
    }

    /** 서버로 데이터 전송 테스트 */
    const submitDoc = async (document, page) => {
      const docContent  = JSON.stringify(document);

      const saveData = {
        pno : page.pno,
        owner : page.owner,
        rDate : page.rDate,
        title : page.title,
        document : docContent
      }

      try {
          const response = await saveDoc(saveData);
      } catch (error) {
          console.log(error);
      }
  }

  /** 새 문서 생성 */
  const createDoc = async () => {
    try {
        const response = await setNewDoc(userId);
        setNewDocState(response);
      } catch (error) {
        console.log(error)
      }
  }


  return (
    <MainLayout>
        <div className='chatBox'>
            
            {/** 문서 목록 */}
            <DocListComponent docList={docList} openDocument={openDocument} loginSlice={loginSlice} createDoc={createDoc}/>

            {/** 문서 편집 */}
            <div className="contentBox boxStyle8">
              {(docState && eachDocView) && 
                <DocWriteComponent eachDocView={eachDocView} submitDoc={submitDoc} />
              }
            </div>
        </div>
        
    </MainLayout>
  )
}

export default DocPage
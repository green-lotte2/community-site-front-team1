import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import DocListComponent from '../../components/private/doc/DocListComponent'
import DocWriteComponent from '../../components/private/doc/DocWriteComponent'
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';
import { getDocList } from '../../api/DocApi';

const DocPage = () => {

  const loginSlice = useSelector((state) => state.loginSlice);
  const userId = loginSlice.userId;

  /** 문서 목록 useState */
  const [docList, setDocList] = useState([]);

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
  }, [])

  /** 문서 목록 클릭 시 문서 번호 가져오는 핸들러 */
  const openDocument = (pno) => {
    setDocState(false);
    setTimeout(() => {
      setEachDocView(pno);
      setDocState(true);
    }, 100);
  }

  return (
    <MainLayout>
        <div className='chatBox'>
            
            {/** 문서 목록 */}
            <DocListComponent docList={docList} openDocument={openDocument}/>

            {/** 문서 편집 */}
            <div className="contentBox boxStyle8">
              {(docState && eachDocView) && 
                <DocWriteComponent eachDocView={eachDocView} />
              }
            </div>
        </div>
        
    </MainLayout>
  )
}

export default DocPage
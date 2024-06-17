import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import DocListComponent from '../../components/private/doc/DocListComponent'
import DocWriteComponent from '../../components/private/doc/DocWriteComponent'
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';
import { deleteDocApi, getDocList, saveDoc, selectMember, setNewDoc } from '../../api/DocApi';
import AddStfComponent from '../../components/private/AddStfComponent';

const DocPage = () => {

  const loginSlice = useSelector((state) => state.loginSlice);
  const userId = loginSlice.userId;

  /** 문서 목록 useState */
  const [docList, setDocList] = useState([]);

  /** 새 문서 생성 감지 useState */
  const [newDocState, setNewDocState] = useState("");

  /** 문서 내용 조회 상태? */
  const [eachDocView, setEachDocView] = useState("");
  const [eachDocIndex, setEachDocIndex] = useState("");
  const [docState, setDocState] = useState(false);

  /** 페이지 로드될때 문서 목록 조회 */
  useEffect(()=>{
    const selectDocList = async () => {
      try {
        const response = await getDocList(userId);
        setDocList(response);
        console.log("docList",docList)
      } catch (error) {
        console.log(error)
      }
    }
    selectDocList();
  }, [newDocState])

    /** 문서 목록 클릭 시 문서 번호 가져오는 핸들러 */
    const openDocument = (event, pno, index) => {
      setDocState(false);

      const docList = document.getElementsByClassName('docList');
      Array.from(docList).forEach((each) => {
        each.classList.remove('docListOn');
      });
      event.currentTarget.classList.add('docListOn');

      setTimeout(() => {
        setEachDocView(pno);
        setEachDocIndex(index);
        setDocState(true);
      }, 100);
    }

    /** 서버로 데이터 전송 */
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
    let docCount = 0;
    let makeDoc = 0;
    docList.forEach((doc, index)=>{
      if(doc.owner === userId) {
        docCount++;
      }
    })

    if (loginSlice.planState === 1) {
      makeDoc = 5;
    } else if (loginSlice.planState === 2) {
      makeDoc = 10;
    } else if (loginSlice.planState === 3) {
      makeDoc = 1000;
    }

    if (docCount >= makeDoc) {
      alert("더 이상 문서를 생성할 수 없습니다.");
      return;
    }

    try {
        const response = await setNewDoc(userId);
        setNewDocState(response);
        console.log("새거",response)
        console.log("과연?",docList.length)

        openDocument(response.pno, docList.length);
      } catch (error) {
        console.log(error)
      }
  }

  /** 문서 공동작업자 초대 */
  const [docMember, setDocMember] = useState([]);
  
  const inviteUser = async (pno) => {
    try {
      const response = await selectMember(pno);
      console.log(response);
      setDocMember((prev) => [...prev, response])
      console.log(docMember);
    } catch (error) {
      console.log(error);
    }
  }

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const handleAddMemberClick = async (pno) => {
    await inviteUser(pno);
    //setShowAddMemberModal(!showAddMemberModal);
  };

  const handleCloseModal = () => {
      setShowAddMemberModal(false);
  };

  /** 문서 삭제 */
  const deleteDoc = async (pno) => {
    try {
      const response = await deleteDocApi(pno);
      console.log(response);
      window.location.href = "/doc";
    } catch (error) {
      console.log(error);
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
                <DocWriteComponent 
                  eachDocView={eachDocView}
                  setDocList={setDocList}
                  eachDocIndex={eachDocIndex}
                  submitDoc={submitDoc} 
                  handleAddMemberClick={handleAddMemberClick}
                  deleteDoc={deleteDoc}
                  userId={userId}
                />
              }
            </div>
        </div>
        {showAddMemberModal && <AddStfComponent onClose={handleCloseModal} member={docMember}/>}
    </MainLayout>
  )
}

export default DocPage
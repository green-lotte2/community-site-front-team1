import React, { useState } from 'react'
import SideTabComponent from './SideTabComponent'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPhoneVolume, faUnlockKeyhole, faUserLarge } from '@fortawesome/free-solid-svg-icons';

const SideBoxComponent = ({ sideBarCate }) => {

  const [accordion, setAccordion]  = useState(false);

  const handleAccordion = (e) => {
    const arrow = e.target.closest(".sideTitle").querySelector(".arrow");
    setAccordion(!accordion);
    console.log(accordion);
    if (accordion) {
      arrow.innerText = "▲";
    } else {
      arrow.innerText = "▼";
    }
  }

  return (
    <div className="sideBox">
        <div className="sideTitle" onClick={handleAccordion}>
          {(sideBarCate === "private") && 
            <>
              <span><FontAwesomeIcon icon={faUserLarge} /></span>
              <div>
                <p>개인</p>
                <span className='arrow'>▲</span>
              </div>
            </>
          }
          {(sideBarCate === "article") && 
            <>
              <span><FontAwesomeIcon icon={faPenToSquare} /></span>
              <div>
                <p>게시판</p>
                <span className='arrow'>▲</span>
              </div>
            </>
          }
          {(sideBarCate === "admin") && 
            <>
              <span><FontAwesomeIcon icon={faUnlockKeyhole} /></span>
              <div>
                <p>관리자</p>
                <span className='arrow'>▲</span>
              </div>
            </>
          }
          {(sideBarCate === "cs") && 
            <>
              <span><FontAwesomeIcon icon={faPhoneVolume} /></span>
              <div>
                <p>고객센터</p>
                <span className='arrow'>▲</span>
              </div>
            </>
          }
        </div>

      {accordion && 
        <>
          {(sideBarCate === "admin") && 
            <>
              <SideTabComponent sideTabCate={"index"}></SideTabComponent>
              <SideTabComponent sideTabCate={"config"}></SideTabComponent>
              <SideTabComponent sideTabCate={"userList"}></SideTabComponent>
              <SideTabComponent sideTabCate={"articleList"}></SideTabComponent>
              <SideTabComponent sideTabCate={"articleModify?articleCateNo=1&pg=1"}></SideTabComponent>
            </>
          }
          {(sideBarCate === "private") && 
            <>
              <SideTabComponent sideTabCate={"myPage"}></SideTabComponent>
              <SideTabComponent sideTabCate={"menu1"}></SideTabComponent>
              <SideTabComponent sideTabCate={"menu2"}></SideTabComponent>
              <SideTabComponent sideTabCate={"group"}></SideTabComponent>

            </>
          }
          {(sideBarCate === "article") && 
            <>
              <SideTabComponent sideTabCate={"list?articleCateNo=1&pg=1"}></SideTabComponent>
              <SideTabComponent sideTabCate={"article1"}></SideTabComponent>
              <SideTabComponent sideTabCate={"article2"}></SideTabComponent>
            </>
          }
          {(sideBarCate === "cs") && 
            <>
              <SideTabComponent sideTabCate={"csList"}></SideTabComponent>
              <SideTabComponent sideTabCate={"csTerms"}></SideTabComponent>
            </>
          }
        </>
      }
        
    </div>
  )
}

export default SideBoxComponent;
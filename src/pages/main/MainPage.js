import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout';

const MainPage = () => {
  return (
    <MainLayout>
      <div className="contentBox boxStyle1">
        <div className="contentTitle">결재</div>
        <div className="contentColumn">
          <a href="#" className="contentRow">
              <p>[24.05.22] 연차 신청</p>
              <p>승인대기</p>
          </a>
          <a href="#" className="contentRow">
              <p>[24.05.23] 연차 신청</p>
              <p>승인대기</p>
          </a>
          <a href="#" className="contentRow">
              <p>[24.05.20] 비품구매 결재건</p>
              <p>승인대기</p>
          </a>
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="contentTitle">생일</div>
        <div className="contentColumn">
          <a href="#" className="contentRow">
              <p>[24.05.22] 경영지원본부 인사/총무팀</p>
              <p>홍길동 대리</p>
          </a>
          <a href="#" className="contentRow">
              <p>[24.05.23] 시스템사업본부 공공영업팀</p>
              <p>김유신 대리</p>
          </a>
          <a href="#" className="contentRow">
              <p>[24.05.25] 개발사업부 SW개발</p>
              <p>김춘추 과장</p>
          </a>
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="contentTitle">ToDo</div>

        <div className="contentColumn">
          <div className="contentRow">
            <div className="contentWithCheck">
              <input type="checkbox"/>
              <p>ㅁㅁㅁ 거래처 방문</p>
            </div>
            <p>24.05.22 14:00</p>
          </div>

          <div className="contentRow">
            <div className="contentWithCheck">
                <input type="checkbox"/>
                <p>ㅁㅁㅁ 프로젝트 준비</p>
            </div>
            <p>24.05.22 16:00</p>
          </div>

          <div className="contentRow">
            <div className="contentWithCheck">
              <input type="checkbox"/>
              <p>김춘추 과장님 면담</p>
            </div>
            <p>24.05.23 10:00</p>
          </div>
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="profileRow">
          <img className="contentImg" src="../images/iconSample3.png" alt=""/>
          <div className="contentColumn profileContent">
            <p>홍길동 대리</p>
            <p>시스템사업본부 공공영업팀</p>
            <p>010-1234-5678</p>
            <p>abcd1234@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="contentBox boxStyle5">
        <img src="../images/캘린더.PNG" alt=""/>
      </div>

      <div className="contentBox boxStyle6">
        <div className="contentTitle">공지사항</div>
        <div className="contentColumn">
          <a href="#" className="contentRow">
            <p className="hidden">그룹웨어 프로젝트 스토리보드 회의 결과 공지</p>
            <p>24.05.22</p>
          </a>
          <a href="#" className="contentRow">
            <p className="hidden">그룹웨어 프로젝트 데이터베이스 구축 회의 결과 공지</p>
            <p>24.05.23</p>
          </a>
          <a href="#" className="contentRow">
            <p className="hidden">그룹웨어 프로젝트 서버구축 회의 결과 공지</p>
            <p>24.05.25</p>
          </a>
        </div>
      </div>
    </MainLayout>
  )
}

export default MainPage;
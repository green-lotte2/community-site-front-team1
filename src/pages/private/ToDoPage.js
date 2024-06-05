import React from 'react'
import MainLayout from '../../layout/MainLayout'

const ToDoPage = () => {
  return (
    <MainLayout>
        <div className='chatBox'>
          <div className="contentBox boxStyle10">
            <div className='todoRow'>
              <p>TODO</p>
            </div>

            <div className='todoRow'>
              <div>
                <input type="checkbox" />
                <button>삭제</button>
              </div>
              <button>생성</button>
            </div>
            
            <div className='todoColumn'>
              <div className='todoBox'>
                <input type="checkbox" />
                <p>점심에 돈가스 먹기</p>
              </div>
            </div>

          </div>
          <div className="contentBox boxStyle10">

          </div>
        </div>
    </MainLayout>
  )
}

export default ToDoPage;
import React from 'react'
import MainLayout from '../../layout/MainLayout'
import DocListComponent from '../../components/private/doc/DocListComponent'
import DocWriteComponent from '../../components/private/doc/DocWriteComponent'

const DocPage = () => {
  return (
    <MainLayout>
        <div className='chatBox'>
            
            {/** 문서 목록 */}
            <DocListComponent></DocListComponent>

            {/** 문서 편집 */}
            <DocWriteComponent></DocWriteComponent>
            
        </div>
        
    </MainLayout>
  )
}

export default DocPage
import React from 'react'
import MainLayout from '../../layout/MainLayout'
import ProjectListComponent from '../../components/private/project/ProjectListComponent'
import ProjectBoxComponent from '../../components/private/project/ProjectBoxComponent'

const ProjectPage = () => {
  return (
    <MainLayout>
        <div className='chatBox'>
            
            <ProjectListComponent></ProjectListComponent>

            <ProjectBoxComponent></ProjectBoxComponent>

        </div>
    </MainLayout>
  )
}

export default ProjectPage
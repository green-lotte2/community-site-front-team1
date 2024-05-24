import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'




function FileUpload(){

  
  const dropHandler = (files) => {

    files.forEach((file, index) => {
      console.log(`File ${index + 1}:`);
      console.log("Name:", file.name);
      console.log("Size:", file.size);
      console.log("Type:", file.type);
      console.log("Last Modified Date:", file.lastModifiedDate);
    });


    let formData = new FormData();
    formData.append("file", files[0]);
    console.log(formData[0])
       // 서버에 파일 전송
    // 서버에 파일 전송
    axios.post('http://localhost:8080/onepie/register', formData, {header: {
      'Content-Type':'multipart/form-data'}
    })
      .then(response => {
        if (response.data.success) {
          alert('파일 저장 성공!!!!!!');
        } else {
          alert('파일 저장 실패');
        }
      })
      .catch(error => {
        console.error('파일 저장 중 오류 발생:', error);
        alert('파일 저장 중 오류 발생');
      });
    }
    return(
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                <div style={{width:130,height:120,border:'1px solid lightgray', display:'flex',alignSelf:'center',justifyContent:'conter'}} 
                  {...getRootProps()}>
                  <input {...getInputProps()} />
                </div>
            )}
          </Dropzone>
        </div>
    )
}


export default FileUpload
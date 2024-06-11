import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import DocEditor from './DocEditor';

const DocWriteComponent = () => {

    const [rows, setRows] = useState([{ id: uuidv4(), value: '' }]);
    const inputRefs = useRef([]);

    useEffect(() => {
        // 마지막 입력 필드에 포커스를 맞춥니다.
        if (inputRefs.current.length > 0) {
        inputRefs.current[inputRefs.current.length - 1].focus();
        }
    }, [rows]);

    const handleKeyPress = (event, index) => {
        if (event.key === 'Enter') {
        setRows([...rows, { id: uuidv4(), value: '' }]);
        }
    };

    const handleChange = (event, index) => {
        const updatedRows = rows.map((row, i) => {
        if (i === index) {
            return { ...row, value: event.target.value };
        }
        return row;
        });
        setRows(updatedRows);
    };


  return (
    <div className="contentBox boxStyle8">
        <div className="chatInfo" style={{justifyContent:"space-between", padding:"20px 0"}}>
            <div>문서 이름</div>
            <label htmlFor="" style={{display:"flex"}}>
                <span>
                    <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                </span>
                <span>
                    <FontAwesomeIcon icon={faGear} /> &nbsp;설정
                </span>
            </label>
        </div>

        <div className='docEditor'>
            {/** 여기 */}
            <DocEditor/>
        </div>

    </div>
  )
}

export default DocWriteComponent
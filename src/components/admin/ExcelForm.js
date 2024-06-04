import React from 'react';
import XLSX from 'xlsx-js-style';

const statusMapping = {
    Break: '휴직',
    Active: '재직',
    Departed: '퇴직',
};

// npm install xlsx-js-style --legacy-peer-deps 필요
const ExcelForm = ({ userList }) => {
    const excelDown = () => {
        try {
            console.log(userList);
            console.log('excelDown 호출');

            // Excel 파일 생성 및 다운로드
            const wb = XLSX.utils.book_new();
            const headerStyle = {
                font: { bold: true, color: { rgb: '000000' }, name: '함초롱바탕', sz: 13 },
                fill: { fgColor: { rgb: 'BC8F8F' } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: {
                    left: { style: 'thin', color: { auto: 1 } },
                    right: { style: 'thin', color: { auto: 1 } },
                    top: { style: 'thin', color: { auto: 1 } },
                    bottom: { style: 'thin', color: { auto: 1 } },
                },
            };
            const dataStyle = {
                font: { color: { rgb: '000000' }, name: '함초롱바탕', sz: 11 },
                fill: { fgColor: { rgb: 'FFFAFA' } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: {
                    left: { style: 'thin', color: { auto: 1 } },
                    right: { style: 'thin', color: { auto: 1 } },
                    top: { style: 'thin', color: { auto: 1 } },
                    bottom: { style: 'thin', color: { auto: 1 } },
                },
            };

            // 열의 폭을 정의
            const colWidths = [80, 120, 80, 100, 80, 130];

            // cols 속성을 사용하여 각 열의 폭을 조절
            const cols = colWidths.map((width) => ({ wpx: width }));

            const headerRow = [
                { v: '사원번호', t: 's', s: headerStyle },
                { v: '사원명', t: 's', s: headerStyle },
                { v: '현황', t: 's', s: headerStyle },
                { v: '부서', t: 's', s: headerStyle },
                { v: '직급', t: 's', s: headerStyle },
                { v: '전화번호', t: 's', s: headerStyle },
            ];

            // 조회해온 데이터로 map 돌려야함.
            const dataRows = userList.dtoList.map((stf) => [
                { v: stf.stfNo, t: 's', s: dataStyle }, // 사원번호
                { v: stf.stfName, t: 's', s: dataStyle }, // 사원명
                { v: statusMapping[stf.stfStatus] || stf.stfStatus, t: 's', s: dataStyle }, // 현황
                { v: stf.strDptName, t: 's', s: dataStyle }, // 부서
                { v: stf.strRnkNo, t: 's', s: dataStyle }, // 직급
                { v: stf.stfPh, t: 's', s: dataStyle }, // 전화번호
            ]);

            const rows = [headerRow, ...dataRows];

            // 새로운 Sheet 객체 생성
            const ws = XLSX.utils.aoa_to_sheet(rows);

            // cols 속성 적용
            ws['!cols'] = cols;

            // workbook에 추가
            XLSX.utils.book_append_sheet(wb, ws, '사원 목록');

            // 파일 다운로드
            XLSX.writeFile(wb, 'employee_list.xlsx');

            console.log('Excel 파일 생성 및 다운로드 완료');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <button variant="success" id="btn_excelDown" onClick={excelDown}>
                목록 내려받기
            </button>
        </div>
    );
};

export default ExcelForm;

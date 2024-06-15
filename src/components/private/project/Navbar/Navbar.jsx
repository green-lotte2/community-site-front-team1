import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import AddStfComponent from '../../AddStfComponent';
export default function Navbar({ switchTheme, selectedKanbanName }) {
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    const handleAddMemberClick = () => {
        setShowAddMemberModal(!showAddMemberModal);
    };

    const handleCloseModal = () => {
        setShowAddMemberModal(false);
    };
    return (
        <div className="navbar">
            <h2>{selectedKanbanName ? `${selectedKanbanName}` : 'Kanban Board'}</h2>

            <label htmlFor="" style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, marginRight: '30px' }}>
                <span
                    style={{
                        display: 'flex',
                        fontSize: '16px',
                        margin: '0 10px',
                        alignSelf: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={handleAddMemberClick}
                >
                    <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                </span>
                <span
                    style={{
                        display: 'flex',
                        fontSize: '16px',
                        margin: '0 10px',
                        alignSelf: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <FontAwesomeIcon icon={faGear} /> &nbsp;설정
                </span>
            </label>

            <div>
                <input
                    type="checkbox"
                    className="checkbox"
                    id="checkbox"
                    style={{ transition: 'all 200ms' }}
                    onChange={switchTheme}
                />
                <label for="checkbox" class="label">
                    <i className="fas fa-moon fa-sm"></i>
                    <i className="fas fa-sun fa-sm"></i>
                    <div className="ball" />
                </label>
            </div>
            {/* <button>Switch theme</button> */}
            {showAddMemberModal && <AddStfComponent onClose={handleCloseModal} />}
        </div>
    );
}

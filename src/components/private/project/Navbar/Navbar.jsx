import React from 'react';
import './Navbar.css';
export default function Navbar({switchTheme, selectedKanbanName}) {
    return (
        <div className="navbar">
            <h2>{selectedKanbanName ? `${selectedKanbanName}` : 'Kanban Board'}</h2>
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
        </div>
    );
}

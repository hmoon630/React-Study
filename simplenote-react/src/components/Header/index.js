import React from 'react';
import './index.css';
import logo from '../../logo.png';

class Header extends React.Component {
    render () {
        const { onAddNote, onDeleteNote, onSaveNote } = this.props;
        return (
            <div className="header">
                <div className="title">
                    <a href="https://github.com/hmoon630" target="_blank" rel="noopener noreferrer">
                        <img className="logo" src={logo} />
                    </a>
                    <span>현문's 심플노트</span>
                </div>
                <div className="buttons">
                    <button onClick={onSaveNote}>저장</button>
                    <button onClick={onAddNote}>추가</button>
                    <button onClick={onDeleteNote}>삭제</button>
                </div>
            </div>
        );
    }
}

export default Header;
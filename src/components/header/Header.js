import React, { useContext, useState } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import './Header.css'
import logo from '../../assets/mawesome1080x1080.png'
import avatar from '../../assets/carrot_bunny.jpg'
import { useHistory } from 'react-router-dom';
import { UnitContext } from '../../contexts/unitsContext';

const Header = () => {

  const { isWideScreen } = useContext(ResizeContext)

  const history = useHistory();

  const [avatarStatus, setAvatarStatus] = useState(false)
  const {unit, setUnit} = useContext(UnitContext);

  function logoClicked() {
    history.push('/')
  }

  function toggleAvatar() {
    setAvatarStatus(!avatarStatus);
  }

  function toggleUnits(){
    setUnit(unit === 'metrics' ? 'imperial' : 'metrics')
    toggleAvatar()
  }

  return (
    <div className={`App-Header  ${isWideScreen ? 'wide-screen' : ''}`}>
      <img onClick={logoClicked} className="header-logo" src={logo} alt="logo" />
      <div className="header-title">mawesome</div>
      <img className="header-avatar" src={avatar} alt="bun" onClick={toggleAvatar} />
      { avatarStatus && <div className="avatar-list">
        <span>Guest Bunny</span>
        <span onClick={toggleUnits}>{unit === 'imperial' ? 'Metric' : 'Imperial'} values</span>
      </div>}
    </div>
  );
};

export default Header;
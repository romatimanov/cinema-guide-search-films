import { useEffect, useState } from 'react';
import './profileSettings.css';
import { fetchProfileData } from '../Module/Module';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { setLoginStatus } from '../redux/actions';
import { useDispatch } from 'react-redux';

export function ProfileSettings() {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();

    try {
      fetch('https://cinemaguide.skillbox.cc/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      localStorage.removeItem('isLoggedIn');
      dispatch(setLoginStatus(false));
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile-about">
      {profileData && (
        <>
          <div className="profile-info">
            <div className="profile-img">
              {profileData.name &&
                profileData.surname &&
                profileData.name[0] + profileData.surname[0]}
            </div>
            <div className="profile-content">
              <div className="profile-text">Имя Фамилия</div>
              <div className="profile-data">
                {profileData.name &&
                  profileData.surname &&
                  profileData.name + ' ' + profileData.surname}
              </div>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-img"></div>
            <div className="profile-content">
              <div className="profile-text">Электронная почта</div>
              <div className="profile-text">{profileData.email}</div>
            </div>
          </div>
          <Button text="Выйти" onClick={handleLogout} />
        </>
      )}
    </div>
  );
}

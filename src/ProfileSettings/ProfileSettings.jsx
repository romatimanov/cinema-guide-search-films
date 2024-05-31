import { useEffect, useState } from 'react';
import './profileSettings.css';
import { fetchProfileData } from '../Module/Module';

export function ProfileSettings() {
  const [profileData, setProfileData] = useState(null);

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
        </>
      )}
    </div>
  );
}

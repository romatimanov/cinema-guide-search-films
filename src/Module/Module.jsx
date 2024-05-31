import { addToFavorites } from '../redux/actions';

export const fetchModule = async (uri) => {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function fetchAnsfer(isLoading, isError) {
  if (isLoading) {
    return <div className="films-main">Loading...</div>;
  }

  if (isError) {
    return <div className="films-main">Error: Something went wrong</div>;
  }

  return null;
}

export const handleFavoriteClick = async (filmData, dispatch) => {
  const filmId = filmData.id;

  dispatch(addToFavorites(filmId));

  try {
    const response = await fetch('https://cinemaguide.skillbox.cc/favorites', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: filmId }).toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchProfileData = async () => {
  try {
    const response = await fetch('https://cinemaguide.skillbox.cc/profile', {
      credentials: 'include',
    });

    if (response.ok) {
      const profile = await response.json();
      return profile;
    } else {
      throw new Error('Failed to fetch profile');
    }
  } catch (error) {
    return null;
  }
};

export const fetchData = async (setFavoritesResult) => {
  try {
    const profileData = await fetchProfileData();
    setFavoritesResult(profileData.favorites);
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
  }
};

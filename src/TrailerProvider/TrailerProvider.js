import React, { createContext, useState, useContext } from 'react';

const TrailerContext = createContext();

export const TrailerProvider = ({ children }) => {
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [selectedTrailerUrl, setSelectedTrailerUrl] = useState(null);

  const handleTrailerClick = (trailerUrl) => {
    setSelectedTrailerUrl(`https://www.youtube.com/embed/` + trailerUrl);
    setShowTrailerModal(true);
  };

  const handleCloseModal = () => {
    setShowTrailerModal(false);
  };

  return (
    <TrailerContext.Provider
      value={{
        showTrailerModal,
        selectedTrailerUrl,
        handleTrailerClick,
        handleCloseModal,
      }}
    >
      {children}
    </TrailerContext.Provider>
  );
};

export const useTrailer = () => {
  return useContext(TrailerContext);
};

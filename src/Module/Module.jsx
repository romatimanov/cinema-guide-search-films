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

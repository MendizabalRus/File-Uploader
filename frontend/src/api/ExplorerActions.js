const BASE_URL = 'http://localhost:8080/api';

export const getFolder = async (folderId) => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error);
  }

  return await response.json();
};

export const getFavorites = async () => {
  const response = await fetch(`${BASE_URL}/favorites`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Could not fetch favorites');
  }

  return response.json();
};

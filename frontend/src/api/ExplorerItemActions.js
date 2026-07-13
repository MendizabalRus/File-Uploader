const BASE_URL = 'http://localhost:8080/api';

export const renameItem = async (
  type,
  id,
  data,
) => {

  const response = await fetch(
    `${BASE_URL}/${type}s/update/${id}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const result = await response.json()
    throw new Error(result.error);
  }

  return response.json();
};

export const deleteItem = async (
  type,
  id,
) => {
  const response = await fetch(
    `${BASE_URL}/${type}s/delete/${id}`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const result = response.json()
    throw new Error(result.error);
  }

  return response.json()
};

export const toggleFavorite = async (
  type,
  id,
  favorite,
) => {
  const action = favorite
    ? 'delete'
    : 'update';

  const response = await fetch(
    `${BASE_URL}/favorites/${action}/${type}s/${id}`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const result = response.json()
    throw new Error(result.error);
  }

  return response.json();
};
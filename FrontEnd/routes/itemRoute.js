const baseURL = 'http://localhost:8081/api';

export const fetchAllData = async () => {
  try {
    const response = await fetch(`${baseURL}/combinations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateItems = async (discoveredItemIds) => {
  try {
    const response = await fetch(`${baseURL}/update_items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discovered_item_ids: discoveredItemIds }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating items:', error);
    throw error;
  }
};

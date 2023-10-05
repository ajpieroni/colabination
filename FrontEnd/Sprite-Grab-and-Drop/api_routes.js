export function loadItems() {
    return fetch("/api/items")
      .then(response => response.json())
      .catch(error => console.error("Error fetching items:", error));
  }
  
  export function updateItem(itemId, updatedData) {
    return fetch(`/api/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .catch(error => console.error("Error updating item:", error));
  }
  
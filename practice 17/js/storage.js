const STORAGE_KEY = 'warehouse_items';

export const getItems = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveItems = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addItem = (item) => {
  const items = getItems();
  items.push(item);
  saveItems(items);
};

export const removeItem = (id) => {
  const items = getItems();
  const filtered = items.filter(item => item.id !== id);
  saveItems(filtered);
};
export function createTask(text, id) {
  return {
    id,
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

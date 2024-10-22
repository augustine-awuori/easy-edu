const prefix = "easy-edu/";

const store = (key: string, data: any) =>
  localStorage.setItem(getCacheFullKey(key), JSON.stringify(data));

const retrieve = (key: string) => {
  const result = localStorage.getItem(getCacheFullKey(key));

  return result ? JSON.parse(result) : result;
};

function getCacheFullKey(key: string): string {
  return `${prefix}/${key}`;
}

export default { store, retrieve };

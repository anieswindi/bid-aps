// omit keys from object
export const ObjectOmit = (obj: Record<string, any>, keys: string[]) => {
  const result = { ...obj };
  keys.forEach(function (prop) {
    delete result[prop];
  });
  return result;
};

// filter data from key and keyword
export const ObjectFilter = (data: any[], keys: string, keyword: string) => {
  return data.filter(function (obj) {
    return obj[keys].toLowerCase().includes(keyword.toLowerCase())
  });
};

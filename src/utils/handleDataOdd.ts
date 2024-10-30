export default (data: any) => {
  if (data?.length > 0 && data?.length % 2 !== 0) {
    return [...data, {}];
  }
  return data;
};

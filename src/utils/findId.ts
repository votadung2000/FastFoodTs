export default (data: any, id: number) => {
  return data.find((item: any) => item?.id === id);
};

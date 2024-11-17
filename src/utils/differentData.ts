import { differenceBy } from 'lodash';

export default (newData: any, oldData: any) => {
  let formatNewData = Object.keys(newData).map(key => ({
    key: key,
    value: newData[key],
  }));
  let formatOldData = Object.keys(oldData).map(key => ({
    key: key,
    value: oldData[key],
  }));

  let diffData = differenceBy(formatNewData, formatOldData, 'value');
  let formatDiffData = diffData.reduce((prev, curr) => {
    prev[curr?.key] = curr?.value;
    return prev;
  }, {} as { [key: string]: any });

  return formatDiffData;
};

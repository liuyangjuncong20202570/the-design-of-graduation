export const formatArr = defaultData => {
  let newArr = [];
  defaultData.forEach((item, index) => {
    let obj = {};
    obj.elName = item.elName;
    obj.id = index;
    obj.children = [];
    obj.isEl = true;
    item.elValue.map((idx, index2) => {
      obj.children.push({ elName: idx, elCount: 0, elPrice: 0 });
    });
    newArr.push(obj);
  });
  return newArr;
};

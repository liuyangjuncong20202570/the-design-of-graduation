export const CreateFormData = value => {
  const params = new FormData();
  for (let i in value) {
    params.append(i, value[i]);
  }
  return params;
};

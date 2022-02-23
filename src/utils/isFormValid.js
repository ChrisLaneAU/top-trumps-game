const isFormValid = (formVals) => Object.values(formVals).every(Boolean);

export default isFormValid;

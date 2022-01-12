const isDocumentVisible = () => {
  return document.visibilityState !== "hidden";
};

export default isDocumentVisible;

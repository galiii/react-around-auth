export const renderLoading = (isLoading, popup, strApprove) => {
  const buttonSubmit = popup.querySelector(".form__button");
  buttonSubmit.textContent = isLoading ? "Saving..." : strApprove;
  return buttonSubmit.textContent;
};

export const customFetch = (url, headers) =>
  fetch(url, headers)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`)
    );
    //.catch(console.error);

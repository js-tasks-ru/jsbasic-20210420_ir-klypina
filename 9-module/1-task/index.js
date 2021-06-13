export default function promiseClick(button) {
  return new Promise(function (resolve, reject) {
    const promiseClickEvent = (event) => {
      resolve(event);
    };

    button.addEventListener('click', promiseClickEvent, { once: true });
  });
}

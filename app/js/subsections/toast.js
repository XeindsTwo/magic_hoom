export function showToast(message, color) {
  Toastify({
    text: message,
    backgroundColor: color
  }).showToast();
}
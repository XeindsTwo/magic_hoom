document.addEventListener('DOMContentLoaded', () => {
  const methods = document.querySelectorAll('.basket__method');

  methods.forEach(method => {
    method.addEventListener('click', () => {
      methods.forEach(item => item.classList.remove('active'));
      method.classList.add('active');
    });
  });
});
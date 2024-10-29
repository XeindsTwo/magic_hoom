const input = document.getElementById('date');

const dateInputMask = (elm) => {
  const currentYear = new Date().getFullYear();

  elm.addEventListener('keypress', (e) => {
    if (e.key < '0' || e.key > '9') {
      e.preventDefault();
      return;
    }

    const len = elm.value.length;

    if (len === 0 && e.key > '3') {
      e.preventDefault();
    } else if (len === 1 && parseInt(elm.value + e.key, 10) > 31) {
      e.preventDefault();
    }

    if (len === 3 && e.key > '1') {
      e.preventDefault();
    } else if (len === 4 && parseInt(elm.value.slice(3) + e.key, 10) > 12) {
      e.preventDefault();
    }

    if (len === 2 || len === 5) {
      elm.value += '.';
    }

    if (len > 5) {
      const inputYear = parseInt(elm.value.slice(6) + e.key, 10);
      if (inputYear > currentYear) {
        e.preventDefault();
      }
    }
  });
};

dateInputMask(input);
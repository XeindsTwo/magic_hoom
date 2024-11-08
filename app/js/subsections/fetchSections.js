import {showToast} from './toast.js';

export function fetchSections() {
  fetch('../php/subsections/read.php')
    .then(response => response.json())
    .then(sections => {
      const sectionSelect = document.getElementById("sectionSelect");
      sections.forEach(section => {
        const option = document.createElement("option");
        option.value = section.id;
        option.textContent = section.name;
        sectionSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Ошибка при получении разделов:", error);
      showToast("Ошибка загрузки разделов", "red");
    });
}
import {showToast} from './toast.js';
import {closeEditModal, closeModal} from './modal.js';

export function addSubsection() {
  const sectionId = document.getElementById("sectionSelect").value;
  const title = document.getElementById("subsectionTitle").value;
  const shortTitle = document.getElementById("subsectionShortTitle").value;

  if (!sectionId || !title || !shortTitle) {
    showToast("Заполните все поля", "red");
    return;
  }

  const data = {
    section_id: sectionId,
    title: title,
    short_title: shortTitle
  };

  fetch('/php/subsections/create.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        showToast("Подраздел добавлен", "green");
        closeModal("addSubsectionModal");
        document.getElementById("subsectionTitle").value = "";
        document.getElementById("subsectionShortTitle").value = "";

        const section = document.querySelector(`[data-section-id="${result.subsection.section_id}"]`);
        const emptyCard = section.querySelector(".admin__empty");
        if (emptyCard) {
          emptyCard.remove();
        }

        let subitemsContainer = section.querySelector(".admin__subitems");
        if (!subitemsContainer) {
          subitemsContainer = document.createElement("ul");
          subitemsContainer.classList.add("admin__subitems");
          section.appendChild(subitemsContainer);
        }

        const newSubsection = createSubsectionCard(result.subsection);
        subitemsContainer.appendChild(newSubsection);
      } else {
        showToast("Ошибка добавления", "red");
      }
    })
    .catch(error => {
      console.error("Ошибка при добавлении подраздела:", error);
      showToast("Ошибка сети, повторите попытку позже", "red");
    });
}

export function saveSubsectionChanges() {
  const subsectionId = document.getElementById("editSubsectionId").value;
  const title = document.getElementById("editSubsectionTitle").value;
  const shortTitle = document.getElementById("editSubsectionShortTitle").value;
  const sectionId = document.getElementById("editSectionSelect").value;

  if (!title || !shortTitle) {
    showToast("Заполните все поля", "red");
    return;
  }

  const data = {
    id: subsectionId,
    title: title,
    short_title: shortTitle,
    section_id: sectionId
  };

  fetch('/php/subsections/update.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        showToast("Подраздел успешно обновлён", 'green');
        closeEditModal();

        const subsectionElement = document.querySelector(`[data-subsection-id="${subsectionId}"]`);
        const currentSection = subsectionElement.closest('.admin__item');
        const newSection = document.querySelector(`[data-section-id="${result.subsection.section_id}"]`);

        if (result.subsection.section_id === parseInt(subsectionElement.getAttribute("data-section-id"))) {
          subsectionElement.querySelector(".admin__item-name").textContent = `Полное имя - ${result.subsection.title}`;
          subsectionElement.querySelector(".admin__short-title").textContent = `Сокращённое имя - ${result.subsection.short_title}`;
          subsectionElement.setAttribute("data-full-name", result.subsection.title);
          subsectionElement.setAttribute("data-short-name", result.subsection.short_title);
          subsectionElement.setAttribute("data-position", result.subsection.position);
          subsectionElement.querySelector(".admin__position").textContent = `Позиция - ${result.subsection.position}`;
        } else {
          subsectionElement.remove();

          const subitemsContainerCurrent = currentSection.querySelector(".admin__subitems");
          if (subitemsContainerCurrent && subitemsContainerCurrent.children.length === 0) {
            subitemsContainerCurrent.remove();
            const emptyMessage = document.createElement("p");
            emptyMessage.classList.add("admin__empty");
            emptyMessage.textContent = "На данный момент нет созданных подразделов";
            currentSection.querySelector(".admin__name").after(emptyMessage);
          }

          let subitemsContainerNew = newSection.querySelector(".admin__subitems");
          if (!subitemsContainerNew) {
            subitemsContainerNew = document.createElement("ul");
            subitemsContainerNew.classList.add("admin__subitems");
            newSection.appendChild(subitemsContainerNew);
            const emptyMessage = newSection.querySelector(".admin__empty");
            if (emptyMessage) emptyMessage.remove();
          }

          subsectionElement.querySelector(".admin__item-name").textContent = `Полное имя - ${result.subsection.title}`;
          subsectionElement.querySelector(".admin__short-title").textContent = `Сокращённое имя - ${result.subsection.short_title}`;
          subsectionElement.setAttribute("data-full-name", result.subsection.title);
          subsectionElement.setAttribute("data-short-name", result.subsection.short_title);
          subsectionElement.setAttribute("data-position", result.subsection.position);
          subsectionElement.querySelector(".admin__position").textContent = `Позиция - ${result.subsection.position}`;

          subitemsContainerNew.appendChild(subsectionElement);
        }
      } else {
        showToast("Ошибка обновления", "red");
      }
    })
    .catch(error => {
      console.error("Ошибка при обновлении подраздела:", error);
      showToast("Ошибка сети, повторите попытку позже", "red");
    });
}

function createSubsectionCard(subsection) {
  const card = document.createElement("li");
  card.classList.add("admin__subitem");

  const position = document.createElement("p");
  position.classList.add("admin__position");
  position.textContent = `Позиция - ${subsection.position}`;

  const title = document.createElement("p");
  title.textContent = `Полное имя - ${subsection.title}`;

  const shortTitle = document.createElement("p");
  shortTitle.textContent = `Сокращённое имя - ${subsection.short_title}`;

  card.appendChild(position);
  card.appendChild(title);
  card.appendChild(shortTitle);

  return card;
}
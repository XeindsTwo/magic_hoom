import {addSubsection, saveSubsectionChanges} from './add.js';
import {fetchSections} from './fetchSections.js';
import {closeModal, openModal, openEditModal, closeEditModal} from "./modal.js";
import {deleteSubsection} from "./delete.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addSubsectionButton").addEventListener("click", addSubsection);
  fetchSections();

  document.getElementById("openAddModal").addEventListener("click", () => openModal("addSubsectionModal"));
  document.querySelectorAll('.closeAddModal').forEach(element => {
    element.addEventListener("click", () => closeModal("addSubsectionModal"))
  });

  document.querySelectorAll('.closeEditModal').forEach(element => {
    element.addEventListener("click", () => closeEditModal("editSubsectionModal"))
  });

  document.querySelectorAll('.admin__item-edit').forEach(element => {
    element.addEventListener('click', (event) => openEditModal(event.target));
  });

  document.getElementById("saveSubsectionChanges").addEventListener("click", saveSubsectionChanges);

  document.querySelectorAll('.admin__item-delete').forEach(button => {
    button.addEventListener('click', deleteSubsection);
  })
});

/*
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addSubsectionButton").addEventListener("click", addSubsection);

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
      Toastify({
        text: "Ошибка загрузки разделов",
        backgroundColor: "red"
      }).showToast();
    });
});

function openModal() {
  document.getElementById("addSubsectionModal").classList.add('active');
  document.documentElement.classList.add('active');
  document.body.classList.add('active');
}

function closeModal() {
  document.getElementById("addSubsectionModal").classList.remove('active');
  document.documentElement.classList.remove('active');
  document.body.classList.remove('active');
}

function addSubsection() {
  const sectionId = document.getElementById("sectionSelect").value;
  const title = document.getElementById("subsectionTitle").value;
  const shortTitle = document.getElementById("subsectionShortTitle").value;

  if (!sectionId || !title || !shortTitle) {
    Toastify({
      text: "Заполните все поля",
      backgroundColor: "red"
    }).showToast();
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
        Toastify({
          text: "Подраздел добавлен",
          backgroundColor: "green"
        }).showToast();
        closeModal();
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
        Toastify({
          text: "Ошибка добавления",
          backgroundColor: "red"
        }).showToast();
      }
    })
    .catch(error => {
      console.error("Ошибка при добавлении подраздела:", error);
      Toastify({
        text: "Ошибка сети, повторите попытку позже",
        backgroundColor: "red"
      }).showToast();
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

function openEditModal(button) {
  const item = button.closest('.admin__subitem');
  const subsectionId = item.getAttribute('data-subsection-id');
  const fullName = item.getAttribute('data-full-name');
  const shortName = item.getAttribute('data-short-name');
  const sectionId = item.getAttribute('data-section-id');

  document.getElementById('editSubsectionTitle').value = fullName;
  document.getElementById('editSubsectionShortTitle').value = shortName;
  document.getElementById('editSubsectionId').value = subsectionId;
  document.getElementById('editSectionSelect').value = sectionId;
  document.getElementById('editSubsectionModal').classList.add('active');
  document.documentElement.classList.add('active');
  document.body.classList.add('active');
}

function closeEditModal() {
  document.getElementById("editSubsectionModal").classList.remove('active');
  document.documentElement.classList.remove('active');
  document.body.classList.remove('active');
}

function saveSubsectionChanges() {
  const subsectionId = document.getElementById("editSubsectionId").value;
  const title = document.getElementById("editSubsectionTitle").value;
  const shortTitle = document.getElementById("editSubsectionShortTitle").value;
  const sectionId = document.getElementById("editSectionSelect").value;

  if (!title || !shortTitle) {
    Toastify({
      text: "Заполните все поля",
      backgroundColor: "red"
    }).showToast();
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
        Toastify({
          text: "Подраздел обновлен",
          backgroundColor: "green"
        }).showToast();
        closeEditModal();

        const subsectionElement = document.querySelector(`[data-subsection-id="${subsectionId}"]`);
        const currentSection = subsectionElement.closest('.admin__item');
        const newSection = document.querySelector(`[data-section-id="${sectionId}"]`);

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

        subsectionElement.querySelector(".admin__item-name").textContent = `Полное имя - ${title}`;
        subsectionElement.querySelector(".admin__short-title").textContent = `Сокращённое имя - ${shortTitle}`;
        subsectionElement.setAttribute("data-full-name", title);
        subsectionElement.setAttribute("data-short-name", shortTitle);
        subsectionElement.setAttribute("data-section-id", sectionId);

        subsectionElement.querySelector(".admin__position").textContent = `Позиция - ${subitemsContainerNew.children.length + 1}`;
        subitemsContainerNew.appendChild(subsectionElement);
      } else {
        Toastify({
          text: "Ошибка обновления",
          backgroundColor: "red"
        }).showToast();
      }
    })
    .catch(error => {
      console.error("Ошибка при обновлении подраздела:", error);
      Toastify({
        text: "Ошибка сети, повторите попытку позже",
        backgroundColor: "red"
      }).showToast();
    });
}*/

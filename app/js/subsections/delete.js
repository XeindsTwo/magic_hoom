import { showToast } from "./toast.js";

export function deleteSubsection(event) {
  const subsectionElement = event.target.closest('.admin__subitem');
  const subsectionId = subsectionElement.getAttribute('data-subsection-id');
  const sectionElement = subsectionElement.closest('.admin__item');

  const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот подраздел? Отменить удаление будет невозможно");

  if (confirmDelete) {
    fetch(`/php/subsections/delete.php?id=${subsectionId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          subsectionElement.remove();

          const subsections = sectionElement.querySelectorAll('.admin__subitem');
          const emptyMessage = sectionElement.querySelector('.admin__empty');

          if (subsections.length === 0 && !emptyMessage) {
            const emptyMsgElement = document.createElement('p');
            emptyMsgElement.classList.add('admin__empty');
            emptyMsgElement.textContent = 'На данный момент нет созданных подразделов';
            sectionElement.appendChild(emptyMsgElement);
          } else if (result.positions) { // Проверка наличия result.positions
            // Обновление позиций в DOM
            result.positions.forEach(positionData => {
              const subitem = sectionElement.querySelector(`.admin__subitem[data-subsection-id="${positionData.id}"]`);
              if (subitem) {
                subitem.setAttribute('data-position', positionData.position);
                subitem.querySelector('.admin__position').textContent = `Позиция - ${positionData.position}`;
              }
            });
          }

          showToast("Подраздел успешно удалён", "#1f791f");
        } else {
          showToast("Ошибка при удалении подраздела", "red");
        }
      })
      .catch(error => {
        console.error("Ошибка при удалении подраздела:", error);
        showToast("Ошибка сети, повторите попытку позже", "red");
      });
  }
}
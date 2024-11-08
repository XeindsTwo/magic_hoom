export function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
  document.documentElement.classList.add('active');
  document.body.classList.add('active');
}

export function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.documentElement.classList.remove('active');
  document.body.classList.remove('active');
}

export function openEditModal(button) {
  const item = button.closest('.admin__subitem');
  const subsectionId = item.getAttribute('data-subsection-id');
  const fullName = item.getAttribute('data-full-name');
  const shortName = item.getAttribute('data-short-name');
  const sectionId = item.getAttribute('data-section-id');

  document.getElementById('editSubsectionTitle').value = fullName;
  document.getElementById('editSubsectionShortTitle').value = shortName;
  document.getElementById('editSubsectionId').value = subsectionId;
  document.getElementById('editSectionSelect').value = sectionId;
  openModal("editSubsectionModal");
}

export function closeEditModal() {
  closeModal("editSubsectionModal");
}
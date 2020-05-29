const menuButtons = document.querySelectorAll('.menu-button');
menuButtons.forEach(btn => btn.addEventListener('click', selectContent));

const backButtons = document.querySelectorAll('.title > img');
backButtons.forEach(btn => btn.addEventListener('click', backHome));

let contentSection;

function selectContent(event) {
  const section = event.target.id.split('-')[0];
  contentSection = document.getElementById(`${section}-content`);
  contentSection.classList.remove('hidden');
  menuButtons.forEach(btn => btn.classList.add('hidden'));
}

export function backHome() {
  if (contentSection) contentSection.classList.add('hidden');
  menuButtons.forEach(btn => btn.classList.remove('hidden'));
}

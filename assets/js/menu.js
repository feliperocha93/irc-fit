const events = ['click', 'touchstart']

const menuButtons = document.querySelectorAll('.menu-button');
const backButtons = document.querySelectorAll('.title > img');

events.forEach(event => {
  menuButtons.forEach(btn => btn.addEventListener(event, selectContent));
  backButtons.forEach(btn => btn.addEventListener(event, backHome));
})

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

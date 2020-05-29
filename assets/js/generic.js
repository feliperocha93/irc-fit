export function selected(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

export function inputNumber(id) {
  return Number(document.getElementById(id).value);
}

export function setResult(id, layout) {
  const result = document.getElementById(id);
  result.innerHTML = layout;
  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })
}

export function alertError(message) {
  Swal.fire({
    backdrop: 'rgba(1, 2, 116, .5)',
    background: '#ffdef3',
    confirmButtonColor: '#ff3879',
    confirmButtonText: 'Entendi!',
    padding: '1em',
    html: `<span style="color: #080f48">${message}</span>`,
    title: `<span style="color: #080f48">Ops...</span>`,
    width: 550,
  });
}
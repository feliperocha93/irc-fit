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
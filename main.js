const inputEl = document.querySelector('.input-box input');
const btnAddEl = document.querySelector('.input-box .material-icons');
const listEl = document.querySelector('.list ul');

btnAddEl.addEventListener('click', () => {
  const input = inputEl.value;
  console.log(inputEl);
  console.log(input);
  const liEl = document.createElement('li');
  if (input === '') {
    return;
  }

  liEl.innerHTML = /*html*/ `
    <p>${input}</p>
    <div class="edit material-icons">border_color</div>
    <div class="delete material-icons">delete</div>
  `;

  listEl.append(liEl);
});

// new Date()
// createAttribute()
// setAttribute()
// appendChild() o
// filter()
// map()

const inputEl = document.querySelector('.input-box input');
const btnAddEl = document.querySelector('.input-box .material-icons');
const listEl = document.querySelector('.list ul');

const btnClear = document.querySelector('.delete-all');
btnClear.addEventListener('click', clearAll);

btnAddEl.addEventListener('click', addItem);

// 아이템 추가
function addItem() {
  const input = inputEl.value;
  const liEl = document.createElement('li');

  if (input === '') {
    return;
  }

  liEl.innerHTML = /*html*/ `
    <p>${input}</p>
    <div class="edit material-icons">border_color</div>
    <div class="delete material-icons">delete</div>
  `;
  listEl.appendChild(liEl);

  const btnDelete = liEl.querySelector('.delete');
  btnDelete.addEventListener('click', function () {
    deleteItem(liEl);
  });

  inputEl.value = null; // Input 초기화
}

// 아이템 삭제
function deleteItem(el) {
  listEl.removeChild(el);
}

// TODO : 아이템 수정

// 전체 삭제
function clearAll() {
  const items = listEl.querySelectorAll('li');
  if (items.length > 0) {
    items.forEach(el => {
      listEl.removeChild(el);
    });
  }
}

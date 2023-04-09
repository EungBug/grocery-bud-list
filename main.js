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
btnAddEl.addEventListener('click', clickSubmit);

let isEdit = false;

// + 버튼 클릭
function clickSubmit() {
  const input = inputEl.value;

  if (input === '') {
    return;
  }

  if (isEdit) {
    editItem(input);
  } else {
    addItem(input);
  }

  inputEl.value = null; // Input 초기화
}

// 아이템 추가
function addItem(title) {
  const liEl = document.createElement('li');
  console.log(title);
  liEl.innerHTML = /*html*/ `
      <p>${title}</p>
      <div class="edit material-icons">border_color</div>
      <div class="delete material-icons">delete</div>
    `;
  listEl.appendChild(liEl);

  // 아이템 수정, 삭제 버튼
  const btnEdit = liEl.querySelector('.edit');
  const btnDelete = liEl.querySelector('.delete');
  btnEdit.addEventListener('click', () => clickEdit(liEl));
  btnDelete.addEventListener('click', () => deleteItem(liEl));
}

// 아이템 삭제
function deleteItem(el) {
  listEl.removeChild(el);
}

// 아이템 수정
function editItem(title) {
  const editEl = listEl.querySelector('.edit-mode');
  editEl.textContent = title;
  editEl.classList.remove('edit-mode');
  isEdit = false;
}

// 수정버튼 클릭
function clickEdit(el) {
  const titleEl = el.querySelector('p');
  titleEl.classList.add('edit-mode');
  inputEl.value = titleEl.innerHTML;
  inputEl.focus();
  isEdit = true;
}

// 전체 삭제
// modal
const modalEl = document.querySelector('.modal-wrap');
const btnModalConfirm = modalEl.querySelector('.confirm');
const btnModalCancel = modalEl.querySelector('.cancel');
console.log(btnModalConfirm);
function clearAll() {
  if (listEl.childNodes.length === 0) {
    return;
  }
  modalEl.classList.add('show');
}

btnModalConfirm.addEventListener('click', () => {
  const items = listEl.querySelectorAll('li');
  if (items.length > 0) {
    items.forEach(el => {
      listEl.removeChild(el);
    });
    modalEl.classList.remove('show');
  }
});

btnModalCancel.addEventListener('click', () => {
  modalEl.classList.remove('show');
});

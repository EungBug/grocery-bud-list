// new Date() o
// createAttribute() o
// setAttribute() o
// appendChild() o
// filter() o
// map() o

const inputEl = document.querySelector('.input-box input');
const btnAddEl = document.querySelector('.input-box .material-icons');
const listEl = document.querySelector('.list ul');
const btnClear = document.querySelector('.delete-all');

let isEdit = false;

btnClear.addEventListener('click', clearAll);
btnAddEl.addEventListener('click', clickSubmit);

/**
 * 아이템을 요소를 만들어 화면에 추가하는 함수
 * @param {*} time LocalStorage에 저장한 시간을 담는 속성 값
 * @param {*} value 사용자가 입력한 리스트의 아이템 텍스트
 */
function createItem(time, value) {
  const liEl = document.createElement('li');

  // Local Storage에 저장하기 위한 속성을 추가
  let attr = document.createAttribute('data-time');
  attr.value = time;
  liEl.setAttributeNode(attr);

  liEl.innerHTML = /*html*/ `
      <p>${value}</p>
      <div class="edit material-icons">border_color</div>
      <div class="delete material-icons">delete</div>
    `;
  listEl.appendChild(liEl);

  // 아이템 수정, 삭제 버튼 이벤트
  const btnEdit = liEl.querySelector('.edit');
  const btnDelete = liEl.querySelector('.delete');
  btnEdit.addEventListener('click', () => clickEdit(liEl));
  btnDelete.addEventListener('click', () => deleteItem(liEl));
}

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
  const saveTime = new Date().getTime().toString();
  createItem(saveTime, title);

  // LocalStorage에 저장
  saveToLocalStorage(saveTime, title);
}

// 아이템 삭제
function deleteItem(el) {
  listEl.removeChild(el);

  // LocalStorage에서 삭제
  removeItemLocalStorage(el.dataset.time);
}

// 아이템 수정
function editItem(title) {
  const editEl = listEl.querySelector('.edit-mode');
  const liEl = editEl.parentElement;
  editEl.textContent = title;
  editEl.classList.remove('edit-mode');

  editToLocalStorage(liEl.dataset.time, title);
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

function clearAll() {
  if (listEl.childNodes.length === 0) {
    return;
  }
  modalEl.classList.add('show');
}

btnModalConfirm.addEventListener('click', () => {
  const items = listEl.querySelectorAll('li');
  if (items.length > 0) {
    // items.forEach(el => {
    //   listEl.removeChild(el);
    // });
    listEl.innerHTML = ''; // ul 태그 초기화
    modalEl.classList.remove('show');
    clearLocalStorage();
  }
});

btnModalCancel.addEventListener('click', () => {
  modalEl.classList.remove('show');
});

// ================================
// =========== LocalStorage 관련 함수
// ================================

function getLocalStorage() {
  const list = localStorage.getItem('grocery-list');
  return JSON.parse(list) ?? [];
}

function loadLocalStorage() {
  const savedList = getLocalStorage();
  if (savedList.length === 0) {
    return;
  }

  savedList.forEach(function (item) {
    createItem(item.time, item.value);
  });
}

function saveToLocalStorage(time, value) {
  let list = getLocalStorage();
  list.push({ time, value });
  localStorage.setItem('grocery-list', JSON.stringify(list));
}

function removeItemLocalStorage(time) {
  let list = getLocalStorage();

  // findIndex()로 찾아서 삭제
  // const index = list.findIndex(i => i.key === key);
  // if (index !== -1) {
  //   list.splice(index, 1); // index로부터 1개의 요소를 삭제
  //   localStorage.setItem('grocery-list', JSON.stringify(list));
  // }

  // filter를 사용하는 경우
  const filterList = list.filter(i => i.time !== time);
  if (filterList.length !== 0) {
    localStorage.setItem('grocery-list', JSON.stringify(filterList));
  }
}

function clearLocalStorage() {
  localStorage.clear();
}

function editToLocalStorage(time, value) {
  let list = getLocalStorage();

  const editList = list.map(item => {
    if (item.time === time) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('grocery-list', JSON.stringify(editList));
}

loadLocalStorage();

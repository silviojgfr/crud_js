window.addEventListener('load', start);
// variaveis globais
var txtNome = null;
var arrayNames = ['Teste1', 'Teste2'];
var isEditing = false;
var currentName = '';
var currentIndex = -1;

function start() {
  preventFormSubmit();
  getInputText();
  renderListNames();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function getInputText() {
  function handleNamesKeyUp(event) {
    function insertItem(pItem) {
      arrayNames.push(pItem);
    }
    function editItem(pItem, pIndex) {
      arrayNames[pIndex] = pItem;
      isEditing = false;
    }

    // quando a tecla for um ENTER, deve inserir ou atualizar o array com o nome digitado (se o texto nao for vazio)
    if (event.key === 'Enter' && event.target.value.trim() != '') {
      // verificar operação: se for inclusão, cria novo item no array
      // se for alteração, altera o item na posicao do array
      if (!isEditing) {
        insertItem(event.target.value);
      } else {
        editItem(event.target.value, currentIndex);
      }

      txtNome.value = '';
      renderListNames();
    }
  }

  txtNome = document.querySelector('#txtNome');
  txtNome.addEventListener('keyup', handleNamesKeyUp);
  txtNome.focus();
}

// função para desenhar o array na tela
function renderListNames() {
  function createDelButton(pIndex) {
    function deleteItem(event) {
      console.log('entrei no deleteItem ' + pIndex + ' ' + arrayNames);
      console.log(event);
      arrayNames.splice(pIndex, 1);
      renderListNames();
    }
    var delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.classList.add('deleteButton');
    delBtn.addEventListener('click', deleteItem);

    return delBtn;
  }

  function createSpan(pName, pIndex) {
    function updateItem() {
      txtNome.value = pName;
      txtNome.focus();
      isEditing = true;
      currentIndex = pIndex;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = pName;
    span.addEventListener('click', updateItem);

    return span;
  }

  var divList = document.querySelector('#divLista');
  divList.innerHTML = '';

  var ul = document.createElement('ul');
  for (var i = 0; i < arrayNames.length; i++) {
    var li = document.createElement('li');
    var delButton = createDelButton(i);
    var span = createSpan(arrayNames[i], i);

    li.appendChild(delButton);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divList.appendChild(ul);

  txtNome.focus();
}

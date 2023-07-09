const submitClickHandler = () => {
  const resultElm = document.getElementById('result__msg');

  if (!resultElm) {
    alert('Неудалось найти элемент вывода');
    return;
  }
  
  const pathElm = document.getElementById('path');

  if (!pathElm) {
    resultElm.innerText = 'Неудалось найти элемент ввода пути запроса'
    return;
  }

  const methodElm = document.getElementById('method');

  if (!methodElm) {
    resultElm.innerText = 'Неудалось найти элемент ввода метода запроса'
    return;
  }

  console.log({path: pathElm.value, method: methodElm.value});

  resultElm.innerText = 'Запрос выполняется...';

  const preparePath = pathElm.value[0] === '/' ? pathElm.value.substring(1) : pathElm.value;

  fetch(`/api/${preparePath}`, {
    method: methodElm.value
  })
  .then((response) => response.json())
  .then((result) => {
    resultElm.innerText = typeof result === 'string' ? result : JSON.stringify(result);
  }).catch(() => {
    resultElm.innerText = "Неудалось выполнить запрос";
  })
}

const btnSubmit = document.getElementById('sender__submit');

if (btnSubmit) {
  btnSubmit.addEventListener('click', submitClickHandler);
}
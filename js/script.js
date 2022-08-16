(() => {
  let paragraph = document.createElement('p');
  paragraph.innerHTML = "Проверка-проверка, 1-2-3-4-5!";
  let div = document.createElement('div');
  div.innerHTML = "<strong>Привет, GitHub!</strong>";
  
  document.body.append(paragraph);
  document.body.append(div);
})()

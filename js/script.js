(() => {
  let paragraph = document.createElement('p');
  paragraph.innerHTML = "one-two-three-testing!, 1-2-3-4-5!";
  let div = document.createElement('div');
  div.innerHTML = "<strong>Привет, GitHub!</strong>";
  let wrapper = document.querySelector("#wrapper");
  
  //document.body.append(paragraph);
  wrapper.append(paragraph);
  document.body.append(div);
})()

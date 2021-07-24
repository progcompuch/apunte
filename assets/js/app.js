if (localStorage.getItem('theme') === 'dark') {

  document.body.classList.add('dark');
  document.querySelectorAll('.table').forEach(element => {
    element.classList.add('table-dark');
  });

}

document.getElementById('mode').addEventListener('click', () => {

  document.body.classList.toggle('dark');
  document.querySelectorAll('.table').forEach(element => {
    element.classList.toggle('table-dark');
  })

  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');

});


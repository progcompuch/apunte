{{- $ids   := .Site.Params.csesIds -}}

const csesIds = [
  {{ range $index, $id := $ids -}}
    {{- $id -}},
  {{ end }}
];

const taskClases = {
  'accepted': 'accepted',
  'attempted': 'attempted',
  'notAttempted': 'none'
}

function loadStandings(data) {

  let problemsRows = {};
  for (const node of document.getElementsByClassName("problem")) {
    problemsRows[node.dataset.id] = node;
  };

  for (const idIndex in csesIds) {
    let userId = csesIds[idIndex];
    let userData = data[userId];
    if (userData === undefined) {
      Object.values(problemsRows).forEach(tr => {
        tr.children[parseInt(idIndex)+1].className = "task-score";
      });
      return;
    }

    Object.keys(userData).forEach(state => {
      let problemIds = userData[state];
      let stateClass = taskClases[state];
      problemIds.forEach(problemId => {
        if (problemsRows[problemId] === undefined) {
          return;
        }
        problemsRows[problemId].children[parseInt(idIndex)+1].className = "task-score " + stateClass;
      });
    });

  }
}

(function() {

let csesContainer = document.getElementById("cses-tables-container");

if (csesContainer !== null) {

  let cache = localStorage.getItem('csesCache');

  if (cache !== null) {
    cache = JSON.parse(cache);
  }

  let dt = new Date();
{{ if eq (hugo.Environment) "development" }}
  if (true) {
{{ else }}
  if (cache === null || cache.expires < dt.getSeconds) {
{{ end }}
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let data = JSON.parse(xhr.responseText);
        cache = {
          'expires': dt.getTime() + {{- .Site.Params.csesCacheLife | int | mul 1000 -}},
          'data': data,
        };
        localStorage.setItem('csesCache', JSON.stringify(cache));
        loadStandings(data);
      }
    };
    xhr.open('GET', '{{- .Site.Params.csesEndpoint -}}');
    xhr.send();
  } else {
    loadStandings(cache.data);
  }
}
})();

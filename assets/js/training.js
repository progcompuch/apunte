const path = window.location.pathname;

const trainingNames = [
    [
        "1: Variables y estructura de control if/else",
        "2: Ciclos",
        "3: STL (vectores, matrices, sets, pairs, etc)"
    ],
    [
        "Búsqueda Binaria / Dos Punteros",
        "Grafos: BFS / DFS / Dijkstra / DSU",
        "Programación Dinámica",
        "Estructuras de Datos"
    ],
    [
        "Grafos 2: Minimum Spanning Tree / Camino más corto",
        "Teoría de números / Conteo", 
        "Programación Dinámica 2",
        "Estructuras de Datos 2",
        "algoritmo de mo"
    ],
    [
        "Grafos 3: Flujo y matchings",
        "Binary Lifting",
        "Small to Large",
        "Técnicas en árboles 1",
        "Teoría de juegos"
    ],
    [
        "Estructuras de Datos 3",
        "Teoría de números 2",
        "Probabilistas",
        "Sistemas de ecuaciones lineales"
    ]
];

const trainingContents = [
    [
        [
            ""
        ],
        [
            ""
        ],
        [
            ""
        ]
    ],
    [
        [
            "Búsqueda Binaria",
            "Dos Punteros"
        ],
        [
            "BFS",
            "DFS",
            "Dijkstra",
            "DSU"
        ],
        [
            "Programación Dinámica"
        ],
        [
            "Segment Tree (normal)"
        ]
    ],
    [
        [
            "Algoritmo de Kruskal",
            "Bellman Ford",
            "Floyd Warshall"
        ],
        [
            "Aritmética Modular",
            "Criba de Eratóstenes",
            "Inverso Modular",
            "Números Binomiales"
        ],
        [
            "Programación Dinámica",
            "sqrt decomposition"
        ],
        [
            "Segment Tree (Lazy)",
        ],
        [
            "algoritmo de mo",
            "algoritmo de mo 3d"
        ]
    ],
    [
        [
            "maxflow",
            "mincut",
            "hungarian"
        ],
        [
            "binary lifting"
        ],
        [
            "small to large"
        ],
        [
            "binary lifting",
            "small to large",
            "rerooting",
            "dfs tree"
        ],
        [
            "sprague grundy"
        ]
    ],
    [
        [
            "segment tree persistente",
            "segment tree dinamico",
        ],
        [
            "tests de primalidad",
            "funciones multiplicativas",
            "inversa de mobius",
            "función phi de euler"
        ],
        [
            "probabilidades"
        ],
        [
            "Método de Gauss"
        ]
    ]
]

const contests_ids = [
    [
        "0",
        "1",
        "2"
    ],
    [
        "3",
        "4",
        "5",
        "6"
    ],
    [
        "7",
        "8",
        "9",
        "10",
        "11"
    ],
    [
        "12",
        "13",
        "14",
        "15",
        "16"
    ],
    [
        "17",
        "18",
        "19",
        "20"
    ]
];

function getObjectSize(obj) {
    return new Blob([JSON.stringify(obj)]).size + " bytes";
}

async function fetchContestStandings(contestId){
    const url = `https://joliva.cl/api/standings/${contestId}`;
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
        console.error("Error fetching contest standings:", response.statusText);
        return [];
    }
    const data = await response.json();
    if (data.status !== "OK"){
        console.error("API returned an error:", data.comment);
        console.log(data);
        return [];
    }
    return data.result;
}

async function loadData(data, _lvlindxpath){
    for (let i = 0; i < trainingNames[_lvlindxpath].length; i ++){
        const tabContent = document.getElementById(`tab-content-${i}`);
        if (!tabContent){
            console.error(`Tab content ${i} not found.`);
            return;
        }

        const table = tabContent.querySelector("div table");
        if (!table){
            console.error(`Table not found in tab ${i}.`);
            return;
        }
        const contestId = contests_ids[_lvlindxpath][i];
        contest_data = data[contestId];

        let frow = table.getElementsByTagName('tr')[0];
        
        let totalsNames = frow.children;

        if (totalsNames.length == 0){
            let emptyCell = document.createElement("td");
            emptyCell.textContent = "-";
            frow.appendChild(emptyCell);
        }

        let usedcols = 0;
        for (let j = 1; j < contest_data[0].length; j ++){
            if (!contest_data[0][j].active || (!contest_data[0][j].icpc && !contest_data[0][j].ioi))
                continue;
            let user_nickname = contest_data[0][j].nickname;
            let userUniversity = contest_data[0][j].organization;
            if (totalsNames.length <= usedcols + 1){
                let emptyCell = document.createElement("td");
                emptyCell.textContent = "-";
                frow.appendChild(emptyCell);
            }
            let crating = contest_data[0][j].codeforcesRating;
            let arating = contest_data[0][j].atcoderRating;
            let className = "";
            if (crating < 800 && arating < 200) {
                className = "rating-black";
            } else if (crating <= 1199 && arating <= 399) {
                className = "rating-gray";
            } else if (crating <= 1399 && arating <= 799) {
                className = "rating-green";
            } else if (crating <= 1599 && arating <= 1299) {
                className = "rating-cyan";
            } else if (crating <= 1899 && arating <= 1699) {
                className = "rating-blue";
            } else if (crating <= 2099 && arating <= 1999) {
                className = "rating-purple";
            } else if (crating <= 2399 && arating <= 2299) {
                className = "rating-orange";
            } else if (crating <= 2999 && arating <= 2999) {
                className = "rating-red";
            }
            totalsNames[usedcols + 1].innerHTML = `<span class="${className}">${user_nickname}</span>`;
            totalsNames[usedcols + 1].setAttribute("data-university", userUniversity.toLowerCase());
            usedcols += 1;
        }

        const row = table.insertRow();
        const totalesCell = row.insertCell(0);
        totalesCell.style.position = "sticky";
        totalesCell.style.left = "0";
        totalesCell.style.backgroundColor = "#f8f9fa";
        totalesCell.textContent = "Totales";
        totalesCell.style.fontWeight = "bold";
        let ccol = 0;
        for (let j = 1; j < contest_data[0].length; j ++){
            if (!contest_data[0][j].active || (!contest_data[0][j].icpc && !contest_data[0][j].ioi))
                continue;
            let userUniversity = contest_data[0][j].organization;
            const userCell = row.insertCell(ccol + 1);
            userCell.setAttribute("data-university", userUniversity.toLowerCase());
            userCell.textContent = contest_data[0][j].solved_count;
            ccol ++;
        }

        const logorow = table.insertRow();
        const UCell = logorow.insertCell(0);
        UCell.style.position = "sticky";
        UCell.style.left = "0";
        UCell.style.backgroundColor = "#f8f9fa";
        UCell.textContent = "U";
        UCell.style.fontWeight = "bold";
        ccol = 0;

        for (let j = 1; j < contest_data[0].length; j ++){
            if (!contest_data[0][j].active || (!contest_data[0][j].icpc && !contest_data[0][j].ioi))
                continue;
            let userUniversity = contest_data[0][j].organization;
            const userCell = logorow.insertCell(ccol + 1);
            userCell.setAttribute("data-university", userUniversity.toLowerCase());
            let img = document.createElement("img");
            img.src = `/images/universities/${userUniversity}.png`;
            img.alt = userUniversity;
            img.classList.add("university-logo");
            userCell.appendChild(img);
            ccol ++;
        }


        for (let j = 1; j < contest_data.length; j ++){
            const problemRow = table.insertRow();
            const problemCell = problemRow.insertCell(0);

            problemCell.style.position = "sticky";
            problemCell.style.left = "0";
            problemCell.style.backgroundColor = "#f8f9fa";
            problemCell.style.fontWeight = "bold";

            const problemLink = document.createElement("a");
            problemLink.href = contest_data[j][0].url;
            problemLink.textContent = contest_data[j][0].name;
            problemLink.target = "_blank";
            problemLink.rel = "noopener noreferrer";
            problemCell.appendChild(problemLink);

            let newk = 0;
            for (let k = 1; k < contest_data[j].length; k ++){
                if (!contest_data[0][k].active || (!contest_data[0][k].icpc && !contest_data[0][k].ioi))
                    continue;
                let userUniversity = contest_data[0][k].organization;
                const userCell = problemRow.insertCell(newk + 1);
                userCell.setAttribute("data-university", userUniversity.toLowerCase());
                let score_v = contest_data[j][k].solved;
                let value = (score_v == 2 ? "accepted" : (score_v == 1 ? "attempted" : "notAttempted"));
                userCell.className = `task-score ${value}`;
                newk ++;
            }
        }
    }
    return;
}

function setcache(){
    return [
        {
            data: {},
            expires: 0
        },
        {
            data: {},
            expires: 0
        },
        {
            data: {},
            expires: 0
        },
        {
            data: {},
            expires: 0
        },
        {
            data: {},
            expires: 0
        }
    ]
};

async function populateTables() {

    const gymTablesContainer = document.getElementById("gym-tab-content");
    if (!gymTablesContainer) {
        console.error("Tables container not found!");
        return;
    }
    const parts = path.split("/"); // Split by "/"
    const lastPart = parts.filter(part => part !== "").pop(); // Get last non-empty part
    const number = lastPart.replace(/\D/g, ""); // Remove non-numeric characters

    _lvlindxpath = parseInt(number);

    const titles = trainingNames[_lvlindxpath]
    const contents = trainingContents[_lvlindxpath]

    const tabsContainer = document.getElementById("gym-tabs");
    const contentContainer = document.getElementById("gym-tab-content");

    tabsContainer.innerHTML = "";
    contentContainer.innerHTML = "";

    titles.forEach((title, index) => {
        const tabButton = document.createElement("li");
        tabButton.classList.add("nav-item");
        tabButton.innerHTML = `
            <button class="nav-link ${index === 0 ? "active" : ""}" id="tab-${index}"
                data-bs-toggle="tab" data-bs-target="#tab-content-${index}" type="button" role="tab"
                aria-controls="tab-content-${index}" aria-selected="${index === 0}">
                ${title}
            </button>`;
        tabsContainer.appendChild(tabButton);
        const tabPane = document.createElement("div");
        tabPane.classList.add("tab-pane", "fade")
        if (index === 0)
            tabPane.classList.add("show", "active");
        tabPane.id = `tab-content-${index}`;
        tabPane.setAttribute("role", "tabpanel");
        tabPane.setAttribute("aria-labelledby", `tab-${index}`);
        let contentHTML = "<h3>Contenidos</h3>";
        contents[index].forEach(content => {
            contentHTML += `<span>${content}</span><br/>`;
        });
        contentHTML += `
        <div style="overflow-x: auto;">
          <table class="table table-sm table-bordered cses-table" style="table-layout: auto; width: 100%;">
            <thead>
              <tr>
                <th style="position: sticky; left: 0; background-color: #f8f9fa; z-index: 1;">User</th>
              </tr>
            </thead>
            <tbody id="table-body-${index}"></tbody>
          </table>
        </div>
        `;
        tabPane.innerHTML = contentHTML;
        contentContainer.appendChild(tabPane);
    });

    let gymcache = localStorage.getItem('gymCache');

    if (gymcache !== null){
        gymcache = JSON.parse(gymcache);
    }
    else {
        gymcache = setcache();
    }
    if (!Array.isArray(gymcache)){
        gymcache = setcache();
    }
    let dt = new Date();
{{ if eq (hugo.Environment) "development" }}
    if (true) {
{{ else }}
    if (gymcache[_lvlindxpath].expires < dt.getTime()) {
{{ end }}
        gymcache[_lvlindxpath].data = []
        for (let j = 0; j < contests_ids[_lvlindxpath].length; j ++){
            const contestId = contests_ids[_lvlindxpath][j]
            const standings = await Promise.resolve(fetchContestStandings(contestId));
            if (standings) {
                gymcache[_lvlindxpath].data[contestId] = standings;
            }
        }
        gymcache[_lvlindxpath].expires = (dt.getTime() + 300 * 1000);
        loadData(gymcache[_lvlindxpath].data, _lvlindxpath);
    }
    else {
        loadData(gymcache[_lvlindxpath].data, _lvlindxpath);
    }
    let loading = document.getElementById("loading");
    if (loading) {
        loading.style.display = "none";
    }

    return;
}


populateTables();

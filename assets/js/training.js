{{ $uchilePeople := .Site.Params.uchilePeople -}}

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
        "593411",
        "593413",
        "593415"
    ],
    [
        "567665",
        "567946",
        "567947",
        "568427"
    ],
    [
        "585432",
        "585434",
        "585435",
        "585436",
        "585438"
    ],
    [
        "585583",
        "585587",
        "585588",
        "585590",
        "585591"
    ],
    [
        "585593",
        "585595",
        "585598",
        "585600"
    ]
];

let users = [
    {{- range $user := $uchilePeople -}}
        {{- if or $user.icpc $user.ioi -}}
            {
                nickname: '{{- $user.nickname -}}',
                codeforcesId: '{{- $user.codeforcesId -}}',
                codeforcesRating: {{- $user.codeforcesRating -}},
                atcoderRating: {{- $user.atcoderRating -}},
                university: '{{- $user.university -}}'
            },
        {{- end -}}
    {{- end -}}
]

let complete_users_list = [
    {{- range $user := $uchilePeople -}}
        '{{- $user.codeforcesId -}}',
    {{- end -}}
]

function getObjectSize(obj) {
    return new Blob([JSON.stringify(obj)]).size + " bytes";
}

async function generateApiSig(methodName, params, apiKey, secret) {
    const rand = Math.random().toString(36).substring(2, 8); // Generate a random 6-character string
    const time = Math.floor(Date.now() / 1000); // Current time in UNIX format
    const sortedParams = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join('&');
    const hashInput = `${rand}/${methodName}?apiKey=${apiKey}&${sortedParams}&time=${time}#${secret}`;
    const hashBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(hashInput));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return {
        apiSig: `${rand}${hashHex}`,
        time
    };
}

async function fetchContestStatus(contestId, from, count, asManager, apiKey, secret) {
    const methodName = "contest.status";
    const params = { contestId, from, count, asManager };

    const { apiSig, time } = await generateApiSig(methodName, params, apiKey, secret);
    const url = `https://codeforces.com/api/${methodName}?apiKey=${apiKey}&asManager=${asManager}&contestId=${contestId}&count=${count}&from=${from}&time=${time}&apiSig=${apiSig}`;
    //console.log(url)
    const response = await fetch(url);
    if (!response.ok) {
        console.error("Error fetching contest status:", response.statusText);
        return [];
    }

    const data = await response.json();
    if (data.status !== "OK") {
        console.error("API returned an error:", data.comment);
        return [];
    }

    return data.result;
}

async function fetchContestStandings(contestId, apiKey, secret, _lvlindxpath) {
    const asManager = true, from = 1, count = 100, showUnofficial = true;
    participantTypes = "PRACTICE";
    const methodName = "contest.standings"
    let handles = complete_users_list.join;
    const params = { contestId, from, count, asManager, showUnofficial, participantTypes };
    handles = complete_users_list.join(';');
    const { apiSig, time } = await generateApiSig(methodName, params, apiKey, secret);
    const url = `https://codeforces.com/api/${methodName}?apiKey=${apiKey}&asManager=${asManager}&contestId=${contestId}&count=${count}&from=${from}&participantTypes=${participantTypes}&showUnofficial=${showUnofficial}&time=${time}&apiSig=${apiSig}`;
    const response = await fetch(url);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!response.ok) {
        console.error("Error fetching contest standings:", response.statusText);
        return [];
    }
    const data = await response.json();
    if (data.status !== "OK") {
        console.error("API returned an error:", data.comment);
        return [];
    }
    return data.result;
}

// 
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
        problem_list = contest_data[0];
        let frow = table.getElementsByTagName('tr')[0]
        let totalsNames = frow.children;
        if (totalsNames.length == 0){
            let emptyCell = document.createElement("td");
            emptyCell.textContent = "—";
            frow.appendChild(emptyCell);
        }
        let users2 = {}
        let users3 = {}
        for (let j = 0; j < users.length; j ++){
            users2[users[j].codeforcesId] = {
                "crating": users[j].codeforcesRating,
                "arating": users[j].atcoderRating
            };
            users3[users[j].codeforcesId] = {
                "crating": users[j].codeforcesRating,
                "arating": users[j].atcoderRating
            };
        }
        let usedcols = 0;
        for (let j = 0; j < contest_data[1].length; j ++){
            user_handle = contest_data[1][j].handle;
            if (user_handle in users2){
                let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
                if (totalsNames.length <= usedcols + 1){
                    let emptyCell = document.createElement("td");
                    emptyCell.textContent = "—";
                    frow.appendChild(emptyCell);
                }
                totalsNames[usedcols + 1].style.fontWeight = "bold";
                totalsNames[usedcols + 1].setAttribute("data-university", userUniversity.toLowerCase());
                // user is relevant
                let crating = users2[user_handle].crating;
                let arating = users2[user_handle].arating;
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
                totalsNames[usedcols + 1].innerHTML = `<span class="${className}">${user_handle}</span>`;
                delete users2[user_handle];
                usedcols += 1;
            }
        }
        for (const [user_handle, value] of Object.entries(users2)){
            let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
            if (totalsNames.length <= usedcols + 1){
                let emptyCell = document.createElement("td");
                emptyCell.textContent = "—";
                frow.appendChild(emptyCell);
            }
            totalsNames[usedcols + 1].style.fontWeight = "bold";
            totalsNames[usedcols + 1].setAttribute("data-university", userUniversity.toLowerCase());
            // user is relevant
            let crating = value.crating;
            let arating = value.arating;
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
            totalsNames[usedcols + 1].innerHTML = `<span class="${className}">${user_handle}</span>`;
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
        for (let j = 0; j < contest_data[1].length; j ++){
            user_handle = contest_data[1][j].handle;
            if (user_handle in users3){
                let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
                const userCell = row.insertCell(ccol + 1);
                userCell.setAttribute("data-university", userUniversity.toLowerCase());
                let solves = 0;
                for (let j2 = 0; j2 < contest_data[1][j].solves.length; j2 ++){
                    if (contest_data[1][j].solves[j2] == 2)
                        solves += 1
                }
                userCell.textContent = solves;
                ccol ++;
            }
        }
        for (const [user_handle, value] of Object.entries(users2)){
            let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
            const userCell = row.insertCell(ccol + 1);
            userCell.setAttribute("data-university", userUniversity.toLowerCase());
            userCell.textContent = 0;
            ccol += 1
        }

        const logorow = table.insertRow();
        const UCell = logorow.insertCell(0);
        UCell.style.position = "sticky";
        UCell.style.left = "0";
        UCell.style.backgroundColor = "#f8f9fa";
        UCell.textContent = "U";
        UCell.style.fontWeight = "bold";
        ccol = 0;

        for (let j = 0; j < contest_data[1].length; j ++){
            user_handle = contest_data[1][j].handle;
            if (user_handle in users3){
                let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
                const userCell = logorow.insertCell(ccol + 1);
                userCell.setAttribute("data-university", userUniversity.toLowerCase());

                let img = document.createElement("img");
                img.src = `/images/universities/${userUniversity}.png`;
                img.alt = userUniversity;
                img.classList.add("university-logo");
                userCell.appendChild(img);
                ccol ++;
            }
        }
        for (const [user_handle, value] of Object.entries(users2)){
            let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
            const userCell = logorow.insertCell(ccol + 1);
            userCell.setAttribute("data-university", userUniversity.toLowerCase());
            let img = document.createElement("img");
            img.src = `/images/universities/${userUniversity}.png`;
            img.alt = userUniversity;
            img.classList.add("university-logo");
            userCell.appendChild(img);
            ccol += 1
        }


        for (let j = 0; j < problem_list.length; j ++){
            const problemRow = table.insertRow();

            const problemCell = problemRow.insertCell(0);
            problemCell.style.position = "sticky";
            problemCell.style.left = "0";
            problemCell.style.backgroundColor = "#f8f9fa";
            problemCell.style.fontWeight = "bold";

            const problemLink = document.createElement("a");
            problemLink.href = problem_list[j].url;
            problemLink.textContent = problem_list[j].name;
            problemLink.target = "_blank";
            problemLink.rel = "noopener noreferrer";
            problemCell.appendChild(problemLink);

            let newk = 0;
            for (let k = 0; k < contest_data[1].length; k ++){
                user_handle = contest_data[1][k].handle;
                if (user_handle in users3){
                    let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
                    const userCell = problemRow.insertCell(newk + 1);
                    userCell.setAttribute("data-university", userUniversity.toLowerCase());
                    let score_v = contest_data[1][k].solves[j];
                    let value = (score_v == 2 ? "accepted" : (score_v == 1 ? "attempted" : "notAttempted"));
                    userCell.className = `task-score ${value}`;
                    newk ++;
                }
            }
            for (const [user_handle, value] of Object.entries(users2)){
                let userUniversity = users.find(user => user.codeforcesId === user_handle)?.university || "unknown";
                const userCell = problemRow.insertCell(newk + 1);
                userCell.setAttribute("data-university", userUniversity.toLowerCase());
                userCell.className = `task-score notAttemped`;
                newk += 1
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

async function populateTables(apiKey, secret) {

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
            // const submissions = await Promise.resolve(fetchContestStatus(contestId, 1, 100, true, apiKey, secret));
            const standings = await Promise.resolve(fetchContestStandings(contestId, apiKey, secret, _lvlindxpath));
            if (standings) {
                standings_rows = standings.rows;
                standings_problems = standings.problems;
                data_rows = []
                problem_names = []
                standings_problems.forEach((problem_data, id) => {
                    problem_names.push({
                        "name": problem_data["name"],
                        "url": "https://codeforces.com/gym/" + contestId + "/problem/" + problem_data["index"]
                    });
                });
                standings_rows.forEach((srow, id) => {
                    srow_handle = srow.party.members[0].handle;
                    srow_results = srow.problemResults;
                    results_data = []
                    srow_results.forEach((presult, id2) => {
                        results_data.push(presult.points > 0 ? 2 : (presult.rejectedAttemptCount > 0 ? 1 : 0));
                    });
                    data_rows.push({
                        "handle": srow_handle,
                        "solves": results_data
                    });
                });
                gymcache[_lvlindxpath].data[contestId] = [
                    problem_names,
                    data_rows
                ];
            }
        }
        gymcache[_lvlindxpath].expires = (dt.getTime() + 300 * 1000);
        //localStorage.setItem('gymCache', JSON.stringify(gymcache));
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


populateTables("e23005a4a475b6079a98c6c75f9d24408033ece7", "d6c254ba481a12d0370517c93e2f4a2a5595586e");

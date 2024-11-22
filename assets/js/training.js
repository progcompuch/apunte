{{ $uchilePeople := .Site.Params.uchilePeople -}}

const trainingNames = [
    "Búsqueda Binaria / Dos Punteros",
    "Grafos: BFS / DFS / Dijkstra / DSU",
    "Programación Dinámica"
]
const trainingProblems = [
    [
        {
            problemName: "Books",
            problemId: "A",
            problemLetter: "A",
            problemUrl: "https://codeforces.com/gym/567665/problem/A",
            categoryIndex: 0,
            idx: 0
        },
        {
            problemName: "Hamburgers",
            problemId: "B", 
            problemLetter: "B",
            problemUrl: "https://codeforces.com/gym/567665/problem/B",
            categoryIndex: 0,
            idx: 1
        },
        {
            problemName: "Sagheer and Nubian Market",
            problemId: "C",
            problemLetter: "C",
            problemUrl: "https://codeforces.com/gym/567665/problem/C",
            categoryIndex: 0,
            idx: 2
        },
        {
            problemName: "Bonuses on a Line",
            problemId: "D",
            problemLetter: "D",
            problemUrl: "https://codeforces.com/gym/567665/problem/D",
            categoryIndex: 0,
            idx: 3
        },
        {
            problemName: "Final Boss",
            problemId: "E",
            problemLetter: "E",
            problemUrl: "https://codeforces.com/gym/567665/problem/E",
            categoryIndex: 0,
            idx: 4
        },
        {
            problemName: "Jumping Through Segments",
            problemId: "F",
            problemLetter: "F",
            problemUrl: "https://codeforces.com/gym/567665/problem/F",
            categoryIndex: 0,
            idx: 5
        },
        {
            problemName: "Queries about less than or equal elements",
            problemId: "G",
            problemLetter: "G",
            problemUrl: "https://codeforces.com/gym/567665/problem/G",
            categoryIndex: 0,
            idx: 6
        }
    ],
    [
        {
            problemName: "Two Buttons",
            problemId: "A",
            problemLetter: "A",
            problemUrl: "https://codeforces.com/gym/567946/problem/A",
            categoryIndex: 1,
            idx: 0
        },
        {
            problemName: "Counting Rooms",
            problemId: "B",
            problemLetter: "B",
            problemUrl: "https://codeforces.com/gym/567946/problem/B",
            categoryIndex: 1,
            idx: 1
        },
        {
            problemName: "Labyrinth",
            problemId: "C",
            problemLetter: "C",
            problemUrl: "https://codeforces.com/gym/567946/problem/C",
            categoryIndex: 1,
            idx: 2
        },
        {
            problemName: "Dijkstra?",
            problemId: "D",
            problemLetter: "D",
            problemUrl: "https://codeforces.com/gym/567946/problem/D",
            categoryIndex: 1,
            idx: 3
        },
        {
            problemName: "Even Walk",
            problemId: "E",
            problemLetter: "E",
            problemUrl: "https://codeforces.com/gym/567946/problem/E",
            categoryIndex: 1,
            idx: 4
        },
        {
            problemName: "Pizzas",
            problemId: "F",
            problemLetter: "F",
            problemUrl: "https://codeforces.com/gym/567946/problem/F",
            categoryIndex: 1,
            idx: 5
        },
        {
            problemName: "Treasures",
            problemId: "G",
            problemLetter: "G",
            problemUrl: "https://codeforces.com/gym/567946/problem/G",
            categoryIndex: 1,
            idx: 5
        }
    ],
    [
        {
            problemName: "CutRibbon",
            problemId: "A",
            problemLetter: "A",
            problemUrl: "https://codeforces.com/gym/567947/problem/A",
            categoryIndex: 2,
            idx: 0
        },
        {
            problemName: "Dice Combinations",
            problemId: "B",
            problemLetter: "B",
            problemUrl: "https://codeforces.com/gym/567947/problem/B",
            categoryIndex: 2,
            idx: 1
        },
        {
            problemName: "Investigating Zeroes and Ones",
            problemId: "C",
            problemLetter: "C",
            problemUrl: "https://codeforces.com/gym/567947/problem/C",
            categoryIndex: 2,
            idx: 2
        },
        {
            problemName: "2^sort",
            problemId: "D",
            problemLetter: "D",
            problemUrl: "https://codeforces.com/gym/567947/problem/D",
            categoryIndex: 2,
            idx: 3
        },
        {
            problemName: "Woodcutters",
            problemId: "E",
            problemLetter: "E", 
            problemUrl: "https://codeforces.com/gym/567947/problem/E",
            categoryIndex: 2,
            idx: 4
        },
        {
            problemName: "Flowers",
            problemId: "F",
            problemLetter: "F",
            problemUrl: "https://codeforces.com/gym/567947/problem/F",
            categoryIndex: 2,
            idx: 5
        },
        {
            problemName: "Working out",
            problemId: "G",
            problemLetter: "G",
            problemUrl: "https://codeforces.com/gym/567947/problem/G",
            categoryIndex: 2,
            idx: 6
        }
    ]
];

const contest_ids = {
    "567665": 0,
    "567946": 1,
    "567947": 2
};

let users = [
    {{- range $user := $uchilePeople -}}
        {{- if $user.icpc -}}
            {
                nickname: '{{- $user.nickname -}}',
                codeforcesId: '{{- $user.codeforcesId -}}',
                codeforcesRating: {{- $user.codeforcesRating -}},
                atcoderRating: {{- $user.atcoderRating -}}
            },
        {{- end -}}
    {{- end -}}
]

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

async function loadData(data){

    for (let i = 0; i < trainingProblems.length; i ++){
        const tabContent = document.getElementById(`tab-content-${i}`);
        if (!tabContent){
            console.error(`Tab content ${i} not found.`);
            return;
        }

        const table = tabContent.querySelector("table");
        if (!table){
            console.error(`Table not found in tab ${i}.`);
            return;
        }

        correct_order_users = data[0].sort((id1, id2) => {
            if (id2.solves[i] != id1.solves[i])
                return id2.solves[i] - id1.solves[i];
            if (id2.nickname < id1.nickname)
                return 1;
            return -1;
        });

        let totalsNames = table.getElementsByTagName('tr')[0].children;

        for (let j = 0; j < correct_order_users.length; j ++){
            //totalsNames[j + 1].innerText = correct_order_users[j].nickname;
            totalsNames[j + 1].style.fontWeight = "bold";

            let crating = correct_order_users[j].crating
            let arating = correct_order_users[j].arating

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
            totalsNames[j + 1].innerHTML = `<span class="${className}">${correct_order_users[j].nickname}</span>`;

        }

        const row = table.insertRow();
        const totalesCell = row.insertCell(0);
        totalesCell.style.position = "sticky";
        totalesCell.style.left = "0";
        totalesCell.style.backgroundColor = "#f8f9fa";
        totalesCell.textContent = "Totales";
        totalesCell.style.fontWeight = "bold";

        for (let j = 0; j < correct_order_users.length; j ++){
            const userCell = row.insertCell(j + 1);
            userCell.textContent = correct_order_users[j].solves[i];
        }

        for (let j = 0; j < trainingProblems[i].length; j ++){
            const problemRow = table.insertRow();

            const problemCell = problemRow.insertCell(0);
            problemCell.style.position = "sticky";
            problemCell.style.left = "0";
            problemCell.style.backgroundColor = "#f8f9fa";
            problemCell.style.fontWeight = "bold";

            const problemLink = document.createElement("a");
            problemLink.href = trainingProblems[i][j].problemUrl;
            problemLink.textContent = trainingProblems[i][j].problemName;
            problemLink.target = "_blank";
            problemLink.rel = "noopener noreferrer";

            problemCell.appendChild(problemLink);


            for (let k = 0; k < correct_order_users.length; k ++){
                const userCell = problemRow.insertCell(k + 1);
                const id = correct_order_users[k].idx;
                userCell.className = `task-score ${data[1][i][j][id]}`;
            }

        }
    }
    return;
}

function setcache(){
    data = [
        [

        ],
        [

        ]
    ]
    users.forEach((user, id) => {
        let user_data = {
            nickname: user.nickname,
            codeforcesId: user.codeforcesId,
            solves: new Array(trainingNames.length).fill(0),
            idx: id,
            crating: user.codeforcesRating,
            arating: user.atcoderRating
        };
        data[0].push(user_data);
    });

    let n = data[0].length;
    for (let i = 0; i < trainingProblems.length; i ++){
        let problems = []
        for (let j = 0; j < trainingProblems[i].length; j ++){
            problems.push(new Array(n).fill("notAttempted"));
        }
        data[1].push(problems);
    }
    return {
        data: data,
        expires: 0
    }
};

let testData = [
    [
        {
            nickname: "dariasc",
            codeforcesId: "dariasc",
            solves: [5, 0, 0],
            idx: 0,
            crating: 1660,
            arating: 1300
        },
        {
            nickname: "vivivi",
            codeforcesId: "vivivi",
            solves: [7, 0, 0],
            idx: 1,
            crating: 1500,
            arating: 100
        },
        {
            nickname: "m1tu",
            codeforcesId: "m1tu",
            solves: [2, 0, 0],
            idx: 2,
            crating: 1400,
            arating: 100
        },
        {
            nickname: "mapachetactico",
            codeforcesId: "MapacheTactico",
            solves: [3, 0, 0],
            idx: 3,
            crating: 1200,
            arating: 0
        }
    ],
    [
        [
            ["accepted", "attempted", "notAttempted", "accepted"],
            ["notAttempted", "accepted", "notAttempted", "notAttempted"]
        ],
        [

        ],
        [

        ]
    ]
]

function getProblemIdxFromLetter(letters){
    if (letters.length === 1) {
        return letters.charCodeAt(0) - 'A'.charCodeAt(0);
    } else {
        const firstLetter = letters.charCodeAt(0) - 'A'.charCodeAt(0) + 1; // Convert first letter to 1-based index
        const secondLetter = letters.charCodeAt(1) - 'A'.charCodeAt(0);     // Convert second letter to 0-based index
        return firstLetter * 26 + secondLetter - 1;
    }
};

async function populateTables(contestId, apiKey, secret) {

    const gymTablesContainer = document.getElementById("gym-tab-content");
    if (!gymTablesContainer) {
        console.error("Tables container not found!");
        return;
    }


    let gymcache = localStorage.getItem('gymCache');

    if (gymcache !== null){
        gymcache = JSON.parse(gymcache);
    }
    let dt = new Date();
{{ if eq (hugo.Environment) "development" }}
    if (true) {
{{ else }}
    if (gymcache === null || gymcache.expires < dt.getTime()) {
{{ end }}
        const submissions = await Promise.resolve(fetchContestStatus(contestId, 1, 100, true, apiKey, secret));

        if (gymcache === null){
            gymcache = setcache();
        }
        else {
            // Fix to fill cache by standings instead of status
            gymcache = setcache();

        }
        if (submissions){
            submissions.forEach((submission, id) => {
                const verdict = submission.verdict;
                let res = (verdict === "OK" ? "accepted" : "attempted");
                const userId = submission.author.members[0].handle;
                const contestIdx = contest_ids[submission.contestId];
                const problemIdx = getProblemIdxFromLetter(submission.problem.index);
                for (let i = 0; i < gymcache.data[0].length; i ++){
                    if (gymcache.data[0][i].codeforcesId === userId){
                        let bef = gymcache.data[1][contestIdx][problemIdx][gymcache.data[0][i].idx];
                        if (bef === res){

                        }
                        else{
                            gymcache.data[1][contestIdx][problemIdx][gymcache.data[0][i].idx] = res;
                            gymcache.data[0][i].solves[contestIdx] = gymcache.data[0][i].solves[contestIdx] + 1;
                        }
                    }
                }
            });
        }
        gymcache.expires = (dt.getTime() + 300 * 1000);
        localStorage.setItem('gymCache', JSON.stringify(gymcache));
        loadData(gymcache.data);
    }
    else {
        loadData(gymcache.data);
    }

    return;
}


populateTables(567665, "e23005a4a475b6079a98c6c75f9d24408033ece7", "d6c254ba481a12d0370517c93e2f4a2a5595586e");

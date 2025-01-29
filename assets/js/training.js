{{ $uchilePeople := .Site.Params.uchilePeople -}}

const trainingNames = [
    "Búsqueda Binaria / Dos Punteros",
    "Grafos: BFS / DFS / Dijkstra / DSU",
    "Programación Dinámica",
    "Estructuras de Datos"
]

const contests_ids = [
    "567665",
    "567946",
    "567947",
    "568427"
];

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

let complete_users_list = [
    {{- range $user := $uchilePeople -}}
        '{{- $user.codeforcesId -}}',
    {{- end -}}
]

// let users = [
//     {{- range $user := $uchilePeople -}}
//         {
//             nickname: '{{- $user.nickname -}}',
//             codeforcesId: '{{- $user.codeforcesId -}}',
//             codeforcesRating: {{- $user.codeforcesRating -}},
//             atcoderRating: {{- $user.atcoderRating -}}
//         },
//     {{- end -}}
// ]

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

async function fetchContestStandings(contestId, apiKey, secret) {
    const asManager = true, from = 1, count = 30, showUnofficial = true;
    participantTypes = "PRACTICE";
    const methodName = "contest.standings"
    let handles = complete_users_list.join;
    const params = { contestId, from, count, asManager, showUnofficial, participantTypes };
    handles = complete_users_list.join(';');
    const { apiSig, time } = await generateApiSig(methodName, params, apiKey, secret);
    const url = `https://codeforces.com/api/${methodName}?apiKey=${apiKey}&asManager=${asManager}&contestId=${contestId}&count=${count}&from=${from}&participantTypes=${participantTypes}&showUnofficial=${showUnofficial}&time=${time}&apiSig=${apiSig}`;
    const response = await fetch(url);
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
async function loadData(data){
    for (let i = 0; i < trainingNames.length; i ++){
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
        const contestId = contests_ids[i];
        contest_data = data[contestId];
        problem_list = contest_data[0];

        let totalsNames = table.getElementsByTagName('tr')[0].children;
        
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
                totalsNames[usedcols + 1].style.fontWeight = "bold";
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
            totalsNames[usedcols + 1].style.fontWeight = "bold";
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
                const userCell = row.insertCell(ccol + 1);
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
            const userCell = row.insertCell(ccol + 1)
            userCell.textContent = 0;
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
                    const userCell = problemRow.insertCell(newk + 1);
                    let score_v = contest_data[1][k].solves[j];
                    let value = (score_v == 2 ? "accepted" : (score_v == 1 ? "attempted" : "notAttempted"));
                    userCell.className = `task-score ${value}`;
                    newk ++;
                }
            }
            for (const [user_handle, value] of Object.entries(users2)){
                const userCell = problemRow.insertCell(newk + 1)
                userCell.className = `task-score notAttemped`;
                newk += 1
            }
        }
    }
    return;
}

function setcache(){
    return {
        data: [],
        expires: 0
    }
};

async function populateTables(apiKey, secret) {

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

        if (gymcache === null){
            gymcache = setcache();
        }
        else {
            // Fix to fill cache by standings instead of status
            gymcache = setcache();
        }
        
        gymcache.data = {}

        for (let j = 0; j < contests_ids.length; j ++){
            const contestId = contests_ids[j]
            // const submissions = await Promise.resolve(fetchContestStatus(contestId, 1, 100, true, apiKey, secret));
            const standings = await Promise.resolve(fetchContestStandings(contestId, apiKey, secret));
            if (standings) {
                console.log(standings);
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
                gymcache.data[contestId] = [
                    problem_names,
                    data_rows
                ]
            }
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


populateTables("e23005a4a475b6079a98c6c75f9d24408033ece7", "d6c254ba481a12d0370517c93e2f4a2a5595586e");

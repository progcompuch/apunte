const RATING_COLOR_ORDER = [
    "rating-black",
    "rating-gray",
    "rating-green",
    "rating-cyan",
    "rating-blue",
    "rating-purple",
    "rating-orange",
    "rating-red"
];

function applyFilters() {
    const showFemOnly = document.getElementById("filter-femeligible").checked;
    const rows = document.querySelectorAll("#teamsIcpc-tbody tr");

    rows.forEach(row => {
        const isFemEligible = row.classList.contains("fem-eligible");
        row.style.display = showFemOnly && !isFemEligible ? "none" : "table-row";
    });
}



function getBestColorClass(member) {
    const colorClasses = [];

    if (typeof member.codeforcesRating === "number")
        colorClasses.push(getCodeforcesRatingClass(member.codeforcesRating));
    if (typeof member.atcoderRating === "number")
        colorClasses.push(getAtcoderRatingClass(member.atcoderRating));

    if (colorClasses.length === 0) return "rating-black";

    return colorClasses.reduce((best, current) => {
        return RATING_COLOR_ORDER.indexOf(current) > RATING_COLOR_ORDER.indexOf(best)
            ? current
            : best;
    }, "rating-black");
}


function updateTeamTable(teams) {
    const tbody = document.getElementById("teamsIcpc-tbody");
    tbody.innerHTML = ""; // Clear previous content

    teams.forEach(team => {
        const row = document.createElement("tr");
        row.setAttribute("data-university", team.organization.toLowerCase());

        if (team.fem) row.classList.add("fem-eligible");
        row.classList.add("icpc-eligible");

        const membersHtml = team.members.map(member => {
            const colorClass = getBestColorClass(member);
            return `<span class="${colorClass}">${member.nickname}</span>`;
        }).join(' <span style="color:#888;">+</span> ');

        row.innerHTML = `
            <td><span class="team-name">${team.name}</span></td>
            <td><img src="/images/universities/${team.organization}.png" class="university-logo"></td>
            <td>${membersHtml}</td>
        `;

        tbody.appendChild(row);
    });
}


async function populateTeams() {
    try {
        const response = await fetch("https://joliva.cl/api/teams");
        if (!response.ok) throw new Error("Failed to fetch teams");

        let teams = (await response.json()).result;

        teams.sort((a, b) => {
            const orgCompare = a.organization.localeCompare(b.organization);
            if (orgCompare !== 0) return orgCompare;
            return a.name.localeCompare(b.name);
        });

        document.getElementById("filter-femeligible").addEventListener("change", applyFilters);
        updateTeamTable(teams);
        applyFilters();
    } catch (error) {
        console.error("Error fetching teams:", error);
    }
}

function createTableRow(nickname, rating, judge, organization, femeligible, icpc) {

    const row = document.createElement("tr");
    row.setAttribute("data-university", organization.toLowerCase());

    if (icpc) row.classList.add("icpc-eligible");
    if (femeligible) row.classList.add("fem-eligible");

    row.innerHTML = `
        <td><span class="${getRatingClass(judge, rating)}">${nickname}</span></td>
        <td><img src="/images/universities/${organization}.png" class="university-logo"></td>
        <td><span class="${getRatingClass(judge, rating)}">${rating}</span></td>
    `;
    return { nickname, rating, row };
}

function clearTable(tableId) {
    const tbody = document.getElementById(tableId);
    if (!tbody) {
        console.warn(`Table ID '${tableId}' not found!`);
        return;
    }

    // ✅ Keep the first row (header row) intact
    while (tbody.children.length > 1) {
        tbody.removeChild(tbody.lastChild);
    }
}
function sortAndRenderTable(tableId, rows) {
    const tbody = document.getElementById(tableId);
    if (!tbody) {
        console.warn(`Table '${tableId}' not found!`);
        return;
    }

    rows.sort((a, b) => b.rating - a.rating);
    rows.forEach(entry => {
        if (entry.row) {
            tbody.appendChild(entry.row);
        }
    });
}

function getRatingClass(judge, rating) {
    if (judge === "codeforces") {
        return getCodeforcesRatingClass(rating);
    } else if (judge === "atcoder") {
        return getAtcoderRatingClass(rating);
    } else if (judge === "leetcode") {
        return getLeetcodeRatingClass(rating);
    } else if (judge === "codechef") {
        return getCodechefRatingClass(rating);
    } else if (judge === "luogu") {
        return getLuoguRatingClass(rating);
    }
    return "";
}

function getCodeforcesRatingClass(rating) {
    if (rating < 800) return "rating-black";
    if (rating < 1200) return "rating-gray";
    if (rating < 1400) return "rating-green";
    if (rating < 1600) return "rating-cyan";
    if (rating < 1900) return "rating-blue";
    if (rating < 2100) return "rating-purple";
    if (rating < 2400) return "rating-orange";
    return "rating-red";
}

function getAtcoderRatingClass(rating) {
    if (rating < 200) return "rating-black";
    if (rating < 400) return "rating-gray";
    if (rating < 900) return "rating-green";
    if (rating < 1400) return "rating-cyan";
    if (rating < 1700) return "rating-blue";
    if (rating < 2000) return "rating-purple";
    if (rating < 2400) return "rating-orange";
    return "rating-red";
}

function getLeetcodeRatingClass(rating) {
    if (rating < 800) return "rating-black";
    if (rating < 1400) return "rating-gray";
    if (rating < 1600) return "rating-green";
    if (rating < 1900) return "rating-cyan";
    if (rating < 2100) return "rating-blue";
    if (rating < 2400) return "rating-purple";
    if (rating < 2900) return "rating-orange";
    return "rating-red";
}

function getCodechefRatingClass(rating) {
    if (rating < 1000) return "rating-black";
    if (rating < 1200) return "rating-gray";
    if (rating < 1500) return "rating-green";
    if (rating < 1700) return "rating-cyan";
    if (rating < 1900) return "rating-blue";
    if (rating < 2200) return "rating-purple";
    if (rating < 2600) return "rating-orange";
    return "rating-red";
}

function getLuoguRatingClass(rating) {
    if (rating < 200) return "rating-black";
    if (rating < 600) return "rating-gray";
    if (rating < 900) return "rating-green";
    if (rating < 1100) return "rating-cyan";
    if (rating < 1400) return "rating-blue";
    if (rating < 1700) return "rating-purple";
    if (rating < 2100) return "rating-orange";
    return "rating-red";
}

populateTeams();
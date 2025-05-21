document.addEventListener("DOMContentLoaded", function () {
    const universityFilter = document.getElementById("university-filter");
    const icpcToggle = document.getElementById("toggle-icpc");
    const femeligibleFilter = document.getElementById("filter-femeligible"); // ✅ New
    const icpcFilter = document.getElementById("filter-icpc"); // ✅ New

    function applyFilters() {
        let selectedUniversities = [];
        let checkboxes = universityFilter.querySelectorAll("input[type='checkbox']:checked");

        checkboxes.forEach(checkbox => {
            selectedUniversities.push(checkbox.value.toLowerCase());
        });

        let showICPC = icpcFilter.checked; // ✅ Check if ICPC filter is ON
        let showFemeligible = femeligibleFilter.checked; // ✅ Check if Femeligible filter is ON

        let rows = document.querySelectorAll("table tbody tr");

        rows.forEach(row => {
            let university = row.getAttribute("data-university")?.toLowerCase();
            let isICPCEligible = row.classList.contains("icpc-eligible");
            let isFemEligible = row.classList.contains("fem-eligible");

            let matchesUniversity = selectedUniversities.includes(university);
            let matchesICPC = !showICPC || isICPCEligible; // If filter is ON, only show ICPC eligible
            let matchesFem = !showFemeligible || isFemEligible; // If filter is ON, only show femeligible

            row.style.display = (matchesUniversity && matchesICPC && matchesFem) ? "table-row" : "none";
        });
    }

    universityFilter.addEventListener("change", applyFilters);
    icpcFilter.addEventListener("change", applyFilters); // ✅ Listen for ICPC filter changes
    femeligibleFilter.addEventListener("change", applyFilters); // ✅ Listen for Femeligible filter changes

    async function populateRatings() {
        try {
            const response = await fetch("https://joliva.cl/api/userRatings");
            if (!response.ok) throw new Error("Failed to fetch user ratings");

            const userRatings = (await response.json()).result;

            if (!userRatings || userRatings.length === 0) {
                console.warn("No user ratings found! Check your API response.");
                return;
            }

            updateTables(userRatings);

            // ✅ Apply filters after populating tables
            applyFilters();
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
    }

    populateRatings();
});

function updateTables(userRatings) {
    clearTable("codeforces-tbody");
    clearTable("atcoder-tbody");
    clearTable("leetcode-tbody");
    clearTable("codechef-tbody");

    const tables = {
        "codeforces-tbody": [],
        "atcoder-tbody": [],
        "leetcode-tbody": [],
        "codechef-tbody": []
    };

    userRatings.forEach(user => {
        if (user.active)
        {
            tables["codeforces-tbody"].push(createTableRow(user.nickname, user.codeforcesRating, "codeforces", user.organization, user.femeligible, user.icpc));
            tables["atcoder-tbody"].push(createTableRow(user.nickname, user.atcoderRating, "atcoder", user.organization, user.femeligible, user.icpc));
            tables["leetcode-tbody"].push(createTableRow(user.nickname, user.leetcodeRating, "leetcode", user.organization, user.femeligible, user.icpc));
            tables["codechef-tbody"].push(createTableRow(user.nickname, user.codechefRating, "codechef", user.organization, user.femeligible, user.icpc));
        }
    });

    Object.keys(tables).forEach(tableId => {
        sortAndRenderTable(tableId, tables[tableId]);
    });
}

function createTableRow(nickname, rating, judge, organization, femeligible, icpc) {

    const row = document.createElement("tr");
    row.setAttribute("data-university", organization.toLowerCase());

    // ✅ Add classes for filtering
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
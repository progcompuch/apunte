const path = window.location.pathname;

function applyDurationFilter() {
    const min = parseFloat(document.getElementById("filter-duration-min").value) || 0;
    const max = parseFloat(document.getElementById("filter-duration-max").value) || Infinity;

    const rows = document.querySelectorAll("#codeforces-gyms-sim-tbody tr");

    rows.forEach(row => {
        const durationCell = row.querySelector("td:last-child");
        if (!durationCell) return;

        const match = durationCell.textContent.match(/([\d.]+)/);
        const duration = match ? parseFloat(match[1]) : 0;

        row.style.display = (duration >= min && duration <= max) ? "" : "none";
    });
}

function sortByPdaDescending() {
    const tbody = document.getElementById("codeforces-gyms-sim-tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const aVal = parseInt(a.children[2].textContent.trim()) || 0;
        const bVal = parseInt(b.children[2].textContent.trim()) || 0;
        return bVal - aVal; // Descending
    });

    rows.forEach(row => tbody.appendChild(row));
    applyDurationFilter();
}

function sortByChileanDescending() {
    const tbody = document.getElementById("codeforces-gyms-sim-tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const aVal = parseInt(a.children[3].textContent.trim()) || 0;
        const bVal = parseInt(b.children[3].textContent.trim()) || 0;
        return bVal - aVal; // Descending
    });

    rows.forEach(row => tbody.appendChild(row));
    applyDurationFilter();
}

async function populateGymsTable() {
    try {
        const response = await fetch("https://joliva.cl/api/gymsToSim");
        if (!response.ok) throw new Error("Failed to fetch gym contests");

        const gymData = (await response.json()).result;
        const tbody = document.getElementById("codeforces-gyms-sim-tbody");

        gymData.forEach(gym => {
            const row = document.createElement("tr");

            const stars = gym.stars ?? 0;
            const starString = "★".repeat(stars);

            const getRankSymbolByPosition = (index) => {
                if (index === 0) return "🥇";
                if (index === 1) return "🥈";
                if (index === 2) return "🥉";
                return `🏵️ #${index + 1}`;
            }

            const getCodeforcesRatingClass = (rating) => {
                if (rating < 800) return "rating-black";
                if (rating < 1200) return "rating-gray";
                if (rating < 1400) return "rating-green";
                if (rating < 1600) return "rating-cyan";
                if (rating < 1900) return "rating-blue";
                if (rating < 2100) return "rating-purple";
                if (rating < 2400) return "rating-orange";
                return "rating-red";
            };

            const getIcon = (team) => {
                console.log(team);
                const worldIcon = `🌍`;
                if (!team.teamCountry || team.teamCountry === "World" || team.teamCountry === "")
                    return worldIcon;
                const flagIcon = `<img src="/images/${team.teamCountry.replace(/\s+/g, "")}.png" alt="🇨🇱" style="width: 16px; vertical-align: middle; margin-right: 4px;">`;
                return flagIcon;
            };

            let cTooltip = "";
            const flag = `<img src="/images/Chile.png" alt="🇨🇱" style="width: 16px; vertical-align: middle; margin-right: 4px;">`;
            if (gym.chileanTeams && gym.chileanTeams.length > 0) {
                cTooltip = gym.chileanTeams.map((team, index) => {
                    const rankSymbol = getRankSymbolByPosition(index);
                    const memberList = team.teamMembers.map(member => {
                        const colorClass = getCodeforcesRatingClass(member.rating ?? 0);
                        return `<span class="${colorClass}">${member.handle}</span>`;
                    }).join(", ");

                    return `
                        <div>
                            ${rankSymbol} (${team.teamRank}) – <strong>${team.teamName}</strong><br>
                            ${flag} ${memberList}<br>
                            ✅ ${team.teamSolves}
                        </div>`;
                }).join("<hr>");
            }

            let pTooltip = "";
            if (gym.pdaTeams && gym.pdaTeams.length > 0) {
                pTooltip = gym.pdaTeams.map((team, index) => {
                    const rankSymbol = getRankSymbolByPosition(index);
                    const cIcon = getIcon(team);
                    const memberList = team.teamMembers.map(member => {
                        const colorClass = getCodeforcesRatingClass(member.rating ?? 0);
                        return `<span class="${colorClass}">${member.handle}</span>`;
                    }).join(", ");

                    return `
                        <div>
                            ${rankSymbol} (${team.teamRank}) – <strong>${team.teamName}</strong><br>
                            ${cIcon} ${memberList}<br>
                            ✅ ${team.teamSolves}
                        </div>`;
                }).join("<hr>");
            }

            row.innerHTML = `
                <td><a href="${gym.url}" target="_blank">${gym.name}</a></td>
                <td class="stars">${starString || '—'}</td>
                <td class="pda-cell">${gym.numberOfPda2025Teams}</td>
                <td class="chilean-cell">${gym.numberOfChilean2025Teams}</td>
                <td>${gym.season ?? ''}</td>
                <td>${(gym.duration / 3600).toFixed(1)} horas</td>
            `;

            if (cTooltip) {
                const chileanTd = row.querySelector(".chilean-cell");
                tippy(chileanTd, {
                    content: cTooltip,
                    allowHTML: true,
                    theme: 'light-border',
                    interactive: true,
                    placement: 'right',
                    onShow(instance) {
                        instance.popper.querySelector('.tippy-content').classList.add('scrollable-tooltip');
                    }
                });
            }

            if (pTooltip) {
                const pdaTd = row.querySelector(".pda-cell");
                tippy(pdaTd, {
                    content: pTooltip,
                    allowHTML: true,
                    theme: 'light-border',
                    interactive: true,
                    placement: 'right',
                    onShow(instance) {
                        instance.popper.querySelector('.tippy-content').classList.add('scrollable-tooltip');
                    }
                });
            }

            tbody.appendChild(row);
        });
        document.getElementById("filter-duration-min").addEventListener("input", applyDurationFilter);
        document.getElementById("filter-duration-max").addEventListener("input", applyDurationFilter);

        document.getElementById("sort-pda").addEventListener("click", () => {
            sortByPdaDescending();
            document.getElementById("sort-pda").blur(); // ✅ visually un-presses the button
        });

        document.getElementById("sort-chilean").addEventListener("click", () => {
            sortByChileanDescending();
            document.getElementById("sort-chilean").blur(); // ✅ visually un-presses the button
        });

        applyDurationFilter();
    } catch (error) {
        console.error("Error loading gyms:", error);
    }
}


populateGymsTable();

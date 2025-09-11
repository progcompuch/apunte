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

        if (duration < min || duration > max)
            row.style.display = "none";
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

function applyNamesFilter() {
    const names = getUserFilterNames();
    const rows = document.querySelectorAll("#codeforces-gyms-sim-tbody tr");
    if (names.length === 0) {
        rows.forEach(r => r.style.display = '');
        return;
    }
    console.log(names);
    rows.forEach(row => {
        let members = [];
        var oka = false;
        try {
            members = JSON.parse(row.dataset.members || '[]');
        } catch {
            members = String(row.dataset.members || '').split(/[,\|]+/).map(s => s.trim().toLowerCase());
        }
        names.forEach(team => {
            const hasMatch = members.length > 0 && team.every(n => members.includes(n));
            if (hasMatch)
                oka = true;
        });

        row.style.display = oka ? '' : 'none';
    });
}

function getUserFilterNames() {
    const finput = document.getElementById('user-filter-input');
    if (finput && finput.value){
        const l = finput.value.split(/[;]+/).map(s => s.trim()).filter(Boolean);
        var lists = [];
        l.forEach(team => {
            const teamlist = team.split(/[,]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
            if (teamlist.length)
                lists.push(Array.from(new Set(teamlist)));
        });
        if (lists.length) return lists;
    }
    return [];
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
                return ``;
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
                        <div style="
                            display: grid;
                            grid-template-columns: 36px 2fr 64px;
                            align-items: center;
                            column-gap: 12px;
                        ">
                        <div style="
                            height: 32px;
                            width: 48px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            font-size: ${index < 3 ? '2em' : '1.6em'};
                            line-height: 1;
                        ">
                            ${getRankSymbolByPosition(index)}
                            ${index >= 3 ? `
                            <span style="
                                position: absolute;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background-color: #ffcc66;
                                color: #222;
                                font-weight: bold;
                                font-size: 0.6em;
                                box-shadow: 0 0 2px rgba(0,0,0,0.6);
                            ">
                                ${index + 1}
                            </span>
                            ` : ''}
                        </div>
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <div>
                                    (${team.teamRank}) – <strong>${team.teamName}</strong>
                                </div>
                                <div>
                                    ${flag} ${team.teamMembers.map(member => {
                                        const colorClass = getCodeforcesRatingClass(member.rating ?? 0);
                                        return `<span class="${colorClass}">${member.handle}</span>`;
                                    }).join(", ")}
                                </div>
                            </div>
                            <div style="
                                height: 32px;
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                                font-size: 1.5em;
                                font-weight: bold;
                                line-height: 1;
                            ">
                                ✅ ${team.teamSolves}
                            </div>
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
                        <div style="
                            display: grid;
                            grid-template-columns: 36px 2fr 64px;
                            align-items: center;
                            column-gap: 12px;
                        ">
                        <div style="
                            height: 32px;
                            width: 48px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            font-size: ${index < 3 ? '2em' : '1.6em'};
                            line-height: 1;
                        ">
                            ${getRankSymbolByPosition(index)}
                            ${index >= 3 ? `
                            <span style="
                                position: absolute;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background-color: #ffcc66;
                                color: #222;
                                font-weight: bold;
                                font-size: 0.6em;
                                box-shadow: 0 0 2px rgba(0,0,0,0.6);
                            ">
                                ${index + 1}
                            </span>
                            ` : ''}
                        </div>
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <div>
                                    (${team.teamRank}) – <strong>${team.teamName}</strong>
                                </div>
                                <div>
                                    ${getIcon(team)} ${team.teamMembers.map(member => {
                                        const colorClass = getCodeforcesRatingClass(member.rating ?? 0);
                                        return `<span class="${colorClass}">${member.handle}</span>`;
                                    }).join(", ")}
                                </div>
                            </div>
                            <div style="
                                height: 32px;
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                                font-size: 1.5em;
                                font-weight: bold;
                                line-height: 1;
                            ">
                                ✅ ${team.teamSolves}
                            </div>
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
            const memberSet = new Set();

            (gym.chileanTeams || []).forEach(team =>
                (team.teamMembers || []).forEach(m => m?.handle && memberSet.add(m.handle.toLowerCase().trim()))
            );

            (gym.pdaTeams || []).forEach(team =>
                (team.teamMembers || []).forEach(m => m?.handle && memberSet.add(m.handle.toLowerCase().trim()))
            );
            row.dataset.members = JSON.stringify(Array.from(memberSet));
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

        document.getElementById("user-filter-search").addEventListener("click", () => {
            applyNamesFilter();
            applyDurationFilter();
            document.getElementById("user-filter-search").blur();
        });

        document.getElementById("user-filter-clear").addEventListener("click", () => {
            const finput = document.getElementById("user-filter-input");
            if (finput)
                finput.textContent = '';
            finput.value = '';
            applyNamesFilter();
            applyDurationFilter();
            document.getElementById("user-filter-clear").blur();
        });

        applyDurationFilter();
    } catch (error) {
        console.error("Error loading gyms:", error);
    }
}


populateGymsTable();

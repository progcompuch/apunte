const path = window.location.pathname;

async function populateGymsTable() {
    try {
        const response = await fetch("https://joliva.cl/api/gymsToSim");
        if (!response.ok) throw new Error("Failed to fetch gym contests");

        const gymData = (await response.json()).result;
        const tbody = document.getElementById("codeforces-gyms-sim-tbody");

        gymData.forEach(gym => {
            const row = document.createElement("tr");

            // Stars display: ★ repeated or empty if undefined
            const stars = gym.stars ?? 0;
            const starString = "★".repeat(stars);

            row.innerHTML = `
                <td><a href="${gym.url}" target="_blank">${gym.name}</a></td>
                <td style="color: gold; font-size: 18px;">${starString}</td>
                <td>${gym.numberOfPda2025Teams}</td>
                <td>${gym.numberOfChilean2025Teams}</td>
                <td>${gym.season ?? ""}</td>
            `;

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading gyms:", error);
    }
}

populateGymsTable();

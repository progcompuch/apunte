const path=window.location.pathname;async function populateGymsTable(){try{const e=await fetch("https://joliva.cl/api/gymsToSim");if(!e.ok)throw new Error("Failed to fetch gym contests");const t=(await e.json()).result,n=document.getElementById("codeforces-gyms-sim-tbody");t.forEach(e=>{const t=document.createElement("tr"),s=e.stars??0,o="★".repeat(s);t.innerHTML=`
                <td><a href="${e.url}" target="_blank">${e.name}</a></td>
                <td style="color: gold; font-size: 18px;">${o}</td>
                <td>${e.numberOfPda2025Teams}</td>
                <td>${e.numberOfChilean2025Teams}</td>
                <td>${e.season??""}</td>
            `,n.appendChild(t)})}catch(e){console.error("Error loading gyms:",e)}}populateGymsTable()
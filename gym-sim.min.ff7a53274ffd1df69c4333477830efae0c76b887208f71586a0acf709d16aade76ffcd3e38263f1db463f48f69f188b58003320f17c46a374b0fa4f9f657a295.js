const path=window.location.pathname;function applyDurationFilter(){const e=parseFloat(document.getElementById("filter-duration-min").value)||0,t=parseFloat(document.getElementById("filter-duration-max").value)||1/0,n=document.querySelectorAll("#codeforces-gyms-sim-tbody tr");n.forEach(n=>{const s=n.querySelector("td:last-child");if(!s)return;const o=s.textContent.match(/([\d.]+)/),i=o?parseFloat(o[1]):0;(i<e||i>t)&&(n.style.display="none")})}function sortByPdaDescending(){const e=document.getElementById("codeforces-gyms-sim-tbody"),t=Array.from(e.querySelectorAll("tr"));t.sort((e,t)=>{const n=parseInt(e.children[2].textContent.trim())||0,s=parseInt(t.children[2].textContent.trim())||0;return s-n}),t.forEach(t=>e.appendChild(t)),applyDurationFilter()}function sortByChileanDescending(){const e=document.getElementById("codeforces-gyms-sim-tbody"),t=Array.from(e.querySelectorAll("tr"));t.sort((e,t)=>{const n=parseInt(e.children[3].textContent.trim())||0,s=parseInt(t.children[3].textContent.trim())||0;return s-n}),t.forEach(t=>e.appendChild(t)),applyDurationFilter()}function applyNamesFilter(){const e=getUserFilterNames(),t=document.querySelectorAll("#codeforces-gyms-sim-tbody tr");if(e.length===0){t.forEach(e=>e.style.display="");return}console.log(e),t.forEach(t=>{let n=[];var s=!1;try{n=JSON.parse(t.dataset.members||"[]")}catch{n=String(t.dataset.members||"").split(/[,|]+/).map(e=>e.trim().toLowerCase())}e.forEach(e=>{const t=n.length>0&&e.every(e=>n.includes(e));t&&(s=!0)}),t.style.display=s?"":"none"})}function getUserFilterNames(){const e=document.getElementById("user-filter-input");if(e&&e.value){const n=e.value.split(/[;]+/).map(e=>e.trim()).filter(Boolean);var t=[];if(n.forEach(e=>{const n=e.split(/[,]+/).map(e=>e.trim().toLowerCase()).filter(Boolean);n.length&&t.push(Array.from(new Set(n)))}),t.length)return t}return[]}async function populateGymsTable(){try{const e=await fetch("https://joliva.cl/api/gymsToSim");if(!e.ok)throw new Error("Failed to fetch gym contests");const t=(await e.json()).result,n=document.getElementById("codeforces-gyms-sim-tbody");t.forEach(e=>{const t=document.createElement("tr"),l=e.stars??0,d="★".repeat(l),s=e=>e===0?"🥇":e===1?"🥈":e===2?"🥉":``,o=e=>e<800?"rating-black":e<1200?"rating-gray":e<1400?"rating-green":e<1600?"rating-cyan":e<1900?"rating-blue":e<2100?"rating-purple":e<2400?"rating-orange":"rating-red",c=e=>{console.log(e);const t=`🌍`;if(!e.teamCountry||e.teamCountry==="World"||e.teamCountry==="")return t;const n=`<img src="/images/${e.teamCountry.replace(/\s+/g,"")}.png" alt="🇨🇱" style="width: 16px; vertical-align: middle; margin-right: 4px;">`;return n};let i="";const u=`<img src="/images/Chile.png" alt="🇨🇱" style="width: 16px; vertical-align: middle; margin-right: 4px;">`;e.chileanTeams&&e.chileanTeams.length>0&&(i=e.chileanTeams.map((e,t)=>{const n=s(t),i=e.teamMembers.map(e=>{const t=o(e.rating??0);return`<span class="${t}">${e.handle}</span>`}).join(", ");return`
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
                            font-size: ${t<3?"2em":"1.6em"};
                            line-height: 1;
                        ">
                            ${s(t)}
                            ${t>=3?`
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
                                ${t+1}
                            </span>
                            `:""}
                        </div>
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <div>
                                    (${e.teamRank}) – <strong>${e.teamName}</strong>
                                </div>
                                <div>
                                    ${u} ${e.teamMembers.map(e=>{const t=o(e.rating??0);return`<span class="${t}">${e.handle}</span>`}).join(", ")}
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
                                ✅ ${e.teamSolves}
                            </div>
                        </div>`}).join("<hr>"));let a="";if(e.pdaTeams&&e.pdaTeams.length>0&&(a=e.pdaTeams.map((e,t)=>{const n=s(t),i=c(e),a=e.teamMembers.map(e=>{const t=o(e.rating??0);return`<span class="${t}">${e.handle}</span>`}).join(", ");return`
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
                            font-size: ${t<3?"2em":"1.6em"};
                            line-height: 1;
                        ">
                            ${s(t)}
                            ${t>=3?`
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
                                ${t+1}
                            </span>
                            `:""}
                        </div>
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <div>
                                    (${e.teamRank}) – <strong>${e.teamName}</strong>
                                </div>
                                <div>
                                    ${c(e)} ${e.teamMembers.map(e=>{const t=o(e.rating??0);return`<span class="${t}">${e.handle}</span>`}).join(", ")}
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
                                ✅ ${e.teamSolves}
                            </div>
                        </div>`}).join("<hr>")),t.innerHTML=`
                <td><a href="${e.url}" target="_blank">${e.name}</a></td>
                <td class="stars">${d||"—"}</td>
                <td class="pda-cell">${e.numberOfPda2025Teams}</td>
                <td class="chilean-cell">${e.numberOfChilean2025Teams}</td>
                <td>${e.season??""}</td>
                <td>${(e.duration/3600).toFixed(1)} horas</td>
            `,i){const e=t.querySelector(".chilean-cell");tippy(e,{content:i,allowHTML:!0,theme:"light-border",interactive:!0,placement:"right",onShow(e){e.popper.querySelector(".tippy-content").classList.add("scrollable-tooltip")}})}if(a){const e=t.querySelector(".pda-cell");tippy(e,{content:a,allowHTML:!0,theme:"light-border",interactive:!0,placement:"right",onShow(e){e.popper.querySelector(".tippy-content").classList.add("scrollable-tooltip")}})}const r=new Set;(e.chileanTeams||[]).forEach(e=>(e.teamMembers||[]).forEach(e=>e?.handle&&r.add(e.handle.toLowerCase().trim()))),(e.pdaTeams||[]).forEach(e=>(e.teamMembers||[]).forEach(e=>e?.handle&&r.add(e.handle.toLowerCase().trim()))),t.dataset.members=JSON.stringify(Array.from(r)),n.appendChild(t)}),document.getElementById("filter-duration-min").addEventListener("input",applyDurationFilter),document.getElementById("filter-duration-max").addEventListener("input",applyDurationFilter),document.getElementById("sort-pda").addEventListener("click",()=>{sortByPdaDescending(),document.getElementById("sort-pda").blur()}),document.getElementById("sort-chilean").addEventListener("click",()=>{sortByChileanDescending(),document.getElementById("sort-chilean").blur()}),document.getElementById("user-filter-search").addEventListener("click",()=>{applyNamesFilter(),applyDurationFilter(),document.getElementById("user-filter-search").blur()}),document.getElementById("user-filter-clear").addEventListener("click",()=>{const e=document.getElementById("user-filter-input");e&&(e.textContent=""),e.value="",applyNamesFilter(),applyDurationFilter(),document.getElementById("user-filter-clear").blur()}),applyDurationFilter()}catch(e){console.error("Error loading gyms:",e)}}populateGymsTable()
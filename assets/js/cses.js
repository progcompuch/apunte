{{ $ids   := .Site.Params.csesIds -}}
{{ $names := .Site.Params.csesNames -}}

const csesProblemIds = [[1068,1083,1069,1094,1070,1071,1072,1092,1617,1618,1754,1755,2205,2165,1622,1623,1624,2431,1625,],[1621,1084,1090,1091,1619,1629,1640,1643,1074,2183,2216,2217,1141,1073,1163,2162,2163,2168,2169,1164,1620,1630,1631,1641,1642,1645,1660,1661,1662,2428,1085,1076,1077,1632,1644,],[1633,1634,1635,1636,1637,1638,1158,1746,2413,1639,1744,1745,1097,1093,1145,1140,1653,2181,2220,],[1192,1193,1666,1667,1668,1669,1194,1671,1672,1673,1195,1197,1196,1678,1679,1680,1681,1202,1750,1160,1751,1675,1676,1682,1683,1684,1686,1691,1692,1693,1690,1689,1694,1695,1696,1711,],[1646,1647,1648,1649,1650,1651,1652,1143,1749,1144,2166,2206,1190,1734,2416,1739,1735,1736,1737,],[1674,1130,1131,1132,1133,1687,1688,1135,1136,1137,1138,2134,1139,2079,2080,2081,],[2164,1095,1712,1713,1081,1082,2182,2185,2417,1079,1715,1716,1717,2064,2187,2209,2210,1722,1096,1723,1724,1725,1726,1727,1728,1729,1730,1098,1099,2207,2208,],[1731,1753,1732,1733,1110,1111,1112,2420,2102,2103,2104,2105,2106,2107,2108,2109,2110,],[2189,2190,2191,2192,2193,2194,2195,],[1628,2136,2137,2138,2143,2072,2073,2074,2076,2077,2078,2084,2085,2086,2087,2088,2111,2112,2113,2101,2133,2121,2129,2130,],[1087,1146,1670,1134,1756,2177,2179,2422,1142,2186,2229,1655,1664,1697,1702,1704,1707,1740,2214,2215,1743,2425,1747,1748,1149,1188,2419,1086,1113,2427,1147,1162,1191,2414,2132,1189,1654,1698,2430,1700,2228,1703,1706,1709,1742,2426,1757,2174,2180,2176,2432,2131,1080,1078,2115,2075,2421,1159,1677,1203,2184,1157,1148,2423,1161,1665,1699,2402,1701,1705,1741,2429,1752,1075,2415,1685,2418,],];
const csesProblemNames = [["Weird Algorithm","Missing Number","Repetitions","Increasing Array","Permutations","Number Spiral","Two Knights","Two Sets","Bit Strings","Trailing Zeros","Coin Piles","Palindrome Reorder","Gray Code","Tower of Hanoi","Creating Strings","Apple Division","Chessboard and Queens","Digit Queries","Grid Paths",],["Distinct Numbers","Apartments","Ferris Wheel","Concert Tickets","Restaurant Customers","Movie Festival","Sum of Two Values","Maximum Subarray Sum","Stick Lengths","Missing Coin Sum","Collecting Numbers","Collecting Numbers II","Playlist","Towers","Traffic Lights","Josephus Problem I","Josephus Problem II","Nested Ranges Check","Nested Ranges Count","Room Allocation","Factory Machines","Tasks and Deadlines","Reading Books","Sum of Three Values","Sum of Four Values","Nearest Smaller Values","Subarray Sums I","Subarray Sums II","Subarray Divisibility","Subarray Distinct Values","Array Division","Sliding Median","Sliding Cost","Movie Festival II","Maximum Subarray Sum II",],["Dice Combinations","Minimizing Coins","Coin Combinations I","Coin Combinations II","Removing Digits","Grid Paths","Book Shop","Array Description","Counting Towers","Edit Distance","Rectangle Cutting","Money Sums","Removal Game","Two Sets II","Increasing Subsequence","Projects","Elevator Rides","Counting Tilings","Counting Numbers",],["Counting Rooms","Labyrinth","Building Roads","Message Route","Building Teams","Round Trip","Monsters","Shortest Routes I","Shortest Routes II","High Score","Flight Discount","Cycle Finding","Flight Routes","Round Trip II","Course Schedule","Longest Flight Route","Game Routes","Investigation","Planets Queries I","Planets Queries II","Planets Cycles","Road Reparation","Road Construction","Flight Routes Check","Planets and Kingdoms","Giant Pizza","Coin Collector","Mail Delivery","De Bruijn Sequence","Teleporters Path","Hamiltonian Flights","Knight's Tour","Download Speed","Police Chase","School Dance","Distinct Routes",],["Static Range Sum Queries","Static Range Minimum Queries","Dynamic Range Sum Queries","Dynamic Range Minimum Queries","Range Xor Queries","Range Update Queries","Forest Queries","Hotel Queries","List Removals","Salary Queries","Prefix Sum Queries","Pizzeria Queries","Subarray Sum Queries","Distinct Values Queries","Increasing Array Queries","Forest Queries II","Range Updates and Sums","Polynomial Queries","Range Queries and Copies",],["Subordinates","Tree Matching","Tree Diameter","Tree Distances I","Tree Distances II","Company Queries I","Company Queries II","Distance Queries","Counting Paths","Subtree Queries","Path Queries","Path Queries II","Distinct Colors","Finding a Centroid","Fixed-Length Paths I","Fixed-Length Paths II",],["Josephus Queries","Exponentiation","Exponentiation II","Counting Divisors","Common Divisors","Sum of Divisors","Divisor Analysis","Prime Multiples","Counting Coprime Pairs","Binomial Coefficients","Creating Strings II","Distributing Apples","Christmas Party","Bracket Sequences I","Bracket Sequences II","Counting Necklaces","Counting Grids","Fibonacci Numbers","Throwing Dice","Graph Paths I","Graph Paths II","Dice Probability","Moving Robots","Candy Lottery","Inversion Probability","Stick Game","Nim Game I","Nim Game II","Stair Game","Grundy's Game","Another Game",],["Word Combinations","String Matching","Finding Borders","Finding Periods","Minimal Rotation","Longest Palindrome","Required Substring","Palindrome Queries","Finding Patterns","Counting Patterns","Pattern Positions","Distinct Substrings","Repeating Substring","String Functions","Substring Order I","Substring Order II","Substring Distribution",],["Point Location Test","Line Segment Intersection","Polygon Area","Point in Polygon","Polygon Lattice Points","Minimum Euclidean Distance","Convex Hull",],["Meet in the Middle","Hamming Distance","Beautiful Subgrids","Reachable Nodes","Reachability Queries","Cut and Paste","Substring Reversals","Reversals and Sums","Necessary Roads","Necessary Cities","Eulerian Subgraphs","Monster Game I","Monster Game II","Subarray Squares","Houses and Schools","Knuth Division","Apples and Bananas","One Bit Positions","Signal Processing","New Roads Queries","Dynamic Connectivity","Parcel Delivery","Task Assignment","Distinct Routes II",],["Shortest Subsequence","Counting Bits","Swap Game","Prüfer Code","Acyclic Graph Edges","Strongly Connected Edges","Even Outdegree Edges","Multiplication Table","Advertisement","Special Substrings","Permutation Inversions","Maximum Xor Subarray","Movie Festival Queries","Chess Tournament","Tree Traversals","Network Renovation","Graph Girth","Intersection Points","Inverse Inversions","Monotone Subsequences","String Reorder","Stack Weights","Pyramid Array","Increasing Subsequence II","String Removals","Bit Inversions","Xor Pyramid","Writing Numbers","String Transform","Letter Pair Move Game","Maximum Building I","Sorting Methods","Cyclic Array","List of Sums","Increasing Array II","Food Division","Bit Problem","Swap Round Sorting","Binary Subsequences","Tree Isomorphism I","Counting Sequences","Critical Cities","School Excursion","Coin Grid","Robot Path","Programmers and Artists","Course Schedule II","Removing Digits II","Coin Arrangement","Counting Bishops","Grid Puzzle I","Grid Puzzle II","Empty String","Grid Paths","Bit Substrings","Reversal Sorting","Counting Reorders","Book Shop II","Network Breakdown","Visiting Cities","Missing Coin Sum Queries","Number Grid","Maximum Building II","Filling Trominos","Stick Divisions","Coding Company","Flight Route Requests","Two Stacks Sorting","Tree Isomorphism II","Forbidden Cities","Area of Rectangles","Grid Completion","Creating Offices","Permutations II","Functional Graph Distribution","New Flight Routes","Grid Path Construction",],];

let csesIds = [
  {{- range $index, $id := $ids -}}
    {{- $id -}},
  {{- end -}}
];

let csesNames = {
  {{- range $index, $name := $names -}}
    {{ index $ids $index }}:'{{- $name -}}',
  {{- end -}}
};

const taskClases = {
  'accepted'    : 'accepted',
  'attempted'   : 'attempted',
  'notAttempted': 'none'
};

function loadStandings(data) {

  /* Get problem category titles `tr` */
  let problemsCatTitles = [];
  for (const node of document.getElementsByClassName("problem-category-title")) {
    problemsCatTitles.push(node);
  };

  /* Solved count */
  let solvedCount = {};
  for (const id of csesIds) {
    if (data[id] == undefined) {
      solvedCount[id] = 0;
    } else {
      solvedCount[id] = data[id]['accepted'].length;
    }
  };
  
  /* Sort by total solved */
  csesIds = csesIds.sort((id1, id2) => {
      return solvedCount[id2] - solvedCount[id1];
  });
  
  /* Order names on tables */
  for (const tr of problemsCatTitles) {
    let namesTds = tr.nextElementSibling.children;
    for (const i in csesIds) {
      namesTds[parseInt(i)+1].innerText = csesNames[csesIds[i]];
    };
  };
  let totalsNames = document.getElementById("cses-totales").getElementsByTagName('tr')[0].children;
  for (const i in csesIds) {
    totalsNames[parseInt(i)+1].innerText = csesNames[csesIds[i]];
  };

  /* Populate Totals table */
  let totalsNums = document.getElementById("cses-totales").getElementsByTagName('tr')[1].children;
  for (const i in csesIds) {
      totalsNums[parseInt(i)+1].innerText = solvedCount[csesIds[i]];
  };
  

  /* Generate table, and save problem rows */
  let problemRows = {};
  for (const parentIndex in problemsCatTitles) {
    let tr = problemsCatTitles[parentIndex].nextElementSibling;

    for (const index in csesProblemIds[parentIndex]) {
      let problemId = csesProblemIds[parentIndex][index];
      let name = csesProblemNames[parentIndex][index];
      let problemName = document.createElement("a");
      problemName.innerText = name;
      problemName.href = "{{ .Site.Params.csesProblemUrl }}" + problemId;
      let problemTd = document.createElement("td");
      problemTd.appendChild(problemName);
      problemTd.className = "problem-name";
      let problemTr = document.createElement("tr");
      problemTr.appendChild(problemTd);
      csesIds.forEach( userId => {
        let taskTd = document.createElement("td");
        taskTd.className = "task-score";
        problemTr.appendChild(taskTd);
      });
      tr.parentNode.insertBefore(problemTr, problemsCatTitles[parseInt(parentIndex)+1]);
      problemRows[problemId] = problemTr;
    };
  };

  /* Populate table */
  for (const idIndex in csesIds) {
    let userId = csesIds[idIndex];
    let userData = data[userId];
    if (userData === undefined) {
      Object.values(problemRows).forEach(tr => {
        tr.children[parseInt(idIndex)+1].className = "task-score";
      });
      return;
    }

    Object.keys(userData).forEach(state => {
      let problemIds = userData[state];
      let stateClass = taskClases[state];
      problemIds.forEach(problemId => {
        if (problemRows[problemId] === undefined) {
          return;
        }
        problemRows[problemId].children[parseInt(idIndex)+1].className = "task-score " + stateClass;
      });
    });

  }
}

(function() {

  let csesContainer = document.getElementById("cses-tables-container");

  if (csesContainer !== null) {

    let cache = localStorage.getItem('csesCache');

    if (cache !== null) {
      cache = JSON.parse(cache);
    }

    let dt = new Date();
  {{ if eq (hugo.Environment) "development" }}
    if (true) {
  {{ else }}
    if (cache === null || cache.expires < dt.getTime()) {
  {{ end }}
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            cache = {
              'expires': dt.getTime() + {{- .Site.Params.csesCacheLife | int | mul 1000 -}},
              'data': data,
            };
            localStorage.setItem('csesCache', JSON.stringify(cache));
            loadStandings(data);
          } else if (cache !== null) {
            console.warn("Could not get CSES data from API, using local cache instead.\nStatus: " + xhr.statusText);
            loadStandings(cache.data);
          } else {
            console.error("Could not get CSES data from API.\nStatus: " + xhr.statusText);
            alert("No se pudo conectar con la API.");
          }
        }
      };
      xhr.open('GET', '{{- .Site.Params.csesEndpoint -}}');
      xhr.send();
    } else {
      loadStandings(cache.data);
    }
  }
})();


function apply_theme(dark_enabled) {
  var styles = document.getElementById("styles"), 
      styles_dark = document.getElementById("styles-dark");
  // First enable both
  styles.setAttribute("rel", "stylesheet");
  styles_dark.setAttribute("rel", "stylesheet");
  var tcol = {false: "white", true: "#292929"};
  document.getElementById("theme-color").setAttribute("content", tcol[dark_enabled]);
  document.getElementById("darkmode-enabled").innerHTML = dark_enabled;
  var req = new XMLHttpRequest();
  req.open("GET", "/darkmode?noredir=true&set=" + dark_enabled);
  req.onreadystatechange = function () {
    if (req.status == 200) {
      var forward_event = new Event("theme-changed");
      document.dispatchEvent(forward_event);
    }
  };
  req.send();
  setTimeout(function () {
    // Finally, disable the other stylesheet
    (dark_enabled ? styles : styles_dark).setAttribute("rel", "stylesheet alternate");
  }, 5);
}
function toggle_theme() {
  var dark_enabled = !JSON.parse(document.getElementById("darkmode-enabled").innerHTML);
  apply_theme(dark_enabled);
  return false;
}

function check_hash() {
  var hash = window.location.hash.substr(1);
  if (!hash) return;
  var e = document.getElementById(hash);
  if (!e) return;
  var p = e.closest(".closed");
  if (!p) return;
  p.classList.remove("closed");
  e.scrollIntoView();
}
window.onload = function() {
  var captions = document.getElementsByClassName("close-trigger");
  var callback = function(e) {
    e.target.closest(".closeable").classList.toggle('closed');
  }
  for (var i = 0; i < captions.length; i++) {
    captions[i].addEventListener("click", callback);
  }
  check_hash();
}
window.onhashchange = check_hash;

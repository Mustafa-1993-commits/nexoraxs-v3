// ============================================================
// NexoraXS — TEMPORARY canvas tuner (remove after sizing is locked)
// ============================================================
(function () {
  var FIELDS = [
    { key: "--nx-topbar-h",     label: "Topbar height", min: 40, max: 100, def: 60 },
    { key: "--nx-sidebar-w",    label: "Sidebar width", min: 200, max: 360, def: 258 },
    { key: "--nx-gap-top",      label: "Gap · top",     min: 0,  max: 60, def: 8 },
    { key: "--nx-gap-right",    label: "Gap · right",   min: 0,  max: 60, def: 8 },
    { key: "--nx-gap-bottom",   label: "Gap · bottom",  min: 0,  max: 60, def: 8 },
    { key: "--nx-gap-left",     label: "Gap · left",    min: 0,  max: 60, def: 8 },
    { key: "--nx-radius-top",   label: "Radius · top",   min: 0,  max: 40, def: 14 },
    { key: "--nx-radius-bottom",label: "Radius · bottom",min: 0,  max: 40, def: 14 },
  ];
  var state = {};
  FIELDS.forEach(function (f) { state[f.key] = f.def; });

  function appRoot() { return document.querySelector(".nx-app-root"); }

  function apply() {
    var root = appRoot();
    if (!root) return;
    FIELDS.forEach(function (f) { root.style.setProperty(f.key, state[f.key] + "px"); });
    updateCode();
  }

  function updateCode() {
    var lines = [
      ".nx-app-root {",
      "  --nx-topbar-h: " + state["--nx-topbar-h"] + "px;",
      "  --nx-sidebar-w: " + state["--nx-sidebar-w"] + "px;",
      "  --nx-gap-top: " + state["--nx-gap-top"] + "px;",
      "  --nx-gap-right: " + state["--nx-gap-right"] + "px;",
      "  --nx-gap-bottom: " + state["--nx-gap-bottom"] + "px;",
      "  --nx-gap-left: " + state["--nx-gap-left"] + "px;",
      "  --nx-radius-top: " + state["--nx-radius-top"] + "px;",
      "  --nx-radius-bottom: " + state["--nx-radius-bottom"] + "px;",
      "}",
    ];
    var pre = document.getElementById("nx-tuner-code");
    if (pre) pre.textContent = lines.join("\n");
  }

  function build() {
    if (document.getElementById("nx-tuner")) return;
    var box = document.createElement("div");
    box.id = "nx-tuner";
    box.style.cssText = "position:fixed;top:64px;right:12px;z-index:99999;width:280px;background:#15171e;color:#e7e8ee;border:1px solid #2a2e38;border-radius:12px;box-shadow:0 18px 50px rgba(0,0,0,.5);font-family:ui-sans-serif,system-ui,sans-serif;font-size:12px;overflow:hidden;";

    var head = document.createElement("div");
    head.style.cssText = "display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#1d2027;border-bottom:1px solid #2a2e38;cursor:move;";
    head.innerHTML = '<b style="font-size:12.5px;letter-spacing:.02em;">Canvas tuner</b>';
    var mini = document.createElement("button");
    mini.textContent = "–";
    mini.style.cssText = "background:none;border:none;color:#aab0c0;font-size:16px;cursor:pointer;line-height:1;padding:0 4px;";
    head.appendChild(mini);
    box.appendChild(head);

    var body = document.createElement("div");
    body.id = "nx-tuner-body";
    body.style.cssText = "padding:10px 12px;display:flex;flex-direction:column;gap:9px;";

    FIELDS.forEach(function (f) {
      var row = document.createElement("div");
      var top = document.createElement("div");
      top.style.cssText = "display:flex;justify-content:space-between;margin-bottom:3px;";
      var lab = document.createElement("span"); lab.textContent = f.label; lab.style.color = "#aab0c0";
      var val = document.createElement("span"); val.textContent = state[f.key] + "px"; val.style.cssText = "font-family:ui-monospace,monospace;font-weight:700;";
      top.appendChild(lab); top.appendChild(val);
      var rng = document.createElement("input");
      rng.type = "range"; rng.min = f.min; rng.max = f.max; rng.step = 1; rng.value = state[f.key];
      rng.style.cssText = "width:100%;accent-color:#6366f1;";
      rng.addEventListener("input", function () {
        state[f.key] = +rng.value; val.textContent = rng.value + "px"; apply();
      });
      row.appendChild(top); row.appendChild(rng);
      body.appendChild(row);
    });

    var codeWrap = document.createElement("div");
    codeWrap.style.cssText = "margin-top:4px;";
    var pre = document.createElement("pre");
    pre.id = "nx-tuner-code";
    pre.style.cssText = "background:#0d0f14;border:1px solid #2a2e38;border-radius:8px;padding:9px;font-family:ui-monospace,monospace;font-size:10.5px;line-height:1.5;white-space:pre;overflow:auto;max-height:160px;margin:0;color:#c3c8d4;";
    codeWrap.appendChild(pre);

    var btnRow = document.createElement("div");
    btnRow.style.cssText = "display:flex;gap:6px;margin-top:8px;";
    var copy = document.createElement("button");
    copy.textContent = "Copy CSS";
    copy.style.cssText = "flex:1;background:#6366f1;color:#fff;border:none;border-radius:8px;padding:8px;font-weight:700;font-size:12px;cursor:pointer;";
    copy.addEventListener("click", function () {
      var t = document.getElementById("nx-tuner-code").textContent;
      navigator.clipboard && navigator.clipboard.writeText(t);
      copy.textContent = "Copied ✓"; setTimeout(function () { copy.textContent = "Copy CSS"; }, 1200);
    });
    var reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.style.cssText = "background:#2a2e38;color:#e7e8ee;border:none;border-radius:8px;padding:8px 12px;font-weight:600;font-size:12px;cursor:pointer;";
    reset.addEventListener("click", function () {
      FIELDS.forEach(function (f) { state[f.key] = f.def; });
      box.remove(); build();
    });
    btnRow.appendChild(copy); btnRow.appendChild(reset);

    body.appendChild(codeWrap);
    body.appendChild(btnRow);
    box.appendChild(body);
    document.body.appendChild(box);

    mini.addEventListener("click", function () {
      var hidden = body.style.display === "none";
      body.style.display = hidden ? "flex" : "none";
      mini.textContent = hidden ? "–" : "+";
    });

    // drag
    var drag = false, ox = 0, oy = 0;
    head.addEventListener("mousedown", function (e) { if (e.target === mini) return; drag = true; ox = e.clientX - box.offsetLeft; oy = e.clientY - box.offsetTop; });
    window.addEventListener("mousemove", function (e) { if (!drag) return; box.style.left = (e.clientX - ox) + "px"; box.style.top = (e.clientY - oy) + "px"; box.style.right = "auto"; });
    window.addEventListener("mouseup", function () { drag = false; });

    updateCode();
    apply();
  }

  function waitForRoot() {
    if (appRoot()) { build(); apply(); }
    else setTimeout(waitForRoot, 300);
  }
  // keep applying when React swaps the app root (route changes)
  setInterval(apply, 1000);
  if (document.readyState === "complete" || document.readyState === "interactive") waitForRoot();
  else document.addEventListener("DOMContentLoaded", waitForRoot);
})();

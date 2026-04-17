(function () {
  function initGlobalFloatingAssistant() {
    if (document.getElementById("assistantPanel")) return;
    var host = document.createElement("div");
    host.className = "assistant-wrap";
    host.id = "assistantPanel";
    host.innerHTML =
      "<button class=\"chat-fab\" id=\"chatFab\" aria-label=\"打开行业AI助手\">AI</button>" +
      "<section class=\"assistant-panel\">" +
      "  <div class=\"toolbar\" style=\"margin-bottom:8px\">" +
      "    <strong>行业AI助手</strong>" +
      "    <button id=\"closeAssistant\">收起</button>" +
      "  </div>" +
      "  <div class=\"industry-prompt-list\">" +
      "    <button class=\"prompt-chip\" data-industry-prompt=\"跨境电商：帮我分析最近7天美国站点的爆品趋势\">跨境电商爆品趋势</button>" +
      "    <button class=\"prompt-chip\" data-industry-prompt=\"跨境电商：分析最近7天美国站点高转化关键词与投放建议\">美国站关键词洞察</button>" +
      "    <button class=\"prompt-chip\" data-industry-prompt=\"本地生活：给我一份本周门店拉新活动优化建议\">本地生活拉新建议</button>" +
      "  </div>" +
      "  <div class=\"chat-input\" style=\"margin-top:0\">" +
      "    <textarea class=\"rich-textarea\" id=\"globalChatInput\" rows=\"1\" placeholder=\"输入问题，或点击预设Prompt...\"></textarea>" +
      "    <div class=\"chat-input-footer\">" +
      "      <a class=\"btn-outline\" href=\"./ai-chat.html\" id=\"openAssistantPageLink\">进入完整助手</a>" +
      "      <button class=\"btn-primary\" id=\"globalSendBtn\" disabled>发送</button>" +
      "    </div>" +
      "  </div>" +
      "</section>";
    document.body.appendChild(host);
  }

  function initGlobalSidebar() {
    var sidebar = document.querySelector("[data-global-sidebar]") || document.querySelector(".sidebar");
    if (!sidebar) return;
    var path = window.location.pathname.replace(/\\/g, "/");
    var inPages = path.indexOf("/pages/") >= 0;
    var base = inPages ? ".." : ".";
    var current = path.split("/").pop() || "index.html";
    var groupState = JSON.parse(localStorage.getItem("opc_nav_group_state") || "{}");
    var groups = [
      {
        key: "decision",
        title: "智能决策支持",
        children: [
          { href: "market-trend.html", label: "行业工作流驾驶舱" },
          { href: "competitor.html", label: "竞争情报监控" },
          { href: "risk-warning.html", label: "风险预警中心" }
        ]
      },
      {
        key: "ops",
        title: "运营管理",
        children: [
          { href: "crm.html", label: "客户关系管理" },
          { href: "content-ops.html", label: "内容运营管理" },
          { href: "project.html", label: "项目管理" }
        ]
      },
      {
        key: "finance",
        title: "财务管理",
        children: [
          { href: "auto-bookkeeping.html", label: "自动记账" },
          { href: "finance-analysis.html", label: "财务分析" },
          { href: "cashflow.html", label: "现金流管理" }
        ]
      },
      {
        key: "resource",
        title: "资源对接",
        children: [
          { href: "investment.html", label: "投融资对接" },
          { href: "policy.html", label: "政策申报" }
        ]
      },
      {
        key: "config",
        title: "配置中心",
        children: [
          { href: "personalization.html", label: "个性化设置" },
          { href: "ai-chat.html", label: "行业AI助手" }
        ]
      }
    ];

    function pagePath(file) {
      return inPages ? "./" + file : "./pages/" + file;
    }
    var navHtml = "<div class=\"nav-group-title\">主功能</div>";
    navHtml += "<a class=\"nav-item " + (current === "index.html" ? "active" : "") + "\" href=\"" + base + "/index.html\">总览首页</a>";
    groups.forEach(function (group) {
      var hasActive = group.children.some(function (x) { return x.href === current; });
      var expanded = groupState[group.key];
      if (expanded === undefined) expanded = hasActive || current === "index.html";
      navHtml += "<button class=\"nav-group-toggle\" data-nav-group=\"" + group.key + "\" aria-expanded=\"" + expanded + "\">" + group.title + "<span>" + (expanded ? "▾" : "▸") + "</span></button>";
      navHtml += "<div class=\"nav-sub " + (expanded ? "open" : "") + "\" data-nav-sub=\"" + group.key + "\">";
      group.children.forEach(function (item) {
        navHtml += "<a class=\"nav-item nav-sub-item " + (current === item.href ? "active" : "") + "\" href=\"" + pagePath(item.href) + "\">" + item.label + "</a>";
      });
      navHtml += "</div>";
    });
    sidebar.innerHTML = navHtml;

    sidebar.querySelectorAll("[data-nav-group]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-nav-group");
        var panel = sidebar.querySelector("[data-nav-sub=\"" + key + "\"]");
        var opened = panel.classList.toggle("open");
        btn.setAttribute("aria-expanded", opened ? "true" : "false");
        btn.querySelector("span").textContent = opened ? "▾" : "▸";
        groupState[key] = opened;
        localStorage.setItem("opc_nav_group_state", JSON.stringify(groupState));
      });
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tab-group]").forEach(function (group) {
      var tabs = group.querySelectorAll(".tab");
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          tabs.forEach(function (t) { t.classList.remove("active"); });
          tab.classList.add("active");
          var target = tab.getAttribute("data-target");
          var root = group.closest("[data-tab-root]") || document;
          root.querySelectorAll("[data-tab-pane]").forEach(function (pane) {
            pane.style.display = pane.getAttribute("data-tab-pane") === target ? "block" : "none";
          });
        });
      });
    });
  }

  function initModal() {
    document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-open-modal");
        document.getElementById(id).classList.add("show");
      });
    });
    document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest(".modal-backdrop").classList.remove("show");
      });
    });
  }

  function initDrawer() {
    document.querySelectorAll("[data-open-drawer]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.getElementById(btn.getAttribute("data-open-drawer")).classList.add("show");
      });
    });
    document.querySelectorAll("[data-close-drawer]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest(".drawer").classList.remove("show");
      });
    });
  }

  function initDnD() {
    var dragging = null;
    document.querySelectorAll(".task").forEach(function (task) {
      task.setAttribute("draggable", "true");
      task.addEventListener("dragstart", function () { dragging = task; });
    });
    document.querySelectorAll("[data-dropzone]").forEach(function (zone) {
      zone.addEventListener("dragover", function (e) { e.preventDefault(); });
      zone.addEventListener("drop", function (e) {
        e.preventDefault();
        if (dragging) zone.appendChild(dragging);
      });
    });
  }

  function initTrendFilter() {
    var select = document.getElementById("trendDimension");
    var tbody = document.getElementById("trendTableBody");
    if (!select || !tbody || !window.mockData) return;
    function render() {
      tbody.innerHTML = "";
      window.mockData.trendRows.forEach(function (row) {
        var tr = document.createElement("tr");
        var rendered = row.slice();
        rendered[3] = row[3] + "（维度：" + select.value + "）";
        rendered.forEach(function (cell) {
          var td = document.createElement("td");
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }
    select.addEventListener("change", render);
    render();
  }

  function initCompetitorSwitch() {
    var detail = document.getElementById("competitorDetail");
    if (!detail || !window.mockData) return;
    document.querySelectorAll("[data-competitor]").forEach(function (item) {
      item.addEventListener("click", function () {
        var key = item.getAttribute("data-competitor");
        document.querySelectorAll("[data-competitor]").forEach(function (c) { c.classList.remove("active"); });
        item.classList.add("active");
        detail.textContent = window.mockData.competitorDetails[key];
      });
    });
  }

  function initRiskActions() {
    document.querySelectorAll("[data-risk-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.textContent = "已处理";
        btn.disabled = true;
      });
    });
  }

  function initCalendarView() {
    var title = document.getElementById("calendarViewTitle");
    if (!title) return;
    document.querySelectorAll("[data-calendar-view]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        title.textContent = "内容日历（" + btn.getAttribute("data-calendar-view") + "视图）";
      });
    });
  }

  function initPersonalization() {
    var previewTemplate = document.getElementById("previewTemplate");
    var previewRole = document.getElementById("previewRole");
    var previewStage = document.getElementById("previewStage");
    var previewMetrics = document.getElementById("previewMetrics");
    var strategyText = document.getElementById("stageStrategyText");
    var strategyMap = {
      startup: "初创期建议：聚焦MVP验证、核心用户获取和融资准备。",
      growth: "成长期建议：强化团队协同、流程标准化与市场扩张。",
      mature: "成熟期建议：推进效率优化、新业务探索和资本运作。"
    };
    var foundedDate = document.getElementById("foundedDate");
    var foundedDateError = document.getElementById("foundedDateError");
    var foundedResult = document.getElementById("foundedResult");

    document.querySelectorAll("[data-template-card]").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target && e.target.hasAttribute("data-apply-template")) {
          var btn = e.target;
          var original = btn.textContent;
          btn.textContent = "应用中...";
          btn.disabled = true;
          setTimeout(function () {
            document.querySelectorAll("[data-template-card]").forEach(function (c) {
              c.classList.remove("selected");
              var h4 = c.querySelector("h4");
              if (h4) h4.querySelector(".tag-enabled") && h4.querySelector(".tag-enabled").remove();
              var b = c.querySelector("[data-apply-template]");
              if (b) { b.classList.remove("btn-primary"); b.classList.add("btn-outline"); b.textContent = "使用此模板"; b.disabled = false; }
            });
            card.classList.add("selected");
            var title = card.getAttribute("data-template-card");
            if (previewTemplate) previewTemplate.textContent = title;
            var h4 = card.querySelector("h4");
            if (h4 && !h4.querySelector(".tag-enabled")) {
              var tag = document.createElement("span");
              tag.className = "tag-enabled";
              tag.textContent = "已启用";
              h4.appendChild(tag);
            }
            btn.classList.remove("btn-outline");
            btn.classList.add("btn-primary");
            btn.textContent = original;
            btn.disabled = false;
          }, 700);
        }
      });
    });

    document.querySelectorAll("[data-role-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var role = tab.getAttribute("data-role-tab");
        document.querySelectorAll("[data-role-tab]").forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll("[data-role-panel]").forEach(function (p) { p.classList.remove("active"); });
        tab.classList.add("active");
        var panel = document.querySelector("[data-role-panel=\"" + role + "\"]");
        if (panel) panel.classList.add("active");
        if (previewRole) previewRole.textContent = tab.textContent.trim();
        updateMetricPreview();
      });
    });

    function updateMetricPreview() {
      if (!previewMetrics) return;
      var activePanel = document.querySelector(".role-panel.active");
      if (!activePanel) return;
      var checked = activePanel.querySelectorAll("input[data-metric]:checked");
      var names = Array.prototype.map.call(checked, function (node) {
        return node.parentElement.textContent.trim();
      });
      previewMetrics.textContent = names.join("、") || "未选择";
      localStorage.setItem("opc_metrics_" + (previewRole ? previewRole.textContent : "default"), previewMetrics.textContent);
    }

    document.querySelectorAll("input[data-metric]").forEach(function (cb) {
      cb.addEventListener("change", updateMetricPreview);
    });

    var restore = document.querySelector("[data-restore-default]");
    if (restore) {
      restore.addEventListener("click", function () {
        document.querySelectorAll(".role-panel input[data-metric]").forEach(function (cb, idx) {
          cb.checked = idx % 3 !== 2;
        });
        updateMetricPreview();
      });
    }

    document.querySelectorAll("[data-stage]").forEach(function (stage) {
      stage.addEventListener("click", function () {
        var key = stage.getAttribute("data-stage");
        setStage(key, true);
      });
    });

    function setStage(key, manualPick) {
      document.querySelectorAll("[data-stage]").forEach(function (s) { s.classList.remove("active"); });
      var target = document.querySelector("[data-stage=\"" + key + "\"]");
      if (!target) return;
      target.classList.add("active");
      if (previewStage) previewStage.textContent = target.querySelector("h4").textContent.trim();
      if (strategyText) strategyText.textContent = strategyMap[key];
      var foundedStageTag = document.getElementById("foundedStageTag");
      if (foundedStageTag) {
        foundedStageTag.textContent = target.querySelector("h4").textContent.trim();
        foundedStageTag.classList.remove("stage-startup", "stage-growth", "stage-mature");
        foundedStageTag.classList.add(
          key === "startup" ? "stage-startup" : (key === "growth" ? "stage-growth" : "stage-mature")
        );
      }
      if (manualPick && foundedDate) foundedDate.value = "";
    }

    function stageByYears(yearsFloat) {
      if (yearsFloat <= 3) return "startup";
      if (yearsFloat <= 7) return "growth";
      if (yearsFloat > 7) return "mature";
      return "startup";
    }

    function calculateDuration(startDate, endDate) {
      var years = endDate.getFullYear() - startDate.getFullYear();
      var months = endDate.getMonth() - startDate.getMonth();
      var days = endDate.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      if (years < 0) return { years: 0, months: 0 };
      return { years: years, months: months };
    }

    function validateFoundedDate() {
      if (!foundedDate) return false;
      var val = foundedDate.value;
      if (!val) {
        if (foundedDateError) foundedDateError.classList.add("show");
        return false;
      }
      if (foundedDateError) foundedDateError.classList.remove("show");
      return true;
    }

    if (foundedDate) {
      var today = new Date();
      var maxDate = today.toISOString().split("T")[0];
      foundedDate.max = maxDate;
      foundedDate.addEventListener("blur", validateFoundedDate);
      foundedDate.addEventListener("change", function () {
        if (!validateFoundedDate()) return;
        var selected = new Date(foundedDate.value + "T00:00:00");
        var now = new Date();
        var diff = calculateDuration(selected, now);
        var yearsFloat = diff.years + diff.months / 12;
        var stageKey = stageByYears(yearsFloat);
        setStage(stageKey, false);
        if (foundedResult) {
          foundedResult.innerHTML = "已成立" + diff.years + "年" + diff.months + "月 <span class=\"stage-tag " +
            (stageKey === "startup" ? "stage-startup" : (stageKey === "growth" ? "stage-growth" : "stage-mature")) +
            "\" id=\"foundedStageTag\">" + (stageKey === "startup" ? "初创期" : (stageKey === "growth" ? "成长期" : "成熟期")) + "</span>";
        }
      });
    }

    updateMetricPreview();
  }

  function initAiChat() {
    var input = document.getElementById("chatInput");
    var send = document.getElementById("sendBtn");
    var history = document.getElementById("chatHistory");
    var count = document.getElementById("charCount");
    if (!input || !send || !history) return;

    function syncInputState() {
      var text = input.value.trim();
      send.disabled = !text;
      if (count) count.textContent = input.value.length + " 字";
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 96) + "px";
    }

    function appendMessage(text, isUser) {
      var wrap = document.createElement("div");
      wrap.className = "chat-message " + (isUser ? "user" : "ai");
      wrap.innerHTML = "<div class=\"message-content\"><div class=\"message-text\"></div><div class=\"message-time\">刚刚</div></div>";
      wrap.querySelector(".message-text").textContent = text;
      history.appendChild(wrap);
      history.scrollTop = history.scrollHeight;
    }

    function handleSend() {
      var text = input.value.trim();
      if (!text) return;
      appendMessage(text, true);
      input.value = "";
      syncInputState();
      appendMessage("正在分析中，已关联相关数据源标签。", false);
      document.querySelectorAll(".status-item").forEach(function (s, idx) {
        s.classList.toggle("active", idx >= 1);
      });
    }

    input.addEventListener("input", syncInputState);
    input.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    });
    send.addEventListener("click", handleSend);
    syncInputState();

    var voiceBtn = document.getElementById("voiceBtn");
    if (voiceBtn) {
      voiceBtn.addEventListener("mousedown", function () { voiceBtn.textContent = "录音中..."; });
      voiceBtn.addEventListener("mouseup", function () {
        voiceBtn.textContent = "按住说话";
        input.value = (input.value ? input.value + " " : "") + "（语音转文字示例）";
        syncInputState();
      });
    }

    var fileInput = document.getElementById("fileInput");
    var filePreview = document.getElementById("filePreview");
    var fileInfo = document.getElementById("fileInfo");
    var removeFile = document.getElementById("removeFile");
    if (fileInput && filePreview && fileInfo) {
      fileInput.addEventListener("change", function () {
        if (!fileInput.files.length) return;
        var names = Array.prototype.map.call(fileInput.files, function (f) { return f.name; }).slice(0, 5);
        fileInfo.textContent = names.join(", ");
        filePreview.style.display = "flex";
      });
    }
    if (removeFile && fileInput && filePreview) {
      removeFile.addEventListener("click", function () {
        fileInput.value = "";
        filePreview.style.display = "none";
      });
    }

    var panel = document.getElementById("commandPanel");
    var openPanel = document.getElementById("openCommandPanel");
    var closePanel = document.getElementById("closeCommandPanel");
    var search = document.getElementById("commandSearch");
    var category = "all";

    function filterCommands() {
      var key = search ? search.value.trim().toLowerCase() : "";
      document.querySelectorAll("[data-command-item]").forEach(function (item) {
        var okCat = category === "all" || item.getAttribute("data-category") === category;
        var okText = item.textContent.toLowerCase().indexOf(key) >= 0;
        item.style.display = okCat && okText ? "block" : "none";
      });
    }

    if (openPanel && panel) openPanel.addEventListener("click", function () { panel.classList.add("show"); });
    if (closePanel && panel) closePanel.addEventListener("click", function () { panel.classList.remove("show"); });
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (panel) panel.classList.add("show");
      }
    });
    document.querySelectorAll("[data-command-category]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-command-category]").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        category = btn.getAttribute("data-command-category");
        filterCommands();
      });
    });
    if (search) search.addEventListener("input", filterCommands);
    document.querySelectorAll("[data-command-item]").forEach(function (item) {
      item.addEventListener("click", function () {
        input.value = item.getAttribute("data-command") + " ";
        syncInputState();
        if (panel) panel.classList.remove("show");
        input.focus();
      });
    });

    var feedbackBtns = document.querySelectorAll("[data-feedback]");
    var feedbackComment = document.getElementById("feedbackComment");
    feedbackBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.getAttribute("data-feedback") === "down" && feedbackComment) feedbackComment.style.display = "block";
      });
    });

    var quickPrompts = document.querySelectorAll("[data-industry-prompt]");
    quickPrompts.forEach(function (btn) {
      btn.addEventListener("click", function () {
        input.value = btn.getAttribute("data-industry-prompt");
        syncInputState();
        input.focus();
      });
    });

    var fab = document.getElementById("chatFab");
    var panelWrap = document.getElementById("assistantPanel");
    var closeAssistant = document.getElementById("closeAssistant");
    if (fab && panelWrap) {
      fab.addEventListener("click", function () {
        panelWrap.classList.toggle("assistant-open");
      });
    }
    if (closeAssistant && panelWrap) {
      closeAssistant.addEventListener("click", function () {
        panelWrap.classList.remove("assistant-open");
      });
    }

    var globalInput = document.getElementById("globalChatInput");
    var globalSend = document.getElementById("globalSendBtn");
    var openPageLink = document.getElementById("openAssistantPageLink");
    var inPages = window.location.pathname.replace(/\\/g, "/").indexOf("/pages/") >= 0;
    var assistantPath = inPages ? "./ai-chat.html" : "./pages/ai-chat.html";
    if (globalInput && globalSend) {
      globalInput.addEventListener("input", function () {
        globalSend.disabled = !globalInput.value.trim();
      });
      globalSend.addEventListener("click", function () {
        if (!globalInput.value.trim()) return;
        window.location.href = assistantPath + "?q=" + encodeURIComponent(globalInput.value.trim());
      });
    }
    if (openPageLink) {
      openPageLink.setAttribute("href", assistantPath);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGlobalFloatingAssistant();
    initGlobalSidebar();
    initTabs();
    initModal();
    initDrawer();
    initDnD();
    initTrendFilter();
    initCompetitorSwitch();
    initRiskActions();
    initCalendarView();
    initPersonalization();
    initAiChat();
  });
})();

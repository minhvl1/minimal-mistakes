---
title: "Tổng Hợp Source Cho NotebookLM"
categories:
  - AI
  - Automation
tags:
  - NotebookLM
  - Resources
author_profile: true
classes: wide
---

<style>
.go-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  width: 52px;
  height: 52px;
  font-size: 22px;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.35);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.go-to-top-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  background: linear-gradient(135deg, #7c8ef5 0%, #8a5bb8 100%);
}

.go-to-top-btn:active {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(102, 126, 234, 0.4);
}
</style>

<button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="go-to-top-btn">
  ↑
</button>

Bài viết này tổng hợp các nguồn dữ liệu (sources) chất lượng để feed cho NotebookLM, giúp bạn học và nghiên cứu hiệu quả hơn.

Bên cạnh các link Official Documentation, mình đã tự tổng hợp và biên soạn lại các file Markdown (`.md`) dựa trên tài liệu chính thức để tối ưu cho việc import vào NotebookLM. Nếu trong quá trình sử dụng các bạn thấy có thiếu sót hay sai sót gì, đừng ngần ngại liên hệ với mình để cùng hoàn thiện nhé!

---

## Mục Lục

- [Automation Testing](#automation-testing)
  - [Selenium](#selenium)
  - [Appium](#appium)
  - [Playwright](#playwright)


---

## Automation Testing

### Selenium

- 📚 **GitHub:** [SeleniumHQ/selenium](https://github.com/SeleniumHQ/selenium){:target="_blank"}
- 🌐 **Web:** [Selenium.dev](https://www.selenium.dev/documentation/){:target="_blank"}
<!-- - 📝 **MD File:** [selenium_notebookLM.md](/assets/files/source_notebook/selenium/selenium_notebookLM.md){:target="_blank" download="selenium_notebookLM.md" class="download-confirm"} -->

### Appium

- 📚 **GitHub:** [appium/appium](https://github.com/appium/appium){:target="_blank"}
- 🌐 **Web:** [Appium Documentation](https://appium.io/docs/en/latest/){:target="_blank"}
- 📝 **MD File:** [appium_notebookLM.md](/assets/files/source_notebook/appium/appium_notebookLM.md){:target="_blank" download="appium_notebookLM.md" class="download-confirm"}

### Playwright

- 📚 **GitHub:** [microsoft/playwright](https://github.com/microsoft/playwright){:target="_blank"}
- 🌐 **Web:** [Playwright.dev](https://playwright.dev/docs/intro){:target="_blank"}
- 📝 **MD File:** [playwright_notebookLM.md](/assets/files/source_notebook/playwright/playwright_notebookLM.md){:target="_blank" download="playwright_notebookLM.md" class="download-confirm"}

---


*Các Topics luôn được cập nhật, nếu bạn thấy thiếu gì hãy hãy contact với tôi nhé.*

<script>
document.addEventListener("DOMContentLoaded", function() {
  var links = document.querySelectorAll(".download-confirm");
  links.forEach(function(link) {
    link.addEventListener("click", function(event) {
      var fileName = this.getAttribute("download");
      var confirmed = confirm("Bạn có chắc chắn muốn tải file '" + fileName + "' về máy không?");
      if (!confirmed) {
        event.preventDefault();
      }
    });
  });
});
</script>

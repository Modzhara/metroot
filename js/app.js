(() => {
    "use strict";
    const modules_flsModules = {};
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function customCursor(isShadowTrue) {
        const wrapper = document.querySelector("[data-custom-cursor]") ? document.querySelector("[data-custom-cursor]") : document.documentElement;
        if (wrapper && !isMobile.any()) {
            const cursor = document.createElement("div");
            cursor.classList.add("fls-cursor");
            cursor.style.opacity = 0;
            cursor.insertAdjacentHTML("beforeend", `<span class="fls-cursor__pointer"></span>`);
            isShadowTrue ? cursor.insertAdjacentHTML("beforeend", `<span class="fls-cursor__shadow"></span>`) : null;
            wrapper.append(cursor);
            const cursorPointer = document.querySelector(".fls-cursor__pointer");
            const cursorPointerStyle = {
                width: cursorPointer.offsetWidth,
                height: cursorPointer.offsetHeight
            };
            let cursorShadow, cursorShadowStyle;
            if (isShadowTrue) {
                cursorShadow = document.querySelector(".fls-cursor__shadow");
                cursorShadowStyle = {
                    width: cursorShadow.offsetWidth,
                    height: cursorShadow.offsetHeight
                };
            }
            function mouseActions(e) {
                if (e.type === "mouseout") cursor.style.opacity = 0; else if (e.type === "mousemove") {
                    cursor.style.removeProperty("opacity");
                    if (e.target.closest("button") || e.target.closest("a") || e.target.closest("input") || window.getComputedStyle(e.target).cursor !== "none" && window.getComputedStyle(e.target).cursor !== "default") cursor.classList.add("_hover"); else cursor.classList.remove("_hover");
                } else if (e.type === "mousedown") cursor.classList.add("_active"); else if (e.type === "mouseup") cursor.classList.remove("_active");
                cursorPointer ? cursorPointer.style.transform = `translate3d(${e.clientX - cursorPointerStyle.width / 2}px, ${e.clientY - cursorPointerStyle.height / 2}px, 0)` : null;
                cursorShadow ? cursorShadow.style.transform = `translate3d(${e.clientX - cursorShadowStyle.width / 2}px, ${e.clientY - cursorShadowStyle.height / 2}px, 0)` : null;
            }
            window.addEventListener("mouseup", mouseActions);
            window.addEventListener("mousedown", mouseActions);
            window.addEventListener("mousemove", mouseActions);
            window.addEventListener("mouseout", mouseActions);
        }
    }
    function FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    class MousePRLX {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            if (this.config.init) {
                const paralaxMouse = document.querySelectorAll("[data-prlx-mouse]");
                if (paralaxMouse.length) {
                    this.paralaxMouseInit(paralaxMouse);
                    this.setLogging(`Прокинувся, стежу за об'єктами: (${paralaxMouse.length})`);
                } else this.setLogging("Немає жодного обєкта. Сплю...");
            }
        }
        paralaxMouseInit(paralaxMouse) {
            paralaxMouse.forEach((el => {
                const paralaxMouseWrapper = el.closest("[data-prlx-mouse-wrapper]");
                const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
                const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
                const directionX = el.hasAttribute("data-prlx-dxr") ? -1 : 1;
                const directionY = el.hasAttribute("data-prlx-dyr") ? -1 : 1;
                const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;
                let positionX = 0, positionY = 0;
                let coordXprocent = 0, coordYprocent = 0;
                setMouseParallaxStyle();
                if (paralaxMouseWrapper) mouseMoveParalax(paralaxMouseWrapper); else mouseMoveParalax();
                function setMouseParallaxStyle() {
                    const distX = coordXprocent - positionX;
                    const distY = coordYprocent - positionY;
                    positionX += distX * paramAnimation / 1e3;
                    positionY += distY * paramAnimation / 1e3;
                    el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0) rotate(0.02deg);`;
                    requestAnimationFrame(setMouseParallaxStyle);
                }
                function mouseMoveParalax(wrapper = window) {
                    wrapper.addEventListener("mousemove", (function(e) {
                        const offsetTop = el.getBoundingClientRect().top + window.scrollY;
                        if (offsetTop >= window.scrollY || offsetTop + el.offsetHeight >= window.scrollY) {
                            const parallaxWidth = window.innerWidth;
                            const parallaxHeight = window.innerHeight;
                            const coordX = e.clientX - parallaxWidth / 2;
                            const coordY = e.clientY - parallaxHeight / 2;
                            coordXprocent = coordX / parallaxWidth * 100;
                            coordYprocent = coordY / parallaxHeight * 100;
                        }
                    }));
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? FLS(`[PRLX Mouse]: ${message}`) : null;
        }
    }
    modules_flsModules.mousePrlx = new MousePRLX({});
    let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                const headerElement = document.querySelector(headerItem);
                if (!headerElement.classList.contains("_header-scroll")) {
                    headerElement.style.cssText = `transition-duration: 0s;`;
                    headerElement.classList.add("_header-scroll");
                    headerItemHeight = headerElement.offsetHeight;
                    headerElement.classList.remove("_header-scroll");
                    setTimeout((() => {
                        headerElement.style.cssText = ``;
                    }), 0);
                } else headerItemHeight = headerElement.offsetHeight;
            }
            let options = {
                speedAsDuration: true,
                speed,
                header: headerItem,
                offset: offsetTop,
                easing: "easeOutQuad"
            };
            document.documentElement.classList.contains("menu-open") ? functions_menuClose() : null;
            if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                window.scrollTo({
                    top: targetBlockElementPosition,
                    behavior: "smooth"
                });
            }
            FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
        } else FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
    };
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll("div.select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    function formSubmit() {
        const forms = document.forms;
        if (forms.length) for (const form of forms) {
            form.addEventListener("submit", (function(e) {
                const form = e.target;
                formSubmitAction(form, e);
            }));
            form.addEventListener("reset", (function(e) {
                const form = e.target;
                formValidate.formClean(form);
            }));
        }
        async function formSubmitAction(form, e) {
            const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
            if (error === 0) {
                const ajax = form.hasAttribute("data-ajax");
                if (ajax) {
                    e.preventDefault();
                    const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                    const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                    const formData = new FormData(form);
                    form.classList.add("_sending");
                    const response = await fetch(formAction, {
                        method: formMethod,
                        body: formData
                    });
                    if (response.ok) {
                        let responseResult = await response.json();
                        form.classList.remove("_sending");
                        formSent(form, responseResult);
                    } else {
                        alert("Помилка");
                        form.classList.remove("_sending");
                    }
                } else if (form.hasAttribute("data-dev")) {
                    e.preventDefault();
                    formSent(form);
                }
            } else {
                e.preventDefault();
                if (form.querySelector("._form-error") && form.hasAttribute("data-goto-error")) {
                    const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : "._form-error";
                    gotoblock_gotoBlock(formGoToErrorClass, true, 1e3);
                }
            }
        }
        function formSent(form, responseResult = ``) {
            document.dispatchEvent(new CustomEvent("formSent", {
                detail: {
                    form
                }
            }));
            setTimeout((() => {
                if (modules_flsModules.popup) {
                    const popup = form.dataset.popupMessage;
                    popup ? modules_flsModules.popup.open(popup) : null;
                }
            }), 0);
            formValidate.formClean(form);
            formLogging(`Форму відправлено!`);
        }
        function formLogging(message) {
            FLS(`[Форми]: ${message}`);
        }
    }
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                        let valueOfThreshold;
                        if (item.clientHeight > 2) {
                            valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                            if (valueOfThreshold > 1) valueOfThreshold = 1;
                        } else valueOfThreshold = 1;
                        item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                    }
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if (paramsWatch.threshold === "prx") {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            console.log(configWatcher);
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.querySelectorAll(".menu__item").forEach((item => {
        item.addEventListener("click", (function() {
            document.documentElement.classList.remove("lock", "menu-open");
        }));
    }));
    function createMask({element, mask, numberSymbol = "_", blocked, slug}) {
        let elementsArray = [];
        if (!element || element.length == 0) {
            console.log("%cCreate Mask: Element not found", "color: red; font-weight: bold;");
            return;
        }
        if (element instanceof Array) elementsArray = element; else if (element instanceof NodeList) elementsArray = Array.from(element); else elementsArray.push(element);
        let effectiveMask = mask;
        if (slug && slug.includes("/de/")) effectiveMask = "+47  ___ _______"; else effectiveMask = "+1 ___-___-____";
        elementsArray.forEach((item => {
            function initMask() {
                if (effectiveMask.length == 0) console.warn("Маска пустая");
                let currentValue = effectiveMask;
                function getCurrentPosition() {
                    const arr = currentValue.split("");
                    const newValueIndex = arr.indexOf(numberSymbol);
                    return newValueIndex;
                }
                const inputHandler = inputValue => {
                    if (inputValue == "backspace") {
                        const arr = currentValue.split("");
                        const filledIndexes = [];
                        for (let i = 0; i < effectiveMask.length; i++) if (effectiveMask[i] === numberSymbol) if (effectiveMask[i] != currentValue[i]) filledIndexes.push(i);
                        const indexOfLastNumber = filledIndexes[filledIndexes.length - 1];
                        arr[indexOfLastNumber] = effectiveMask[indexOfLastNumber];
                        const newValue = arr.join("");
                        currentValue = newValue;
                    } else if (!isNaN(inputValue)) {
                        const spacesForNumber = effectiveMask.split(numberSymbol).length - 1;
                        const freeSpacesForNumber = currentValue.split(numberSymbol).length - 1;
                        for (let i = 0; i < blocked.length; i++) for (let j = 0; j < blocked[i].length; j++) if (spacesForNumber - freeSpacesForNumber == j) if (inputValue == blocked[i][j]) return;
                        if (freeSpacesForNumber < 1) return;
                        const newValueIndex = getCurrentPosition();
                        const arr = currentValue.split("");
                        arr[newValueIndex] = inputValue;
                        const newValue = arr.join("");
                        currentValue = newValue;
                    }
                };
                item.value = currentValue;
                item.addEventListener("input", (e => {
                    e.preventDefault();
                    const inputValue = e.target.value;
                    const lastChar = e.data;
                    if (inputValue.length <= effectiveMask.length - 1) inputHandler("backspace"); else inputHandler(lastChar);
                    e.target.value = currentValue;
                }));
                item.addEventListener("focus", (e => {
                    e.preventDefault();
                }));
                item.addEventListener("mouseup", (e => {
                    e.preventDefault();
                    item.setSelectionRange(getCurrentPosition(), getCurrentPosition());
                }));
                item.addEventListener("input", (e => {
                    e.preventDefault();
                    item.setSelectionRange(getCurrentPosition(), getCurrentPosition());
                }));
                item.classList.add("init");
            }
            initMask();
        }));
    }
    createMask({
        element: document.querySelectorAll('input[type="tel"]'),
        mask: "+___(__)__-__ ___",
        blocked: [ [ 0 ] ],
        slug: window.location.pathname
    });
    function requestFrameDelay(ms) {
        return new Promise((resolve => {
            const start = performance.now();
            function step(time) {
                if (time - start >= ms) resolve(); else requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }));
    }
    async function animateTextFromDOM(containerId, delayTime = 150) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const text = container.innerText;
        container.innerHTML = "";
        for (const letter of text) {
            container.innerHTML += letter;
            await requestFrameDelay(delayTime);
        }
        await requestFrameDelay(400);
        container.classList.add("animated");
    }
    document.addEventListener("watcherCallback", (function(e) {
        const entry = e.detail.entry;
        const targetElement = entry.target;
        if (targetElement.classList.contains("_watcher-view") && targetElement.classList.contains("form-page__title")) {
            const currentHeight = targetElement.offsetHeight;
            targetElement.style.minHeight = `${currentHeight}px`;
            setTimeout((() => {
                animateTextFromDOM("contact", 80);
            }), 300);
        }
    }));
    async function animateTextByWords(containerId, wordDelay = 800) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const text = container.innerText;
        const words = text.split(/\s+/);
        container.innerHTML = "";
        for (const word of words) {
            const span = document.createElement("span");
            span.innerText = word + " ";
            span.style.opacity = 0;
            span.style.transition = "opacity 0.5s ease";
            span.style.display = "inline-block";
            container.appendChild(span);
            await requestFrameDelay(Math.max(wordDelay, 16));
            span.style.opacity = 1;
        }
        await requestFrameDelay(400);
        container.classList.add("show-word");
    }
    async function animateImage(imageSelector, delayBeforeStart = 500, animationDuration = 500) {
        const image = document.querySelector(imageSelector);
        if (!image) return;
        image.style.opacity = 0;
        image.style.transform = "scale(0) rotate(0deg)";
        image.offsetHeight;
        image.style.transition = `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`;
        await requestFrameDelay(delayBeforeStart);
        image.style.opacity = 1;
        image.style.transform = "scale(1) rotate(360deg)";
    }
    document.addEventListener("DOMContentLoaded", (async () => {
        const title2 = document.getElementById("title-2");
        const title3 = document.getElementById("title-3");
        if (title2) title2.style.opacity = "0";
        if (title3) title3.style.opacity = "0";
        await animateTextFromDOM("title-1", 80);
        await requestFrameDelay(250);
        if (title2) {
            title2.style.opacity = "1";
            await animateTextByWords("title-2", 150);
        }
        await requestFrameDelay(50);
        await animateImage(".middle-hero__image", 200, 700);
        await requestFrameDelay(0);
        if (title3) {
            title3.style.opacity = "1";
            await animateTextByWords("title-3", 250);
        }
        const paragraphs = document.querySelectorAll(".hero-page__p");
        const contactLink = document.querySelector(".hero-page__button");
        paragraphs.forEach((paragraph => {
            paragraph.classList.add("_watcher-view");
            contactLink.classList.add("_watcher-view");
        }));
    }));
    let anchorSelector = 'a[href^="#"]';
    let anchorList = document.querySelectorAll(anchorSelector);
    let offset = 50;
    anchorList.forEach((link => {
        link.onclick = function(e) {
            e.preventDefault();
            let destination = document.querySelector(this.hash);
            if (destination) {
                let destinationOffset = destination.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: destinationOffset,
                    behavior: "smooth"
                });
                document.documentElement.classList.remove("lock", "menu-open");
            }
        };
    }));
    window["FLS"] = true;
    menuInit();
    customCursor(true);
    formSubmit();
})();
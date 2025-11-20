class OnTheGo {
    static modes = ["txt", "img", "ext"];
    static stored = { txt: {}, img: {}, ext: {} };
    static initialized = false;

    /* ------------------------------------------------------------------
       Utility shortcuts
    ------------------------------------------------------------------ */

    static $(id) {
        return document.getElementById(id);
    }

    static ensureStored(store, key, value) {
        if (store[key] === undefined) store[key] = value;
    }

    static prependIfNotFirst(parent, child) {
        if (parent && child && parent.firstChild !== child) {
            parent.prepend(child);
        }
    }

    /* ------------------------------------------------------------------
       Main Layout Logic
    ------------------------------------------------------------------ */
    static apply(mode) {
        const prefix = mode === "ext" ? "extras_" : `${mode}2img_`;
        const store = OnTheGo.stored[mode];

        const generateBtn = this.$(prefix + "generate");
        if (!generateBtn) return;

        const result = this.$(prefix + "results");
        if (!result) return;

        /* ----------------------------------------------
           1. Special img2img logic – Interrogate button
        ---------------------------------------------- */
        if (mode === "img") {
            const itBtn = this.$("interrogate");
            if (itBtn) {
                this.ensureStored(store, "it_display", itBtn.parentElement.style.display);
                itBtn.parentElement.style.display = "contents";
            }
        }

          /* ----------------------------------------------
              2. (Removed) Generate button padding is handled by CSS
          ---------------------------------------------- */

        /* ----------------------------------------------
           3. Move results ABOVE everything
        ---------------------------------------------- */
        let topRow = this.$(prefix + "toprow");

        if (mode === "ext") {
            topRow =
                this.$("mode_extras") ||
                document.querySelector("#extras_tab .extra-container") ||
                generateBtn.closest(".extra-container") ||
                generateBtn.parentElement;
        }

        if (topRow) {
            this.ensureStored(store, "res_parent", result.parentElement);
            this.ensureStored(store, "res_next", result.nextSibling);

            this.prependIfNotFirst(topRow, result);
        }

        /* ----------------------------------------------
           4. Create (or reuse) Jump-To-Top button
        ---------------------------------------------- */
        if (!store.jump) {
            const jump = document.createElement("button");
            jump.id = prefix + "jump_to_top";
            jump.textContent = "Jump To Top";
            jump.className = generateBtn.className;

            Object.assign(jump.style, {
                position: "relative",
                minHeight: "2.5em",
                width: "80%",
                left: "10%",
                margin: "1em 0 0 0"
            });

            jump.addEventListener("click", () =>
                window.scrollTo({ top: 0, behavior: "smooth" })
            );

            const tab = this.$("tab_" + (mode === "ext" ? "extras" : mode + "2img"));
            if (tab) tab.appendChild(jump);

            store.jump = jump;
        }
    }

    /* ------------------------------------------------------------------
       Remove Mobile Layout (landscape mode)
    ------------------------------------------------------------------ */

    static remove(mode) {
        const prefix = mode === "ext" ? "extras_" : `${mode}2img_`;
        const store = OnTheGo.stored[mode];

        // Remove jump button
        if (store.jump) {
            store.jump.remove();
            store.jump = null;
        }

        // Restore results
        const res = this.$(prefix + "results");
        if (res && store.res_parent) {
            requestAnimationFrame(() => {
                if (store.res_next)
                    store.res_parent.insertBefore(res, store.res_next);
                else store.res_parent.appendChild(res);
            });
        }

        // Padding restoration removed; CSS handles layout now

        // Restore interrogate display (img2img only)
        if (mode === "img") {
            const itBtn = this.$("interrogate");
            if (itBtn && store.it_display !== undefined) {
                itBtn.parentElement.style.display = store.it_display;
            }
        }

        // Reset stored data for this mode
        OnTheGo.stored[mode] = {};
    }

    /* ------------------------------------------------------------------
       Orientation handling (debounced)
    ------------------------------------------------------------------ */

    static handleOrientation = (() => {
        let timer = null;
        return (mql) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const portrait = mql.matches;
                this.modes.forEach(mode =>
                    portrait ? this.apply(mode) : this.remove(mode)
                );
            }, 40);
        };
    })();

    /* ------------------------------------------------------------------
       Main init
    ------------------------------------------------------------------ */

    static main() {
        if (this.initialized) return;
        this.initialized = true;

        const mql = window.matchMedia("(max-width: 703px)");
        this.handleOrientation(mql);
        mql.addEventListener("change", (e) => this.handleOrientation(e.target));
    }
}

onUiLoaded(() => OnTheGo.main());

function makeSliderVerticalSafe(sliderEl) {
    let startX = 0;
    let startY = 0;
    let allowDrag = false;

    sliderEl.addEventListener("pointerdown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        allowDrag = false;
    });

    sliderEl.addEventListener("pointermove", (e) => {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);

        // Only allow slider movement if horizontal swipe dominates
        if (!allowDrag) {
            if (dx > 6 && dx > dy) {
                allowDrag = true;      // horizontal → OK
            } else {
                return;                // vertical → ignore
            }
        }
    }, { passive: true });

    // Block Gradio slider update logic when vertical
    sliderEl.addEventListener("touchmove", (e) => {
        if (!allowDrag) {
            e.stopPropagation();
        }
    }, { passive: false });
}

// Apply to all Gradio sliders once UI loads
function patchAllSliders() {
    document.querySelectorAll(".gradio-slider").forEach(slider => {
        makeSliderVerticalSafe(slider);
    });
}

// MutationObserver so newly added sliders also get patched
const observer = new MutationObserver(() => {
    patchAllSliders();
});
observer.observe(document.body, { childList: true, subtree: true });

patchAllSliders();

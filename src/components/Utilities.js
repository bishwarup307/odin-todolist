const util = (function utility() {
    const processString = (str) => str.trim().toLowerCase();
    const capitalize = (str) =>
        str[0].toUpperCase() + str.slice(1).toLowerCase();

    const toTitleCase = (str) => {
        const words = str.split(" ").map(capitalize);
        return words.join(" ");
    };
    const getStrHash = (str) => str.replaceAll(" ", "").toLowerCase();

    function adjustColor(color, amount) {
        return (
            "#" +
            color
                .replace(/^#/, "")
                .replace(/../g, (color) =>
                    (
                        "0" +
                        Math.min(
                            255,
                            Math.max(0, parseInt(color, 16) + amount)
                        ).toString(16)
                    ).substr(-2)
                )
        );
    }

    function showToast(text) {
        const toast = document.querySelector("#toast");
        toast.textContent = text;
        toast.classList.remove("hidden");
        toast.classList.add("toast-animation");

        setTimeout(() => {
            toast.classList.add("hidden");
            toast.classList.remove("toast-animation");
        }, 3000);
    }

    // This is a pure hack to make the UI update on the fly
    // while editing tasks. We append this empty div to the task view
    // container to make use of MutationObserver to handle the UI update
    // I could NOT find a better way to do this for now.
    function updateUIHack() {
        const myHackDiv = document.createElement("div");
        document.querySelector("#hack").appendChild(myHackDiv);
    }

    return {
        processString,
        capitalize,
        toTitleCase,
        getStrHash,
        adjustColor,
        showToast,
        updateUIHack,
    };
})();
export default util;

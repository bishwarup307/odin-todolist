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

    return { processString, capitalize, toTitleCase, getStrHash, adjustColor };
})();
export default util;

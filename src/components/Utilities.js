const util = (function utility() {
    const processString = (str) => str.trim().toLowerCase();
    const capitalize = (str) =>
        str[0].toUpperCase() + str.slice(1).toLowerCase();

    const toTitleCase = (str) => {
        const words = str.split(" ").map(capitalize);
        return words.join(" ");
    };
    const getStrHash = (str) => str.replaceAll(" ", "").toLowerCase();

    return { processString, capitalize, toTitleCase, getStrHash };
})();

export default util;

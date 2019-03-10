/* eslint no-param-reassign: ["error", { "props": false }] */

export default (event) => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    event.target.value = event.target.value.toUpperCase();
    event.target.setSelectionRange(start, end);
    return event.target.value;
}

function openFormulaModal(id) {
    const modal = document.getElementById('formulaModal');
    const formulaBoxes = document.querySelectorAll('.formula-box');
    formulaBoxes.forEach(box => {
        box.style.display = 'none';
    });
    const selectedBox = document.getElementById(id);
    if (selectedBox) {
        selectedBox.style.display = 'block';
    }
    modal.style.display = 'block';
    if (typeof MathJax !== 'undefined') {
        MathJax.typeset();
    }
}
function closeFormulaModal() {
    const modal = document.getElementById('formulaModal');
    modal.style.display = 'none';
}
window.onclick = function(event) {
    const modal = document.getElementById('formulaModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
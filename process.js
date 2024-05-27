// process.js
async function initPyodide() {
    await loadPyodide({ indexURL: 'https://files.pythonhosted.org/packages/d1/f5/d3129894528690dee98a4b72cab6fecec60deca0cf4273424dba918a3457/PyMuPDF-1.24.4-cp312-none-manylinux2014_x86_64.whl' }); // Adjust the URL to where your.whl file is hosted
    await pyodide.loadPackage('pymupdf');

    document.getElementById('runDemo').addEventListener('click', async () => {

        const result = await pyodide.runPythonAsync(`
            import main
            main.main()
        `);

        document.getElementById('output').innerText = result;
    });
}
initPyodide();



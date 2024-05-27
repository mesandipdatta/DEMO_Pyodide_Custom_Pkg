async function initPyodide() {
    const pyodide = await loadPyodide({
        indexURL: './pyodide/'
    });

    // Install the local PyMuPDF wheel
    await pyodide.runPythonAsync(`
        import micropip
        await micropip.install('./wheels/PyMuPDF-1.24.4-cp312-none-manylinux2014_x86_64.whl')
    `);

    document.getElementById('runDemo').addEventListener('click', async () => {
        const result = await pyodide.runPythonAsync(`
            import main
            main.main()
        `);

        document.getElementById('output').innerText = result;
    });
}

initPyodide();

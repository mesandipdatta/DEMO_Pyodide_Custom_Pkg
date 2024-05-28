async function initPyodide() {
    const pyodide = await loadPyodide({
        //indexURL: './pyodide/'
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
    });

    // Load the micropip package
    await pyodide.loadPackage('micropip');

    // Install the local PyMuPDF wheel
    // CHANGED -->  await micropip.install('./wheels/PyMuPDF-1.24.4-cp311-none-emscripten_3_1_32_wasm32.whl')
    // TO --> await micropip.install('./wheels/PyMuPDF-1.24.4-cp311-none-emscripten_3_1_46_wasm32.whl')
    // ELSE Error - "Wheel was built with Emscripten v3.1.32 but Pyodide was built with Emscripten v3.1.46"
    await pyodide.runPythonAsync(`
        import micropip
        await micropip.install('./wheels/PyMuPDF-1.24.4-cp311-none-emscripten_3_1_46_wasm32.whl')
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

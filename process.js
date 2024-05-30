// process.js

async function loadPyodide() {
    await languagePluginLoader;
    console.log('Pyodide loaded successfully.');
}

async function callMain() {
    const pythonCode = `
        import sys
        sys.path.append('./py-pkgs')  // Update with your actual path
        from main import main
        main()
    `;

    await pyodide.runPythonAsync(pythonCode);
}

document.getElementById('runDemo').addEventListener('click', async () => {
    await loadPyodide();
    await callMain();
    document.getElementById('output').innerText = 'Python code executed successfully.';
});

// Import Pyodide using importScripts()
importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

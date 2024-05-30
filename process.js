// process.js

async function loadPyodide() {
    await languagePluginLoader;
    console.log('Pyodide loaded successfully.');
}

async function callMain() {
    const pythonCode = `
        import sys
        sys.path.append('/path/to/py-pkgs')  // Update with your actual path
        from main import main
        main()
    `;

    await pyodide.runPythonAsync(pythonCode);
}

document.getElementById('runDemo').addEventListener('click', async () => {
    await loadPyodide();
    await callMain();
    console.log('Python code executed successfully.');  // Add this line for debugging
    document.getElementById('output').innerText = 'Python code executed successfully.';
});

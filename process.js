import { loadPyodide } from 'pyodide';

async function main() {
    // Load Pyodide with the custom stdlib URL
    const pyodide = await loadPyodide({ stdLibURL: "./python_stdlib_patched.zip" });

    // Run Python code using the bundled packages
    pyodide.runPython(`
        import mymodule.run
        mymodule.run.myfunc()
    `);
}

main();

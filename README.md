# DEMO_Pyodide_Custom_Pkg
Using Custom Packages with Pyodide (i.e. packages not part of Pyodide builtin ecosystem)

Website Link: https://mesandipdatta.github.io/DEMO_Pyodide_Custom_Pkg/


# Error: 

"Wheel was built with Emscripten v3.1.32 but Pyodide was built with Emscripten v3.1.46"

// process.js
// Install the local PyMuPDF wheel
```python
   await pyodide.runPythonAsync(`
        import micropip
        await micropip.install('./wheels/PyMuPDF-1.24.4-cp311-none-emscripten_3_1_46_wasm32.whl')
    `);
```

Fix - Just renamed the file 
- FROM -->  PyMuPDF-1.24.4-cp311-none-emscripten_3_1_32_wasm32.whl
- TO --> PyMuPDF-1.24.4-cp311-none-emscripten_3_1_46_wasm32.whl
 

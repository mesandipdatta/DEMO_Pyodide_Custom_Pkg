document.addEventListener("DOMContentLoaded", async () => {
    // Load and initialize Pyodide
    async function main() {
      const loadingMessage = document.getElementById("loadingMessage");
      const loadingTime = document.getElementById("loadingTime");
      const translateButton = document.getElementById("translateButton");
  
      // Record the start time
      const startTime = performance.now();
  
      try {
        console.log("Starting Pyodide load");
        // Load Pyodide
        let pyodide = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.0/full/"
        });
  
        console.log("Pyodide loaded, loading micropip package");
        // Ensure Pyodide is fully initialized
        await pyodide.loadPackage('micropip');
  
        // Record the end time
        const endTime = performance.now();
  
        // Calculate the loading time
        const loadTime = (endTime - startTime).toFixed(2);
  
        // Hide loading message and enable the button
        loadingMessage.style.display = "none";
        translateButton.disabled = false;
  
        // Display the loading time
        loadingTime.innerText = `Pyodide loaded in ${loadTime} milliseconds.`;
        console.log(`Pyodide loaded in ${loadTime} milliseconds.`);
  
        // Fetch the Python code from the main.py file
        const response = await fetch('main.py');
        const pythonCode = await response.text();
  
        // Function to run the Python script
        async function translateEnglish() {
          // Get the input value
          let englishText = document.getElementById("english").value;
  
          // Create a complete Python script to execute
          const completePythonCode = `
  ${pythonCode}
  
  translate_english('${englishText}')
          `;
  
          // Run the Python code
          let result = await pyodide.runPythonAsync(completePythonCode);
  
          // Display the result
          document.getElementById("output").innerText = result;
        }
  
        // Add event listener to the button
        translateButton.addEventListener("click", translateEnglish);
  
      } catch (error) {
        // Handle errors in loading Pyodide
        loadingMessage.innerText = "Failed to load Pyodide. Please try again later.";
        console.error(error);
      }
    }
  
    main();
  });
  
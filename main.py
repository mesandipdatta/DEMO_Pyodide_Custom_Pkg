def main(text):
    import_libs()
    text = "Hello from Python"
    return text

def import_libs():
    import sys
    import os

    # Get the directory where the current script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct paths to the desired subdirectories
    pymupdf_path = os.path.join(script_dir, 'py-pkgs', 'pymupdf')
    #sm1_path = os.path.join(script_dir, 'py_pkgs', 'sm1')

    # Append both paths to the end of sys.path
    sys.path.append(pymupdf_path)
    #sys.path.append(sm1_path)

    # Now you can import your dependencies
    import fitz  # pymupdf

print (main("hello"))
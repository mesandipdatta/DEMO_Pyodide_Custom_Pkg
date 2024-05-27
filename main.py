import fitz  # PyMuPDF

def read_pdf_text(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def main():
    pdf_path = 'test.pdf'  # Adjust the path to your PDF
    text = read_pdf_text(pdf_path)
    return text

if __name__ == "__main__":
    print(main())


## Fix for Last word getting dropped sometimes.
# Issue is with the Highlighted Rectagular box "Coverage" or tolerance.
# Solved dropping issue - But sometimes picks up extra not-highlighted
#   next word\letter too.
# Issue with the Rectangular Box Tolerance .
#==============================================
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


#==============================================

def make_text(words, tolerance=0.01): #tolerance=1.0
    """Return textstring output of get_text("words").

    Word items are sorted for reading sequence left to right,
    top to bottom.
    """
    line_dict = {}  # key: vertical coordinate, value: list of words
    words.sort(key=lambda w: w[0])  # sort by horizontal coordinate

    for w in words:  # fill the line dictionary
        y1 = round(w[3], 1)  # bottom of a word
        word = w[4]  # the text of the word

        # Find an existing line close enough vertically
        found_line = False
        for key in line_dict:
            if abs(key - y1) < tolerance:
                line_dict[key].append(word)
                found_line = True
                break

        if not found_line:
            line_dict[y1] = [word]

    lines = list(line_dict.items())
    lines.sort()  # sort vertically

    return "\n".join([" ".join(line[1]) for line in lines])

def main():
    doc = fitz.open("./input-files/test.pdf")  # any supported document type

    # Iterate over all pages in the document
    for page_num in range(doc.page_count):
        page = doc[page_num]

        # Get all annotations on the current page
        annots = page.annots()

        # Check if there are any annotations
        if annots:
            for annot in annots:

                # Get the rectangle of the current annotation
                rect = annot.rect

                # Get all words on the page
                words = page.get_text("words")

                # Case 1: select the words *fully contained* in the rect
                mywords = [w for w in words if fitz.Rect(w[:4]) in rect]

                # Print words strictly contained in the rectangle
                print(make_text(mywords))
                print("========================================")

                # # Case 2: select the words *intersecting* the rect
                # mywords = [w for w in words if fitz.Rect(w[:4]).intersects(rect)]

                # # Print words intersecting the rectangle
                # print(make_text(mywords))
                # print("========================================")



main()
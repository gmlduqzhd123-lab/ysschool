#!/bin/sh
# Render deck.pptx to slide images and contact-sheet grids for visual QA.
# Usage: sh render_grid.sh deck.pptx OUT_DIR   (needs the pptx skill's soffice.py; set PPTX_SKILL to its dir)
set -e
DECK=$1; OUT=$2; mkdir -p "$OUT"
python "$PPTX_SKILL/scripts/office/soffice.py" --headless --convert-to pdf --outdir "$OUT" "$DECK" >/dev/null 2>&1
PDF="$OUT/$(basename "${DECK%.*}").pdf"
rm -f "$OUT"/s-*.jpg; pdftoppm -jpeg -r 40 "$PDF" "$OUT/s"
python3 - "$OUT" <<'PY'
import sys, glob
from PIL import Image
o = sys.argv[1]; f = sorted(glob.glob(o + "/s-*.jpg")); im = [Image.open(x) for x in f]; w, h = im[0].size
for k in range(0, len(im), 21):
    g = Image.new("RGB", (w * 3, h * 7), "white")
    for i, m in enumerate(im[k:k + 21]): g.paste(m, ((i % 3) * w, (i // 3) * h))
    g.save(f"{o}/grid{k:02d}.jpg"); print(f"{o}/grid{k:02d}.jpg")
PY

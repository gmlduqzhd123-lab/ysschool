"""Extract a photo zip (Korean Windows names in cp949) as p0.png, p1.png ... and print the index -> original name map.
Usage: python3 -I unzip_photos.py photos.zip OUT_DIR"""
import sys, zipfile, os
z = zipfile.ZipFile(sys.argv[1]); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
k = 0
for i in z.infolist():
    if i.is_dir(): continue
    try: name = i.filename.encode("cp437").decode("cp949")
    except Exception: name = i.filename
    ext = os.path.splitext(name)[1].lower() or ".png"
    open(os.path.join(out, f"p{k}{ext}"), "wb").write(z.read(i))
    print(f"p{k}{ext}\t{name}"); k += 1

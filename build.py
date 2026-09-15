from pathlib import Path

root = Path(__file__).resolve().parent
page = (root / "src/page.html").read_text()
banner = (root / "src/banner.html").read_text()
assert page.count("__SUSPENSION_BANNER__") == 1
(root / "index.html").write_text(page.replace("__SUSPENSION_BANNER__", banner))
print("Built index.html")

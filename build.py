from pathlib import Path
import base64

root = Path(__file__).resolve().parent
page = (root / "src/page.html").read_text()
portrait = "data:image/png;base64," + base64.b64encode((root / "src/assets/red-chrome-portrait.png").read_bytes()).decode("ascii")
page = page.replace("__PORTRAIT_DATA__", portrait)
banner = (root / "src/banner.html").read_text()
banner = banner.replace("__JUNGLE_SCRIPT__", (root / "src/jungle.js").read_text())
assert page.count("__SUSPENSION_BANNER__") == 1
(root / "index.html").write_text(page.replace("__SUSPENSION_BANNER__", banner))
print("Built index.html")

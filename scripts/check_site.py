#!/usr/bin/env python3
"""Check existence of relative HTML/CSS/JS links in this static site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

ROOT = Path(__file__).resolve().parents[1]

class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.urls=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        attr='href' if tag in {'a','link'} else 'src' if tag in {'script','img'} else None
        if attr and attrs.get(attr): self.urls.append(attrs[attr])

missing=[]; count=0
for page in sorted(ROOT.rglob('*.html')):
    parser=Links(); parser.feed(page.read_text(encoding='utf-8'))
    for url in parser.urls:
        parsed=urlsplit(url)
        if parsed.scheme or parsed.netloc or url.startswith(('#','mailto:','tel:')): continue
        path=unquote(parsed.path)
        if not path: continue
        target=(page.parent/path).resolve()
        count += 1
        if not target.is_relative_to(ROOT.resolve()) or not target.is_file():
            missing.append((page.relative_to(ROOT),url))
print(f'Checked {len(list(ROOT.rglob("*.html")))} HTML pages and {count} local references.')
if missing:
    for page,url in missing: print(f'MISSING: {page} -> {url}')
    sys.exit(1)
print('PASS: all internal links and referenced local assets exist.')

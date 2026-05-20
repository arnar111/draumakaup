#!/usr/bin/env python3
"""Download player cutout photos from TheSportsDB for every player in data.jsx.

Free API, no key needed. Cutouts are transparent-background portraits — ideal
for trading-card style cards. Saves to photos/<id>.png.

Run once. The photos are committed to the repo so the app never hits an external
API at runtime.
"""
import json
import os
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
PHOTOS_DIR = os.path.join(ROOT, 'photos')
os.makedirs(PHOTOS_DIR, exist_ok=True)

# Manual overrides for ambiguous / wrong matches (TheSportsDB picks the wrong
# player for some common names). Map id -> exact search query.
SEARCH_OVERRIDES = {
    # Add overrides here if any player resolves to the wrong person
    'son': 'Heung-min Son',
    'mfernandes': 'Mateus Fernandes',
    'jgomes': 'João Gomes',
    'rneves': 'Rúben Neves',
    'brunog': 'Bruno Guimarães',
    'estevao': 'Estêvão Willian',
    'collyer': 'Toby Collyer',
}

# Players we expect to fail (too young / no photo in DB). Skip silently.
EXPECTED_MISSES = set(['jjgabriel', 'sedikinteh', 'castillo', 'orozco', 'subiabre'])


def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if not unicodedata.combining(c))


def search_player(query):
    url = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=' + urllib.parse.quote(query)
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            data = json.loads(r.read().decode('utf-8'))
    except Exception as e:
        print(f'  ! search error: {e}', file=sys.stderr)
        return None
    players = data.get('player') or []
    return players


def pick_best(players, expected_name):
    """Pick the highest-relevance soccer match whose name resembles expected."""
    if not players:
        return None
    soccer = [p for p in players if p.get('strSport') == 'Soccer']
    if not soccer:
        return None
    # Prefer exact name match on a normalised compare
    target = strip_accents(expected_name).lower()
    for p in soccer:
        if strip_accents(p.get('strPlayer', '')).lower() == target:
            return p
    # Otherwise return first soccer hit
    return soccer[0]


def download_image(url, dest):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'draumakaup-script/1.0'})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = r.read()
        if len(data) < 1000:
            return False
        with open(dest, 'wb') as f:
            f.write(data)
        return True
    except Exception as e:
        print(f'  ! download error: {e}', file=sys.stderr)
        return False


def extract_players_from_data_jsx(path):
    """Parse the simple { id:'x', name:'Y', ... } objects out of data.jsx.

    We just need id + name for the search query.
    """
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    # Match id:'foo', name:'Bar Baz', ...
    pat = re.compile(r"id:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'")
    return pat.findall(text)


def main():
    data_jsx = os.path.join(ROOT, 'data.jsx')
    players = extract_players_from_data_jsx(data_jsx)
    print(f'Found {len(players)} players in data.jsx')

    hits, misses = [], []
    for pid, name in players:
        out = os.path.join(PHOTOS_DIR, f'{pid}.png')
        if os.path.exists(out) and os.path.getsize(out) > 5000:
            print(f'  ✓ {pid} (cached)')
            hits.append(pid)
            continue

        query = SEARCH_OVERRIDES.get(pid, strip_accents(name))
        print(f'  → {pid} :: {name} :: search "{query}"')
        results = search_player(query)
        best = pick_best(results or [], name)

        if not best:
            print(f'    ✗ no match')
            misses.append((pid, name))
            time.sleep(0.4)
            continue

        # Prefer cutout (transparent), fall back to thumb
        img_url = best.get('strCutout') or best.get('strThumb')
        if not img_url:
            print(f'    ✗ no image url')
            misses.append((pid, name))
            time.sleep(0.4)
            continue

        ok = download_image(img_url, out)
        if ok:
            print(f'    ✓ saved → {out} (matched {best.get("strPlayer")} @ {best.get("strTeam")})')
            hits.append(pid)
        else:
            misses.append((pid, name))
        time.sleep(0.4)  # be polite to the free API

    print()
    print(f'Done. {len(hits)} hits / {len(misses)} misses out of {len(players)}')
    if misses:
        print('Misses:')
        for pid, name in misses:
            tag = ' (expected)' if pid in EXPECTED_MISSES else ''
            print(f'  - {pid} :: {name}{tag}')


if __name__ == '__main__':
    main()

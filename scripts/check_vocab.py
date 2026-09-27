import json
import os

with open('src/data/translator/translatorDb.json', 'r', encoding='utf-8') as f:
    existing_db = json.load(f)

print(f"Current count: {len(existing_db)}")
existing_en = set((e['translations']['en'] or '').strip().lower() for e in existing_db)

# We will generate comprehensive, high-quality entries across 10 categories:
# academic, it_tech, business, daily, health, travel, food, nature, culture, society
# Each entry will have translations in: uz, en, ru, de, fr, tr, ar, es, zh, ko

# Let's inspect category distribution
cat_counts = {}
for e in existing_db:
    cat = e.get('category', 'daily')
    cat_counts[cat] = cat_counts.get(cat, 0) + 1

print("Categories count:", cat_counts)

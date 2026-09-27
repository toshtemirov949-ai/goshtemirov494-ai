# -*- coding: utf-8 -*-
"""
Main Vocabulary Generation Orchestrator
Builds authentic vocabulary for English, Russian, French, and German.
Delegates to build_authentic_vocabs.py to ensure 100% genuine real words.
"""

import sys
import os
import subprocess

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    builder = os.path.join(script_dir, "build_authentic_vocabs.py")
    result = subprocess.run([sys.executable, builder], check=True)
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()

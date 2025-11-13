#!/usr/bin/env python3
import sys
import time

def main():
    if len(sys.argv) < 2:
        print("Usage: python wait.py <seconds>")
        sys.exit(1)

    try:
        n = float(sys.argv[1])
    except ValueError:
        print("❌ L’argument doit être un nombre.")
        sys.exit(1)

    #print(f"⏳ Attente de {n} secondes...")
    time.sleep(n)
    #print("✅ Terminé !")

if __name__ == "__main__":
    main()

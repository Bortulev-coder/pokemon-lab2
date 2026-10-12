#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
mkdir -p build/classes
javac -encoding UTF-8 --release 8 -cp lib/Pokemon.jar -d build/classes @sources.txt
java -Dfile.encoding=UTF-8 -cp "build/classes:lib/Pokemon.jar" lab2.Main


#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p build/classes build/test-classes
javac -encoding UTF-8 --release 8 -cp lib/Pokemon.jar -d build/classes @sources.txt
javac -encoding UTF-8 --release 8 -cp "build/classes:lib/Pokemon.jar" -d build/test-classes tests/lab2/LabChecks.java
java -cp "build/classes:build/test-classes:lib/Pokemon.jar" lab2.LabChecks

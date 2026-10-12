@echo off
cd /d "%~dp0"
if not exist build\classes mkdir build\classes
javac -encoding UTF-8 --release 8 -cp lib\Pokemon.jar -d build\classes @sources.txt
java -Dfile.encoding=UTF-8 -cp "build\classes;lib\Pokemon.jar" lab2.Main


@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist build\classes mkdir build\classes
if not exist build\test-classes mkdir build\test-classes
javac -encoding UTF-8 --release 8 -cp lib\Pokemon.jar -d build\classes @sources.txt
if errorlevel 1 exit /b 1
javac -encoding UTF-8 --release 8 -cp "build\classes;lib\Pokemon.jar" -d build\test-classes tests\lab2\LabChecks.java
if errorlevel 1 exit /b 1
java -cp "build\classes;build\test-classes;lib\Pokemon.jar" lab2.LabChecks
pause

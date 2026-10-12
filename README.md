# Лабораторная работа №2

Проект реализует классы покемонов и атак на основе `Pokemon.jar`.

## Запуск

```bash
bash run.sh
```

Или вручную:

```bash
mkdir -p build/classes
javac -encoding UTF-8 --release 8 -cp lib/Pokemon.jar -d build/classes @sources.txt
java -Dfile.encoding=UTF-8 -cp "build/classes:lib/Pokemon.jar" lab2.Main
```

## UML

UML-диаграмма классов находится в `docs/class-diagram.puml`.


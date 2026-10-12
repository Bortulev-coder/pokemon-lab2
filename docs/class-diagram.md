# UML-диаграмма классов

Диаграмма записана в PlantUML-нотации в файле `class-diagram.puml`.

Основные связи:

- `Phione`, `Shellder`, `Lotad` наследуются от `Pokemon`.
- `Cloyster` наследуется от `Shellder`.
- `Lombre` наследуется от `Lotad`.
- `Ludicolo` наследуется от `Lombre`.
- Классы атак наследуются от `PhysicalMove`, `SpecialMove` или `StatusMove`.
- Покемоны связаны с атаками через `addMove(...)`.


package lab2;

import lab2.pokemons.*;
import ru.ifmo.se.pokemon.Battle;

public final class Main {
    private Main() {
    }

    public static void main(String[] args) {
        Battle battle = new Battle();

        battle.addAlly(new Phione("Фион", 65));
        battle.addAlly(new Cloyster("Клойстер", 60));
        battle.addAlly(new Ludicolo("Лудиколо", 60));

        battle.addFoe(new Shellder("Шеллдер", 50));
        battle.addFoe(new Lotad("Лотад", 40));
        battle.addFoe(new Lombre("Ломбре", 45));

        battle.go();
    }
}


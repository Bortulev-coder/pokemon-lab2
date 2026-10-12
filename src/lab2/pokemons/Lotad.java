package lab2.pokemons;

import lab2.moves.Blizzard;
import lab2.moves.Swagger;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Lotad extends Pokemon {
    public Lotad(String name, int level) {
        super(name, level);

        setType(Type.WATER, Type.GRASS);
        setStats(40, 30, 30, 40, 50, 30);

        addMove(new Blizzard());
        addMove(new Swagger());
    }
}


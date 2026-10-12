package lab2.pokemons;

import lab2.moves.HydroPump;
import lab2.moves.Rest;
import lab2.moves.Withdraw;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Shellder extends Pokemon {
    public Shellder(String name, int level) {
        super(name, level);

        setType(Type.WATER);
        setStats(30, 65, 100, 45, 25, 40);

        addMove(new Rest());
        addMove(new Withdraw());
        addMove(new HydroPump());
    }
}


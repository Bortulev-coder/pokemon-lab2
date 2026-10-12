package lab2.pokemons;

import lab2.moves.AquaRing;
import lab2.moves.Blizzard;
import lab2.moves.DazzlingGleam;
import lab2.moves.IceBeam;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public final class Phione extends Pokemon {
    public Phione(String name, int level) {
        super(name, level);

        setType(Type.WATER);
        setStats(80, 80, 80, 80, 80, 80);

        addMove(new IceBeam());
        addMove(new AquaRing());
        addMove(new DazzlingGleam());
        addMove(new Blizzard());
    }
}


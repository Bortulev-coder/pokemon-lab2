package lab2.pokemon;

import lab2.moves.*;
import ru.ifmo.se.pokemon.*;

public final class Phione extends Pokemon {
    public static final int MIN_LEVEL = 54;

    public Phione(String name) {
        super(name, MIN_LEVEL);
        setType(Type.WATER);
        setStats(80, 80, 80, 80, 80, 80);
        setMove(new IceBeam(), new AquaRing(), new DazzlingGleam(), new Blizzard());
    }
}

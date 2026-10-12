package lab2.pokemon;

import lab2.moves.*;
import ru.ifmo.se.pokemon.*;

public class Shellder extends Pokemon {
    public static final int MIN_LEVEL = 61;

    public Shellder(String name) {
        this(name, MIN_LEVEL);
    }

    protected Shellder(String name, int level) {
        super(name, level);
        setType(Type.WATER);
        setStats(30, 65, 100, 45, 25, 40);
        setMove(new Rest(), new Withdraw(), new HydroPump());
    }
}

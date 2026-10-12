package lab2.pokemon;

import lab2.moves.*;
import ru.ifmo.se.pokemon.*;

public class Lotad extends Pokemon {
    public static final int MIN_LEVEL = 1;

    public Lotad(String name) {
        this(name, MIN_LEVEL);
    }

    protected Lotad(String name, int level) {
        super(name, level);
        setType(Type.WATER, Type.GRASS);
        setStats(40, 30, 30, 40, 50, 30);
        setMove(new Blizzard(), new Swagger());
    }
}

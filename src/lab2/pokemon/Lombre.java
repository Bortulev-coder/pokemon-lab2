package lab2.pokemon;

import lab2.moves.*;
import ru.ifmo.se.pokemon.*;

public class Lombre extends Lotad {
    public static final int MIN_LEVEL = 14;

    public Lombre(String name) {
        this(name, MIN_LEVEL);
    }

    protected Lombre(String name, int level) {
        super(name, level);
        setStats(60, 50, 50, 60, 70, 50);
        addMove(new Bubble());
    }
}

package lab2.pokemon;

import lab2.moves.*;
import ru.ifmo.se.pokemon.*;

public final class Ludicolo extends Lombre {
    public static final int MIN_LEVEL = 14;

    public Ludicolo(String name) {
        super(name, MIN_LEVEL);
        setStats(80, 70, 70, 90, 100, 70);
        addMove(new FocusBlast());
    }
}

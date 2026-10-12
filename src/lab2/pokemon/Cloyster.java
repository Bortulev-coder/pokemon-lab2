package lab2.pokemon;

import lab2.moves.*;
import ru.ifmo.se.pokemon.*;

public final class Cloyster extends Shellder {
    public static final int MIN_LEVEL = 1;

    public Cloyster(String name) {
        super(name, MIN_LEVEL);
        setType(Type.WATER, Type.ICE);
        setStats(50, 95, 180, 85, 45, 70);
        addMove(new PoisonJab());
    }
}

package lab2.moves;

import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.StatusMove;
import ru.ifmo.se.pokemon.Type;

public final class AquaRing extends StatusMove {
    public AquaRing() {
        super(Type.WATER, 0, 100);
    }

    @Override
    protected void applySelfEffects(Pokemon pokemon) {
        pokemon.restore();
    }

    @Override
    protected String describe() {
        return "использует Aqua Ring";
    }
}


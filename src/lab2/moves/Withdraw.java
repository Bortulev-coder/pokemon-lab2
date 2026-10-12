package lab2.moves;

import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.StatusMove;
import ru.ifmo.se.pokemon.Type;

public final class Withdraw extends StatusMove {
    public Withdraw() {
        super(Type.WATER, 0, 100);
    }

    @Override
    protected void applySelfEffects(Pokemon pokemon) {
        pokemon.setMod(Stat.DEFENSE, 1);
    }

    @Override
    protected String describe() {
        return "использует Withdraw";
    }
}


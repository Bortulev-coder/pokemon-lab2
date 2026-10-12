package lab2.moves;

import ru.ifmo.se.pokemon.Effect;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Status;
import ru.ifmo.se.pokemon.StatusMove;
import ru.ifmo.se.pokemon.Type;

public final class Rest extends StatusMove {
    public Rest() {
        super(Type.PSYCHIC, 0, 100);
    }

    @Override
    protected void applySelfEffects(Pokemon pokemon) {
        pokemon.setCondition(new Effect().condition(Status.SLEEP).turns(2));
        pokemon.restore();
    }

    @Override
    protected String describe() {
        return "использует Rest";
    }
}


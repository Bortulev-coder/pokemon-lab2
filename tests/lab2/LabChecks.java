package lab2;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.*;
import lab2.moves.*;
import lab2.pokemon.*;
import ru.ifmo.se.pokemon.*;

/** Проверки без JUnit; reflection применяется только в тестах. */
public final class LabChecks {
    private static int checks;
    private LabChecks() { }

    private static void check(boolean ok, String message) {
        checks++;
        if (!ok) throw new AssertionError(message);
    }

    private static Object field(Object object, Class<?> owner, String name)
            throws Exception {
        Field f = owner.getDeclaredField(name);
        f.setAccessible(true);
        return f.get(object);
    }

    private static void apply(Move move, String method, Pokemon p)
            throws Exception {
        Method m = move.getClass().getDeclaredMethod(method, Pokemon.class);
        m.setAccessible(true);
        m.invoke(move, p);
    }

    public static void main(String[] args) throws Exception {
        Pokemon[] all = {new Phione("P"), new Shellder("S"),
                new Cloyster("C"), new Lotad("L"),
                new Lombre("M"), new Ludicolo("D")};
        int[] levels = {54, 61, 1, 1, 14, 14};
        String[][] expected = {
            {"IceBeam", "AquaRing", "DazzlingGleam", "Blizzard"},
            {"Rest", "Withdraw", "HydroPump"},
            {"Rest", "Withdraw", "HydroPump", "PoisonJab"},
            {"Blizzard", "Swagger"},
            {"Blizzard", "Swagger", "Bubble"},
            {"Blizzard", "Swagger", "Bubble", "FocusBlast"}
        };
        double[][] stats = {{80,80,80,80,80,80}, {30,65,100,45,25,40},
            {50,95,180,85,45,70}, {40,30,30,40,50,30},
            {60,50,50,60,70,50}, {80,70,70,90,100,70}};
        Type[][] types = {{Type.WATER}, {Type.WATER},
            {Type.WATER,Type.ICE}, {Type.WATER,Type.GRASS},
            {Type.WATER,Type.GRASS}, {Type.WATER,Type.GRASS}};
        for (int i = 0; i < all.length; i++) {
            check(all[i].getLevel() == levels[i], "level");
            check(Arrays.equals(all[i].getTypes(), types[i]), "types");
            double[] actual = (double[]) field(all[i], Pokemon.class, "base");
            Stat[] order = {Stat.HP, Stat.ATTACK, Stat.DEFENSE,
                Stat.SPECIAL_ATTACK, Stat.SPECIAL_DEFENSE, Stat.SPEED};
            for (int k = 0; k < order.length; k++) {
                check(actual[order[k].ordinal()] == stats[i][k], "stats");
            }
            List<?> moves = (List<?>) field(all[i], Pokemon.class, "moves");
            check(moves.size() == expected[i].length, "move count");
            for (int j = 0; j < moves.size(); j++) {
                check(moves.get(j).getClass().getSimpleName()
                        .equals(expected[i][j]), "move name");
                check(Modifier.isFinal(moves.get(j).getClass().getModifiers()),
                        "move must be final");
            }
        }
        check(Cloyster.class.getSuperclass() == Shellder.class, "evolution");
        check(Lombre.class.getSuperclass() == Lotad.class, "evolution");
        check(Ludicolo.class.getSuperclass() == Lombre.class, "evolution");
        for (Class<?> c : new Class<?>[]{Phione.class, Cloyster.class,
                Ludicolo.class, Main.class, LabChecks.class}) {
            check(Modifier.isFinal(c.getModifiers()), "leaf must be final");
        }
        Pokemon p = new Shellder("Rest test");
        p.restore();
        p.setMod(Stat.HP, 20);
        p.setMod(Stat.DEFENSE, 2);
        Effect.poison(p);
        apply(new Rest(), "applySelfEffects", p);
        check(p.getHP() == p.getStat(Stat.HP), "Rest heals fully");
        check(p.getCondition() == Status.SLEEP, "Rest replaces poison");
        Effect stage = (Effect) field(p, Pokemon.class, "stage");
        check(stage.stat(Stat.DEFENSE) == 2, "Rest preserves stat stages");
        p.turn();
        check(p.getCondition() == Status.SLEEP, "Rest current turn");
        p.turn();
        check(p.getCondition() == Status.SLEEP, "Rest next turn");
        p.turn();
        check(p.getCondition() == Status.NORMAL, "Rest second sleep turn ends");
        apply(new Rest(), "applySelfEffects", p);
        check(p.getCondition() == Status.NORMAL, "Rest fails at full HP");
        apply(new Withdraw(), "applySelfEffects", p);
        check(stage.stat(Stat.DEFENSE) == 3, "Withdraw adds one stage");
        apply(new Swagger(), "applyOppEffects", p);
        check(stage.stat(Stat.ATTACK) == 2, "Swagger raises opponent attack");
        check((Integer) field(p, Pokemon.class, "confusion") > 0,
                "Swagger confuses");
        Pokemon q = new Phione("Ring test");
        q.restore();
        q.setMod(Stat.HP, 30);
        AquaRing ring = new AquaRing();
        apply(ring, "applySelfEffects", q);
        apply(ring, "applySelfEffects", q);
        check(((List<?>) field(q, Pokemon.class, "effects")).size() == 1,
                "Aqua Ring does not stack");
        double before = q.getHP();
        q.turn();
        check(q.getHP() - before == (int) (q.getStat(Stat.HP) / 16),
                "Aqua Ring heals each turn");
        q.turn();
        check(q.getHP() - before == 2 * (int) (q.getStat(Stat.HP) / 16),
                "Aqua Ring persists");
        System.out.println("PASS: " + checks + " checks");
    }
}

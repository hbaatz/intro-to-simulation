<script>
    import Layout from './Layout.svelte';
    import Tip from '$lib/Tip.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Code from '$lib/CodeViewer.svelte';
    import Icon from '$lib/Icon.svelte';
    import Tex from '$lib/Tex.svelte';
    import LogSlider from '$lib/LogSlider.svelte';
    import { Play, StepForward, Check } from '@lucide/svelte';

    let timeStep = $state(0.2);
    let currentTime = $state();
</script>

<Layout
    codeTitle={'Schrittfunktion'}
    codeTemplate={
`def step(x, dt):
    # TODO: Aufgabe 2
    x[0] = x[0] + 1
    x[1] = x[1] - 0.5
    return x`
    }
    referenceCode={
`def step(x, dt):
    x[0] = x[0] + dt * 5
    x[1] = x[1] - dt * 2.5
    return x`
    }
    initialState={[[0, 0]]}
    constants={[timeStep]}
    bind:currentTime
    showTicks={true}
    cameraFocus={[-5, 0]}
    readout={currentTime?.toFixed(2) + 's'}
>
    <p>Wenn wir momentan die Simulation ausführen, indem wir auf <Icon icon={Play}/> drücken, bewegt sich Pluto zwar mit der erwarteten Geschwindigkeit von <code>[5,-2.5]<Tex math='m/s'/></code>, das ganze stockt dabei aber etwas, da die Schrittfunktion nur alle 0.2 Sekunden ausgeführt wird.</p>

    <Exercise title={'Änderung der Zeitschritte'} number={'1'}>
        Mit dem Regler unten kannst du anpassen, wie lange zwischen zwei aufrufen der Schrittfunktion gewartet wird. Wie verändert sich die Geschwindigkeit von Pluto in Abhängigkeit der gewarteten Zeit, dem sogenannten <em>Zeitschritt</em> <code>dt</code>? Warum ist das so?
    </Exercise>
    <LogSlider title='Zeitschritt' bind:value={timeStep} prefix='dt = ' postfix='s' fromMagnitude={-2} toMagnitude={0}/>

    <p>Wie du in der Aufgabe oben gesehen hast, wird die Bewegung von Pluto zwar flüssiger, wenn man <code>dt</code> kleiner wählt, aber Pluto bewegt sich dann auch schneller als <code>[5,-2.5]<Tex math='m/s'/></code>. Das Problem ist dabei, das die Schrittfunktion noch unabhängig von <code>dt</code> ist. Deine Aufgabe ist es nun, das zu ändern:</p>

    <Exercise title={'Simulation unabhängig von dt'} number={'2'}>
        Passe die Schrittfunktion so an, dass Pluto sich immer mit <code>[5,-2.5]<Tex math='m/s'/></code> bewegt, egal wie groß <code>dt</code> ist.<br/>
    </Exercise>
    <Tip>
        Überlege dir, wie du vom neuen Argument <code>dt</code> der Schrittfunktion Gebrauch machen kannst.
    </Tip>
    <Tip>
        Pluto sollte sich immer gleichschnell bewegen, unabhängig davon wie du <code>dt</code> im Regler oben einstellst.
    </Tip>
    <Tip>
        Wie müsstest du die Schrittfunktion anpassen, wenn <code>dt = 0.4</code> wäre? Wie wenn <code>dt = 0.1</code> wäre? Wie kannst du das auf ein beliebiges <code>dt</code> verallgemeinern?
    </Tip>

    <p>Wie du siehst, können wir eine flüssige, kontinuierliche Bewegung mit diskreten Schritten simulieren, indem wir den Zeitschritt einfach klein genug wählen, sodass man die einzelnen Schritte nicht mehr wahrnimmt.</p>

    <p>Wieso wählen wir den Zeitschritt nicht einfach immer <code>dt = 0.01</code>? Zum einen kann es sehr rechenintensiv sein, wenn wir eine Komplizierte Schrittfunktion sehr oft in der Sekunde ausführen müssen. Zum anderen werden wir in Kapitel 2 sehen, das die Korrektheit einer Simulation auch vom Zeitschritt abhängig sein kann.</p>

    <p>Wenn du alle Aufgabe bis jetzt erfolgreich abgeschlossen hast, hast du schon einen guten Einblick in die Funktionsweise von Schrittfunktionen bekommen. Wir werden in den nächsten Kapiteln noch viel mehr mit Schrittfunktionen arbeiten, aber nichts grundlegendes mehr an der Funktionsweise ändern. Wir werden aber sehen, wie wir diese Funktionsweise nutzen können, um jede Menge andere physikalische Konzepte simulieren zu können!</p>
</Layout>
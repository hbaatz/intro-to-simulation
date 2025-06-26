<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Tex from '$lib/Tex.svelte'
    import Exercise from '$lib/Exercise.svelte';
    import Icon from '$lib/Icon.svelte';
    import {Play, Check } from '@lucide/svelte';

    let currentTime = $state();

    function stopCondition(state)
    {
        if(state[0][1] < 0)
        {
            return true;
        }
        return false;
    }
</script>

<Layout 
    codeTitle={'Konstante Beschleunigung'}
    codeTemplate={
`def step(x, v, dt):
    # TODO: Aufgabe 3
    v[0] += 1.0*dt
    x[0] += v[0]*dt
    return x, v`
    }
    referenceCode={
`def step(x, v, dt):
    v[1] += -9.81*dt
    x[1] += v[1]*dt
    return x, v`
    }
    initialState={[[0, 20], [0, 0]]}
    bind:currentTime
    stopCondition={stopCondition}
    showArrows={true}
    showTicks={true}
    model={ {modelName : 'ball'} }
    readout={currentTime?.toFixed(2) + 's'}
>
    <p>
        Im letzten Level haben wir es geschafft, Pluto Schritt für Schritt mit einem Diskretisationsschritt <Tex math={"\\Delta t"}/>
        mit konstanter Geschwindigkeit in eine Richtung zu bewegen.
        Für dieses Kapitel machen wir einen Abstecher weg vom Weltraum zurück zu uns auf der Erde.
    </p>
    <p>
        Wie du weist, übt die Erde auf alle Objekte darauf eine Gravitationskraft aus. Die Gravitationskraft auf der Erdoberfläche beträgt ca. 
        <Tex math={"9.81 m / s^2"}/>. Wenn wir zum Beispiel einen Fussball aus dem 5. Stock werfen, dann fällt er nicht mit gleichmässiger 
        Geschwindigkeit Richtung Boden sondern beschleunigt sich auf dem Weg nach unten. Somit vergrössert sich die Geschwindigkeit je länger
        sich der Fussball im freien Fall befindet. 
    </p>
    <p>
        Im Editor auf der rechten Seite siehst du bereits ein Beispiel, in dem der Fussball mit einer Beschleunigung von <Tex math={"1m / s^2"}/>
        nach rechts beschleunigt wird. 
    </p>
    <Exercise title={'Geschwindigkeit und Position des Fussballes'} number={'1'}>
        Die Geschwindigkeit und die X-Koordinaten der Position des Fussballes sind zu Beginn des Levels bei <Tex math={"0"}/>.
        Was betragen die Geschwindigkeit und die Position des Fussballes nach dem ersten Schritt? Was betragen sie nach dem zehnten Schritt?
        Berechne sowohl die Geschwindigkeit und die Position des Fussballes von Hand für die ersten zehn Schritte mit einen Diskretisationsnschritt von 
        <Tex math={"\\Delta t = 0.01s"}/> und einer Beschleunigung von <Tex math={"1m / s^2"}/> in die X-Richtung wie im Beispiel. 
        Zeichne dann sowohl die Geschwindigkeit als auch die Position in der X-Richtung in ein Koordinatensystem ein wobei die X-Achse die Zeit und die 
        Y-Achse die Geschwindigkeit bzw. die Position sein soll. Was stellst du fest? Wie verändern sich die Geschwindigkeit und die Position in Abhängigkeit der Zeit?
        Überprüfe dann deine Lösungen mithilfe der Konsolenausgabe in der Simulation.
    </Exercise>
    <p>
        Deine eigentliche Aufgabe in diesem Level ist es, den Fussball, der vom 5. Stock (<Tex math={"20m"}/> über dem Boden) fallengelassen wird, zu simulieren.
        Dafür reicht es nun nicht mehr nur die Position in jedem Schritt zu aktualisieren sondern es muss auch die Geschwindigkeit aktualisiert werden.
    </p>
    <Exercise title={'Zeit bis zum Aufprall'} number={'2'}>
        Versuche von Hand zu berechnen, wie lange es dauert bis der Fussball aus dem Stillstand von <Tex math={"20m"}/> auf dem Boden aufprallt.
        Um deine Berechnungen zu vereinfachen kannst du annehmen, dass die Erdbeschleunigung <Tex math={"10 m / s^2"}/> beträgt.
    </Exercise>
    <Exercise title={'Simulation des freien Falles'} number={'3'}>
        Nun kannst du deine Berechnung der letzten Aufgabe mit Hilfe der Simulation überprüfen (verwende in der Simulation die Erdbeschleunigung von <Tex math={"9.81 m / s^2"}/>).
        Aktualisiere dazu in der Schrittfunktion zuerst die Geschwindigkeit (v)  (wie im Beispiel) bevor du wie im letzten Kapitel die Position aktualisierst.
        Die Simulation wird automatisch stoppen, sobald der Fussball den Boden erreicht hat und du kannst die Zeit, die bis dahin vergangen ist
        im Feld neben dem Play Knopf ablesen. Vergleiche das Resultat der Simulation mit deinem berechneten. Was stellst du fest?
    </Exercise>
    <p>Um das Level abzuschliessen, drücke auf den Validierungsknopf <Icon icon={Check}/> um deine Lösung mit der Musterlösung zu vergleichen.</p>
</Layout>
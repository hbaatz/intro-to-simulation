<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Tex from '$lib/Tex.svelte'
    import Exercise from '$lib/Exercise.svelte';
    import Icon from '$lib/Icon.svelte';
    import { Check } from '@lucide/svelte';

    let currentTime = $state();
</script>

<Layout
    codeTitle={'Springender Ball'}
    codeTemplate={
`def step(x, v, dt):
    v[1] += -9.81 * dt
    # TODO: Aufgabe 2 & 3
    x[1] += v[1] * dt
    return x, v`
    }
    referenceCode={
`def step(x, v, dt):
    v[1] += -9.81 * dt
    if(x[1] + v[1] * dt < 0):
      v[1] = -0.7*v[1]
    x[1] += v[1] * dt
    return x, v`
    }
    initialState={[[0, 20], [0, 0]]}
    bind:currentTime
    showArrows={true}
    showTicks={true}
    model={ {modelName : 'ball'} }
    readout={currentTime?.toFixed(2) + 's'}
>
    <p>
        Der Fussball aus der letzten Aufgabe hat sich nach dem Aufprall auf dem Boden nicht mehr bewegt so als ob er am Boden festgeklebt worden wäre.
        In der Realität verhält sich ein Fussball jedoch ganz anders. Nach dem Aufprall prallt er vom Boden ab und hüpft dann mehrmals bis er zum Stillstand kommt.
        In diesem Level möchten wir genau dieses Verhalten in unsere Simulation miteinbauen.
    </p>
    <p>
        Das Abprallen vom Boden nennt man in der Physik einen <b>elastischen Stoss</b>.
        Dabei wird die ganze kinetische Energie, welche der Ball während des freien Falles angesammelt hat in elastische Energie umgewandelt.
        Mit anderen Worten, der Ball verformt sich während des Aufprall wie eine Feder und gibt diese Energie dann wieder in Form von kinetischer Energie ab
        und fliegt in die entgegengesetzte Richtung davon.
        In unserer Simulation nehmen wir an, dass der Deformationsprozess unglaublich schnell passiert und der Ball direkt wieder mit entgegengesetzter 
        Geschwindigkeit davon fliegt.
    </p>
    <Exercise title={'Aufprall detektieren'} number={'1'}>
        Versuche herauszufinden, wie wir den Aufprall innerhalb der Simulation detektieren können.
        Welche Kondition muss <code>x[1]</code> dazu erfüllen?
    </Exercise>
    <Exercise title={'Aufprall simulieren'}  number={'2'}>
        Implementiere die Kondition der vorangehenden Aufgabe. Falls die Kondition erfüllt ist, invertiere die Geschwindigkeit <code>v</code> sodass
        der Ball in die entgegengesetzte Richtung davonfliegt. Simuliere dann deine Implementierung und sieh dir das Resultat an.
        Was sagt deine Intuition? Entspricht das Resultat der Realität?
    </Exercise>
    <p>
        Wahrscheinlich hast du bemerkt, dass der Ball im Vergleich zu Realität viel zu hoch springt.
        Der Ball erreicht nach jedem Abpraller wieder dieselbe Höhe von der er fallengelassen wurde.
        In der Realität verringert sich die Höhe nach jedem Abpraller bis der Ball auf dem Boden liegen bleibt.
    </p>
    <p>
        Unsere jetzige Implementierung entspricht in der Physik einem <b>perfekten elastischen Stoss</b>.
        In der Realität gibt es jedoch keine <b>perfekte elastische Stösse</b>. Bei jedem Aufpraller wird ein Teil der elastischen Energie
        in thermische Energie (Wärme) umgewandelt und nur ein Teil der elastischen Energie wird in kinetische Energie zurückgewandelt.
        Versuchen wir nun dieses Verhalten in unserer Simulation umzusetzen.
    </p>
    <Exercise title={'Aufprall mit Energieverlust'}  number={'3'}>
        In der letzten Aufgabe hast du die Geschwindigkeit des Balles invertiert. In der Realität geht aber immer ein Teil der kinetischen Energie
        verloren. Reduziere nun den Teil der Geschwindigkeit welche invertiert wird. Probiere verschiedene Werte aus (90%, 70%, 50%, 30%).
        Welcher Wert entspricht am ehesten deiner Intuition eines Abprallers des Fussballes auf einer asphaltierten Strasse?
        Auf einer Rasenfläche? Auf einer Wasseroberfläche?
    </Exercise>
    <p>Um das Level abzuschliessen, setze den Abprallkoefizient auf 70% und drücke auf den Validierungsknopf 
    <Icon icon={Check}/> um deine Lösung mit der Musterlösung zu vergleichen.</p>
</Layout>
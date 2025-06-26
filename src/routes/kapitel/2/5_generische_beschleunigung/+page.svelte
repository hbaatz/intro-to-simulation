<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Icon from '$lib/Icon.svelte';
    import Tex from '$lib/Tex.svelte';
    import Tip from '$lib/Tip.svelte';

    let constants = $state([[1, 0], 0.01]);
    let currentState = $state();
    let pointerDown = $state();
    let pointerPosition = $state();
    $effect(() => {
        if (pointerDown) {
            constants[0] = [pointerPosition[0] - currentState[0][0], pointerPosition[1] - currentState[0][1]];
        }
        else {
            constants[0] = [0, 0];
        }
    })
</script>

<Layout
    codeTitle={'Generische Beschleunigung'}
    codeTemplate={
`def step(x, v, a, dt):
    # TODO: Aufgabe 1
    return x, v`
    }
    referenceCode={
`def step(x, v, a, dt):
    v[0] += a[0]*dt
    v[1] += a[1]*dt
    x[0] += v[0]*dt
    x[1] += v[1]*dt
    return x, v`
    }
    initialState={[[0, 0], [0, 0]]}
    bind:constants
    bind:currentState
    bind:pointerDown
    bind:pointerPosition
    cameraFocus={[-15, 5]}
    cameraZoom={25}
    showArrows={true}
>   
    <p>
        Nachdem wir den Einfluss der Schrittkonstante genauer untersucht haben nähern wir uns dem Ende dieses Kapitels.
        In diesem Kapitel haben wir uns bisher immer auf der Erde befunden und die Beschleunigung war bisher immer konstant in die negative y-Richtung.
        Nun verlassen wir die Erde und kehren in den Weltraum zu Pluto zurück. 
        Bald werden wir uns mit der Gravitationskraft, welche die Sonne auf Pluto ausübt, beschäftigen.
        Als Vorbereitung dazu wollen wir zuerst die Beschleunigung generisch implementieren.
    </p>
    <Tip>
        Die Beschleunigung in diesem Level kannst du selbst steuern.
        Wenn du rechts klickst, dann setzt du die Beschleunigung in die Richtung des Mauszeigers.
        Die Amplitude des Beschleunigungsvektors beträgt immer der Distanz zwischen deinem Mauszeiger und Pluto.
    </Tip>
    <Exercise title={'Schrittfunktion mit generischer Beschleunigung'} number={'1'}>
        In dieser Schrittfunktion erhältst du zusätzlich zu den bekannten Parametern <Tex math={`\\vec{\\mathbf{x}}, \\vec{\\mathbf{v}}`}/> und 
        <Tex math={`\\Delta t`}/> den Beschleunigungsvektor <Tex math={`\\vec{\\mathbf{a}}`}/> als Eingabe in die Schrittfunktion.
        Vervollständige die Schrittfunktion mit der generischen Beschleunigung und teste deine Implementierung indem du mit der rechten Maustaste
        in den Weltraum klickst.
    </Exercise>
    <Exercise title={'Erste Orbits'} number={'2'}>
        Versuche den Mauszeiger an Ort und Stelle zu halten und beobachte Pluto dabei.
        Was stellst du fest? 
        Schau dir das Verhalten von verschieden grossen Orbits an.
        Inwiefern unterscheiden sich die Orbits von dieser Simulation von denjenigen der physikalischen Gravitationskraft?
    </Exercise>
</Layout>
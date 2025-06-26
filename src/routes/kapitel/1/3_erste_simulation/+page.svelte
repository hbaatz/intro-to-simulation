<script>
    import Layout from './Layout.svelte';
    import Tip from '$lib/Tip.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Code from '$lib/CodeViewer.svelte';
    import Icon from '$lib/Icon.svelte';
    import Tex from '$lib/Tex.svelte';
    import { Play, StepForward, RotateCcw } from '@lucide/svelte';

    let currentTime = $state();
</script>

<Layout
    codeTitle={'Schrittfunktion'}
    codeTemplate={
`def step(x):
    # TODO: Aufgabe 1
    x[0] = x[0] + 2
    x[1] = x[1] + 1
    return x`
    }
    referenceCode={
`def step(x):
    x[0] = x[0] + 1
    x[1] = x[1] - 0.5
    return x`
    }
    initialState={[[0, 0]]}
    constants={[]}
    bind:currentTime
    showTicks={true}
    cameraFocus={[-5, 5]}
    readout={currentTime?.toFixed(2) + 's'}
>
    <p>Auf der vorherigen Seite haben wir Pluto zum ersten mal Schritt für Schritt bewegt. Wir möchten aber natürlich nicht dauernd <Icon icon={StepForward}/> drücken müssen, um eine gleichmässige Bewegung zu simulieren. Anstatt die Schrittfunktion also immer manuell auszuführen, wollen wir dies automatisch tun. Das ist genau was der Knopf <Icon icon={Play}/> rechts macht. Er führt <code>step</code> pro Sekunde 5 mal aus.</p>

    <Exercise title={'Änderung der Geschwindigkeit'} number={'1'}>
        Mit welchem Geschwindigkeitsvektor bewegt sich Pluto, wenn du auf <Icon icon={Play}/> drückst? Passe die Schrittfunktion so an, dass Pluto sich mit einem Geschwindigkeitsvektor von <code>[5,-2.5]<Tex math='m/s'/></code> bewegt. Du kannst die Zeit, die in der Simulation abgelaufen ist im Fenster neben <Icon icon={RotateCcw}/> ablesen.
    </Exercise>

    <p>Das ist unsere erste selbständig laufende Simulation von Pluto! Sie stockt allerdings noch etwas.</p>

    <Exercise title={'Stockende Simulation'} number={'2'}>
        Weshalb bewegt sich Pluto in der Simulation nicht flüssig? Was könnte man tun, um das zu ändern?
    </Exercise>

    <p>Auf der nächsten Seite werden wir sehen, wie wir das beheben können.</p>
</Layout>
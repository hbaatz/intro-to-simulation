<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Tip from '$lib/Tip.svelte';
    import LogSlider from '$lib/LogSlider.svelte';
    import Tex from '$lib/Tex.svelte'
    import { math, display } from 'mathlifier';
    import { float } from 'three/tsl';

    let timeStep = $derived(0.1);

    const launchAngle = 60;
    const launchSpeed = 15; //m/s
    let initialState = $state([[0, 0], [launchSpeed * Math.cos(launchAngle * Math.PI / 180), launchSpeed * Math.sin(launchAngle * Math.PI / 180)]])

    let currentTime = $state();

    let referencePoints = $state([]);
    const nPoints = 1000;
    const tImpact = 2 * initialState[1][1] / 9.81;
    for(let i = 0; i < 1000; i++)
    {
        referencePoints.push([initialState[0][0] + tImpact * initialState[1][0]*i / nPoints, initialState[0][1] + tImpact * initialState[1][1]*i / nPoints - 9.81 * Math.pow(tImpact * i / nPoints, 2) / 2])
    }

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
    codeTitle={'Zeit Diskretisation'}
    codeTemplate={
`def step(x, v, dt):
    v[1] += -9.81 * dt
    x[0] += v[0] * dt
    x[1] += v[1] * dt
    return x, v`
    }
    referenceCode={
`def step(x, v, dt):
    v[1] += -9.81 * dt
    x[0] += v[0] * dt
    x[1] += v[1] * dt
    return x, v`
    }
    {initialState}
    constants={[timeStep]}
    bind:currentTime
    stopCondition={stopCondition}
    showTrace={true}
    showTicks={true}
    cameraFocus={[-5, 10]}
    model={ {modelName : 'ball'} }
    {referencePoints}
    readout={currentTime?.toFixed(2) + 's'}
>   
    <p>
        In diesem Level beschäftigen wir uns tiefer mit dem der Schrittzeitkonstante <Tex math={"\\Delta t"}/>. Was für einen Einfluss
        hat die Konstante auf das Simulationsresultat? Welcher Wert dieser Konstante gibt uns das beste Resultat?
        Für unsere Untersuchung der Schrittzeitkonstanten verwenden wir wieder den schiefen Wurf des letzten Levels.
    </p>
    <p>
        Die grüne Parabel zeigt die analytische Lösung des schiefen Wurfes (die Lösung, welche uns die physikalische Formel gibt). 
        Wir wollen nun herausfinden, wie genau unsere Simulation in Abhängigkeit der Schrittzeitkonstanten ist.
    </p>
    <Exercise title={'Schrittzeitkonstante'} number={'1'}>
        Simuliere den schiefen Wurf mit verschiedenen Schrittzeitkonstanten (Slider unterhalb dieser Aufgabe).
        Welche Schrittzeitkonstante führt zum besten Resultat? Weshalb? Was sind die Nachteile dieser Schrittzeitkonstanten?
    </Exercise>
    <LogSlider title='Zeitschritt' bind:value={timeStep} prefix='dt = ' postfix='s' fromMagnitude={-3} toMagnitude={0}/>
    <p>
        Die Wahl der Schrittzeitkonstanten hat anscheinend einen erheblichen Einfluss auf die Genauigkeit der Simulation.
        Aber was ist überhaupt der Vorteil der Simulation? Anscheinend können wir auch eine viel genauere Lösung direkt mit 
        den physikalischen Gleichungen berechnen und es erfordert erst noch viel weniger Rechenleistung.
    </p>
    <p>
        Für diese simpleren Beispiele gibt es tatsächlich analytische Lösungen, welche sowohl genauer sind und weniger Rechenaufwand benötigen, 
        jedoch wird sich das in den nächsten Levels ändern wie wir sehen werden. 
    </p>

    <Exercise title={'Knobelaufgabe: Diskretisationsfehler'} number={'2'}>
        Wie wir in diesem Level feststellen mussten, beinhaltet die Simulation immer einen gewissen Fehler aufgrund der Diskretisation.
        Aber wie gross ist dieser Fehler? Versuchen wir die analytische Lösung mit der Lösung der Simulation anhand des schiefen Wurfes zu vergleichen.
        Als Ausgangslage dient uns die Formel unserer Schrittfunktion
        <Tex display={['\\vec{\\mathbf{v}}^{i+1} = \\vec{\\mathbf{v}}^i +  \\vec{\\mathbf{g}} \\Delta t', '\\vec{\\mathbf{x}}^{i+1} = \\vec{\\mathbf{x}}^i +  \\vec{\\mathbf{v}}^i \\Delta t']}/>
        wobei 
        <Tex display={['\\vec{\\mathbf{v}}^{0} = \\vec{\\mathbf{v}}_0', '\\vec{\\mathbf{x}}^{0} = \\vec{\\mathbf{x}}_0']}/>
        Ausserdem haben wir die analytische Formel, welche die Position von <Tex math={"\\vec{\\mathbf{x}}(t)"}/> gibt:
        <Tex display={'\\vec{\\mathbf{x}}(t) = \\vec{\\mathbf{x}}_0 + \\vec{\\mathbf{v}}_0 t + \\frac{1}{2} \\vec{\\mathbf{g}} t^2'}/>
        Die Diskretisation an der Stelle <Tex math={"\\vec{\\mathbf{x}}^{i}"}/> ergibt uns also eine Approximation für die analytische Lösung an der Stelle
        <Tex math={"\\vec{\\mathbf{x}}(\\Delta t \\cdot i)"}/>.
        Versuche nun den Diskretisationsfehler zu bestimmen, also  <Tex math={"\\vec{\\mathbf{\\epsilon}} = \\lvert\\vec{\\mathbf{x}}^{i} - \\vec{\\mathbf{x}}(\\Delta t \\cdot i)\\rvert"}/>
        Dafür musst du zuerst <Tex math={"\\vec{\\mathbf{x}}^i"}/> als Funktion von <Tex math={"\\vec{\\mathbf{v}}_0"}/> und <Tex math={"\\vec{\\mathbf{x}}_0"}/> 
        umformen. Wie verhält sich der Fehler in Abhängigkeit zu <Tex math={"i"}/> und  <Tex math={"\\Delta t"}/>?
        <Tip title='Schritt 1'>
            Finde  <Tex math={"\\vec{\\mathbf{v}}^i"}/> als Funktion von  <Tex math={"\\vec{\\mathbf{v}}_0, \\vec{\\mathbf{g}}"}/> und  <Tex math={"i"}/>.
        </Tip>
        <Tip title='Schritt 2'>
            Setze <Tex math={"\\vec{\\mathbf{v}}^i"}/> in die Funktion von <Tex math={"\\vec{\\mathbf{x}}^i"}/> ein und finde <Tex math={"\\vec{\\mathbf{x}}^i"}/>
            in Abhängigkeit von <Tex math={"\\vec{\\mathbf{v}}_0, \\vec{\\mathbf{g}}, \\vec{\\mathbf{x}}_0"}/> und  <Tex math={"i"}/>.
            Hinweis: Die Gausssche Summenformel lautet <Tex math={"\\sum_{k=1}^n k = \\frac{n(n-1}/>{2}"}/>.
        </Tip>
        <Tip title='Schritt 3'>
            Berechne die Differenz <Tex math={"\\vec{\\mathbf{\\epsilon}}"}/>.
        </Tip>
    </Exercise>
</Layout>
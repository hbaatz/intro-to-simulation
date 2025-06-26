<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Tip from '$lib/Tip.svelte';
    import LogSlider from '$lib/LogSlider.svelte';
    import Tex from '$lib/Tex.svelte';

    let mass = $state(1.0);
    let initialState = $state([[0, 10], [0, 0]]);
    let currentState = $state();
    let positionHistory = $state();

    let springYCoordinates = $state(-10-0.75);
    let springYScale = $state(10-0.75);

    function onUpdateSimulation(newSimState)
    {
        springYCoordinates = -newSimState[0][1] - 0.75
        springYScale = (-(newSimState[0][1]-20) - 0.75)
    }
</script>

<Layout
    codeTitle={'Masse-Feder Simulation'}
    codeTemplate={
`def calculateSpringForce(x):
    k = 20 #kg/s^2
    x0 = [0, 10] #m
    # TODO: Aufgabe 4
    return [0, 0]

def calculateDampingForce(v):
    c = 3 #kg/m
    # TODO: Aufgabe 5
    return [0, 0]

def calculateGravityForce(m):
    g = -9.81 #m/s^2
    # TODO: Aufgabe 3
    return [0, 0]

def step(x, v, m, dt):
    Ftot  = [0, -1] #N
    # TODO: Aufgabe 1
    a = [0, 0]
    v[0] += a[0]*dt
    v[1] += a[1]*dt
    x[0] += v[0]*dt
    x[1] += v[1]*dt
    return x, v`
    }
    referenceCode={
`def calculateSpringForce(x):
    k = 20 #kg/s^2
    x0 = [0, 10] #m
    return [0, -k*(x[1]-x0[1])]

def calculateDampingForce(v):
    c = 3 #kg/m
    return [0, -c*v[1]]

def calculateGravityForce(m):
    g = -9.81 #m/s^2
    return [0, g*m]

def step(x, v, m, dt):
    Fspring = calculateSpringForce(x)
    Fdamp = calculateDampingForce(v)
    Fgrav = calculateGravityForce(m)
    Ftot  = [0, 0]
    Ftot[0] = Fspring[0] + Fdamp[0] + Fgrav[0]
    Ftot[1] = Fspring[1] + Fdamp[1] + Fgrav[1]
    a = [0, 0]
    a[0] = (Ftot[0] / m)
    a[1] = (Ftot[1] / m)
    v[0] += a[0]*dt
    v[1] += a[1]*dt
    x[0] += v[0]*dt
    x[1] += v[1]*dt
    return x, v`
    }
    bind:initialState
    constants={[mass, 0.01]}
    bind:currentState
    positionHistory={[initialState[0], currentState?.at(0)]}
    cameraFocus={[-15, 15]}
    cameraZoom={25}
    model={ {modelName : 'mass', rotation : [0, 0, 0], modelStaticRotation : [-3.1415 / 2, 3.1415 / 2, 0]}}
    additionalModels = {[
        {modelName : "spring", scale : [1, 1, 0.1], rotation : [0, 0, 0], position : [0, 0.001, 0]}
    ]}
    additionalModelParameters = {[
        {position : [0, 0, springYCoordinates], rotation : [0, 0, 0], scale : [1, 1, springYScale]}
    ]}
    {onUpdateSimulation}
    showTrace={false}
    showArrows={true}
    showTicks={true}
    labels={['x', 'v']}
>   
    <p>
        Nun ist es endlich soweit. Wir werden die erste Simulation auf einem echten Beispiel durchführen.
        Dafür werden wir nochmals einen kleinen Abstecher zurück auf die Erde machen.
        In diesem Level werden wir eine Masse von <Tex math={`10kg`}/> an einer Feder befestigen.
        Unsere Masse wird deshalb drei verschiedenen Kräften ausgesetzt: Der Gravitationskraft auf der Erde,
        der Federkraft sowie einer Dämpfungskraft. Wir werden nun Schritt für Schritt diese drei Kräfte in unserer 
        Simulation integrieren. Aber bevor wir mit der Implementierung der Kräfte starten können müssen wir die Beschleunigung berechnen, welche aus
        der Kraft resultiert. 
    </p>
    <Exercise title={'Statische Kraft'} number={'1'}>
        Deine erste Aufgabe besteht darin, die Kraft in Beschleunigung zu übersetzen.
        Damit du bereits ein erstes Ergebnis deiner Implementierung beobachten kannst, nehmen wir eine statische Kraft von <Tex math={`-1N`}/> in die y-Richtung an.
        Implementiere nun das zweite Gesetz von Newton <Tex math={`\\vec{\\mathbf{F}} = m \\vec{\\mathbf{a}}`}/> in der Funktion <code>step</code>.
    </Exercise>
    <Exercise title={'Einfluss der Masse'} number={'2'}>
        Experimentiere mit dem Slider der Masse der Kugel. Wie verändert sich die Simulation wenn du die Masse vergrösserst respektive verkleinerst?
    </Exercise>
    <LogSlider title='Masse' bind:value={mass} prefix='m = ' postfix='kg' fromMagnitude={-1} toMagnitude={2}/>
    <Exercise title={'Gravitationskraft'} number={'3'}>
        Nun, da wir die Kraft in Beschleunigung übersetzen konnten wollen wir unsere erste Kraft implementieren.
        Als erstes widmen wir uns der Gravitationskraft auf der Erde.
        Die Gravitationskraft zeigt in die negative y-Richtung und aus der Physik kennen wir auch die Formel dazu: 
        <Tex math={`\\vec{\\mathbf{F_{grav}}} = m \\vec{\\mathbf{g}}`}/>.
        Vervollständige nun die Funktion <code>calculateGravityForce</code> und setze die Gesamtkraft <Tex math={`\\vec{\\mathbf{F_{tot}}}`}/> auf die Gravitationskraft.
        Validiere dein Resultat in der Simulation. Welchen Einfluss hat die Masse nun auf das Simulationsergebnis? Weshalb?
    </Exercise>
    <p>
        Als nächstes wollen wir die Federkraft genauer unter die Lupe nehmen.
        Wie du wahrscheinlich aus der Physik weist, hat eine Feder immer einen Ruhezustand, in welchem sie weder gespannt noch komprimiert ist.
        Unsere Feder ist an der Decke einer Fabrikhalle auf <Tex math={`20m`}/> befestigt und im Ruhezustand ist sie <Tex math={`10m`}/> lang.
        Sobald wir jedoch unsere Masse an der Feder befestigen, wird sich die Feder verlängern, da das Gewicht unserer Masse die Feder nach unten drückt.
        Ausserdem hat jede Feder eine sogenannte Federkonstante. Diese gibt uns die Steifheit der Feder oder mit anderen Worten wieviel Kraft es braucht
        um die Feder zu komprimieren respektive auszudehnen. Die Federkonstante bezeichnen wir als <Tex math={`k`}/>.
        Die Federkonstante gibt uns also die benötigte Kraft, um die Feder aus dem Ruhestand heraus zu bewegen.
    </p>
    <Exercise title={'Federkraft'} number={'4'}>
        Vervollständige die Funktion <code>calculateSpringForce</code>. Die Formel für die Kraft lautet <Tex math={`\\vec{\\mathbf{F_{spring}}} = k(\\vec{\\mathbf{x_0}} - \\vec{\\mathbf{x}})`}/>.
        Vergiss nicht, die neue Kraft mit der Gravitationskraft zu addieren, denn die Gesamtkraft beträgt immer
        <Tex display={`\\vec{\\mathbf{F_{total}}} = \\sum_i \\vec{\\mathbf{F_i}} = \\vec{\\mathbf{F_{spring}}} + \\vec{\\mathbf{F_{grav}}}`}/>
        Verändere das Gewicht unserer Masse. Welchen Einfluss hat das Gewicht mit der Federkraft? Weshalb?
        Ist diese Simulation deiner Meinung nach realistisch?
    </Exercise>
    <p>
        Unsere Simulation scheint nach wie vor nicht mit der Intuition übereinzustimmen.
        Nach unserer Intuition müsste die Oszillation der Masse abnehmen und nach einer gewissen Zeit einen Ruhezustand erreichen.
        Das liegt daran, dass unsere Masse zur Zeit nicht gedämpft wird. Wir müssen also eine weitere Kraft, die Dämpfungskraft implementieren.
    </p>
    <Exercise title={'Dämpfungskraft'}  number={'5'}>
        Die Dämpfungskraft ist von der Geschwindigkeit der Masse abhängig. Je schneller sich die Masse bewegt, je stärker wird sie gedämpft.
        Die Dämpfungskraft hängt Konstanten <Tex math={`c`}/> ab. Je grösser <Tex math={`c`}/>, je stärker wird die Masse gedämpft und erlangt ihren Ruhezustand.
        Die Kraft kann mit der folgenden Formel ausgedrückt werden:
        <Tex display={`\\vec{\\mathbf{F_{damp}}} = -c\\vec{\\mathbf{v}}`}/>
        Vervollständige die letzte Kraftfunktion <code>calculateDampingForce</code> und füge sie zur Schrittfunktion hinzu.
        Verändere nochmals das Gewicht unserer Masse. Welchen Einfluss hat das Gewicht auf die gesamte Simulation? Inwiefern kannst du die Oszilationsperiode damit beeinflussen?
    </Exercise>
</Layout>
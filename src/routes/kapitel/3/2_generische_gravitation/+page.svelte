<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Tex from '$lib/Tex.svelte'
    import Exercise from '$lib/Exercise.svelte';
    import Icon from '$lib/Icon.svelte';
    import { Play } from '@lucide/svelte';
    import Tip from '$lib/Tip.svelte';
    let initialState = $state([[0, 10], [10, 0]]);
    let currentState = $state();
    let positionHistory = $state();
    let timeStep = 0.01
    let mass = 10

    let sunRotation = $state(4)

    function onUpdateScene(delta)
    {
        sunRotation -= 0.001
    }
</script>

<Layout
    codeTitle={'Generelle Gravitation'}
    codeTemplate={
`import math

def calculateGravityForce(x, m):
    # TODO: Aufgabe 4
    x_sun = [0.0, 0.0]
    m_sun = 1.5e13
    G = 6.674e-11
    # TODO: Aufgabe 1 - 3
    return [0, 0]

def step(x, v, m, dt):
    Fgrav = calculateGravityForce(x, m)
    a = [0, 0]
    a[0] = Fgrav[0] / m
    a[1] = Fgrav[1] / m
    v[0] += a[0]*dt
    v[1] += a[1]*dt
    x[0] += v[0]*dt
    x[1] += v[1]*dt
    return x, v`
    }
    referenceCode={
`import math

def calculateGravityForce(x, m):
    x_sun = [0.0, 0.0]
    m_sun = 1.5e13
    G = 6.674e-11
    r = [x_sun[0] -x[0], x_sun[1] - x[1]]
    r_squared = (r[0])**2 + (r[1])**2
    r_norm = math.sqrt(r_squared)
    r_normalized = [(r[0]) / r_norm, (r[1]) / r_norm]
    F_norm = G * m * m_sun / r_squared
    return [r_normalized[0] * F_norm, r_normalized[1] * F_norm]

def step(x, v, m, dt):
    Fgrav = calculateGravityForce(x, m)
    a = [0, 0]
    a[0] = Fgrav[0] / m
    a[1] = Fgrav[1] / m
    v[0] += a[0]*dt
    v[1] += a[1]*dt
    x[0] += v[0]*dt
    x[1] += v[1]*dt
    return x, v`}
    bind:initialState
    constants={[mass, timeStep]}
    bind:currentState
    cameraFocus={[-15, 15]}
    cameraZoom={25}
    model={ {modelName : 'planetli'} }
    showTrace={true}
    showArrows={true}
    showTicks={true}
    labels={['x', 'v']}
    additionalModels = {[
        {modelName : "sun", scale : 5, rotation : [-3.1415 / 2, 0, 0]}
    ]}
    additionalModelParameters = {[
        {position : [0, 0, 0], rotation : [0, 0, sunRotation], scale : 1}
    ]}
    onUpdateScene = {onUpdateScene}
>   
    <p>
        Nach dem Abstecher auf die Erde kehren wir wieder zum Weltraum zurück.
        Pluto befindet sich nicht im leeren Weltraum. Es gibt viele weitere Körper im Weltraum wie die Sonne, Planeten, Sterne etc.
        All diese Körper üben eine Kraft auf Pluto aus: Die Gravitationskraft.
        Dabei ist die Gravitationskraft der Sonne diejenige, welche Pluto mit Abstand am stärksten beeinflusst.
        Aus diesem Grund konzentrieren wir uns in diesem Level nur auf die Gravitationskraft der Sonne.
    </p>
    <p>
        Die Formel für die Gravitationskraft lautet
        <Tex display={`F_{grav} = G \\frac{m_1 m_2}{r^2}`}/>
        wobei <Tex math={`G = 6.674 \\cdot 10^{-11}`}/> die Gravitationskonstante ist, <Tex math={`m_1`}/> und <Tex math={`m_2`}/>
        die Massen der zwei Körper ist, welche die Gravitationskraft ausüben (in unserem Fall die Masse der Sonne respektive Pluto) und
        <Tex math={`r`}/> ist die Distanz zwischen den zwei Körpern.
    </p>
    <Exercise title={'Berechnung des Vektors von Pluto zu der Sonne'} number={'1'}>
        Um die Gravitationskraft zu berechnen, brauchen wir in einem ersten Schritt den Vektor, welcher von Pluto zur Sonne zeigt.
        Versuche in der Funktion <code>calculateGravityForce</code> den Vektor <Tex math={`\\vec{\\mathbf{r}}`}/> von Pluto zur Sonne zu berechnen.
        <Tip>
            Ein Vektor von Punkt <Tex math={`A`}/> zu Punkt <Tex math={`B`}/> berechnet man mit der Formel
            <Tex display={`\\vec{\\mathbf{v_{A \\rightarrow B}}} = \\begin{pmatrix} B_x - A_x \\\\ B_y - A_y \\end{pmatrix}`}/>
        </Tip>
    </Exercise>
    <Exercise title={'Berechnung des Vektors von Pluto zu der Sonne'} number={'2'}>
        Als nächstes müssen wir den Betrag des Vektors <Tex math={`\\vec{\\mathbf{r}}`}/> berechnen. Als kleiner Zwischenschritt 
        können wir das Quadrat <Tex math={`|\\vec{\\mathbf{r}}|^2`}/> berechnen. Benutze dafür den Satz des Pythagoras.
        <Tip>
            Die Formel für das Quadrat des Betrages eines Vektors lautet
            <Tex display={`|\\vec{\\mathbf{v}}|^2 = v_x^2 + v_y^2`}/>
        </Tip>
        Nun müssen wir nur noch die Wurzel aus dem Quardrat des Betrages <Tex math={`|\\vec{\\mathbf{r}}|^2`}/> ziehen.
        In Python kann die Wurzel mit der Funktion <code>math.sqrt(x)</code> gezogen werden.
    </Exercise>
    <Exercise title={'Berechnung der Gravitationskraft'} number={'3'}>
        Berechne nun die Gravitationskraft <Tex math={`F_{grav} = G \\frac{m_1 m_2}{r^2}`}/> mit den Resultaten der vorherigen Aufgaben.
        Dein Resultat wird nun ein Skalar sein. Da wir uns jedoch im zwei-dimensionalen Raum befinden, müssen wir die Kraft Vektorisieren.
        Aber in welche Richtung zeigt die Gravitationskraft eigentlich? Die Kraft wirkt immer in die Richtung vom angezogenen Körper (Pluto) zum kraftausübenden Körper (Sonne).
        Glücklicherweise haben wir bereits den Vektor <Tex math={`\\vec{\\mathbf{r}}`}/> ausgerechnet, welcher genau in diese Richtung zeigt.
        Jedoch beinhaltet dieser Vektor nicht nur die Richtung sondern auch die Distanz zwischen Pluto und Sonne.
        Wenn wir die Gravitationskraft direkt mit diesem Vektor multiplizieren würden, würde das die Gravitationskraft mit der Distanz multiplizieren.
        Um das zu verhindern, müssen wir zuerst den Vektor <Tex math={`\\vec{\\mathbf{r}}`}/> <b>normalisieren</b>. 
        Die <b>Normalisierung</b> setzt dabei den Betrag des Vektors auf eins (Einheitsvektor). 
        Das Berechnen des normalisierten Vektors ist grundsätzlich sehr einfach: Wir müssen lediglich beide Komponenten des Vektors (x und y) durch den Betrag des Vektors dividieren.
        Berechne nun den normalisierten Richtungsvektor  <Tex math={`\\hat{\\vec{\\mathbf{r}}} = \\frac{\\vec{\\mathbf{r}}}{|\\vec{\\mathbf{r}}|}`}/> und
        multipliziere diesen danach mit der skalaren Gravitationskraft um die gerichtete Gravitationskraft zu erhalten. 
        Starte dann die Simulation und beobachte, wie Pluto um die Sonne rotiert.
    </Exercise>
    <Exercise title={'Verschiedene Pluto Orbits'} number={'4'}>
        Mit der jetzigen Parametrisierung der Simulation kreist Pluto in einem fast perfekten Kreis um die Sonne.
        Verändere nun die Koordinaten der Sonne <code>x_sun</code> auf <code>[10, 0]</code>. Wie verändert sich der Orbit von Pluto?
        An welcher Stelle ist Pluto am schnellsten bzw. am langsamsten unterwegs? 
        Wie verhält sich seine Geschwindigkeit in Abhängigkeit zur Distanz zur Sonne?
    </Exercise>
</Layout>
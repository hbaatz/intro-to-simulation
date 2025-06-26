<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Tip from '$lib/Tip.svelte';
    import Tex from '$lib/Tex.svelte';
    import Slider from '$lib/Slider.svelte';
    
    let launchAngle = $state(25);
    const launchSpeed = 15; //m/s
    let currentState = $state();

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
    codeTitle={'Schiefer Wurf'}
    codeTemplate={
`def step(x, v, dt):
    # TODO: Aufgabe 1
    return x, v`
    }
    referenceCode={
`def step(x, v, dt):
    v[1] += -9.81 * dt
    x[0] += v[0] * dt
    x[1] += v[1] * dt
    return x, v`
    }
    initialState={[[0, 0], [launchSpeed * Math.cos(launchAngle * Math.PI / 180), launchSpeed * Math.sin(launchAngle * Math.PI / 180)]]}
    bind:currentState
    stopCondition={stopCondition}
    showArrows={true}
    showTrace={true}
    showTicks={true}
    model={ {modelName : 'ball'} }
    readout={currentState?.at(0)[0].toFixed(2) + 'm'}
>   
    <p>
        Bisher haben wir den Fussball nur aus dem Fenster geworfen. In dieser Aufgabe verwenden wir ihn nun so, für das er gemacht wurde, nähmlich zum kicken.
        Als erstes simulieren wir den Fussball, welcher in einem Winkel von <Tex math={"20°"}/> zum Boden mit einer Geschwindigkeit von <Tex math={"15 m/s"}/>
        losgekickt wird.
    </p>
    <Exercise title={'Flug des Fussballes'} number={'1'}>
        Vervollständige die Schrittfunktion sodass der Fussball fliegen kann. Du erhälst die Initialgeschwindigkeit <Tex math={"\\vec{\\mathbf{v}}"}/>
        bereits als Eingabe in die Schrittfunktion. Vergiss nicht die Geschwindigkeit zu aktualisieren - auf der Erde herscht nachwievor eine Gravitation 
        von <Tex math={"9.81 m/s^2"}/>.
    </Exercise>
    <p>
        Den Flug des Fussballes, welcher du soeben als Simulation implementiert hast nennt man in der Physik <b>Schierfer Wurf</b>.
        Eine wichtige Frage welche man sich im Sport häufig stellt ist die Wurfweite in Abhängigkeit des Wurfwinkels.
        Im schwarzen Kasten unterhalb der Programmcodeeingabe siehst du jeweils, wie weit der Fussball gefolgen ist.
    </p>
    <Exercise title={'Optimaler Wurfwinkel'} number={'2'}>
        Nun wollen wir herausfinden, mit welchem Wurfwinkel wir die Wurfdistanz maximiert werden kann.
        Versuche mit dem Slider unterhalb den Winkel anzupassen und finde den Winkel mit dem der Fussball am weitesten fliegt.
    </Exercise>
    <Slider title='Wurfwinkel' bind:value={launchAngle} min={0} max={90} step={1} postfix='°'/>
    <Exercise title={'Knobelaufgabe: Optimaler Wurfwinkel - Mathematischer Beweis'}  number={'3'}>
        Versuche deine Erkentnisse von der vorangehenden Aufgabe mathematisch zu beweisen.
        Die Formel für den schiefen Wurf lautet
        <Tex display={`\\vec{\\mathbf{x}}(t) = \\vec{\\mathbf{x_0}} + \\vec{\\mathbf{v_0}}t - \\frac{1}{2}\\vec{\\mathbf{g}}t^2
        = \\begin{pmatrix} 0 \\\\ 0\\end{pmatrix} + \\begin{pmatrix} cos(\\alpha) \\\\ sin(\\alpha)\\end{pmatrix}v_0t - \\frac{1}{2}\\begin{pmatrix} 0 \\\\ g\\end{pmatrix}t^2`}/>
        wobei <Tex math={"g = 9.81 m/s^2, v_0 = 15 m/s"}/> und <Tex math={"\\alpha"}/> der Wurfwinkel sind.
        Stimmt deine Berechnung mit dem Resultat aus der Simulation überein?
        <Tip title='Schritt 1'>
            Damit der Fussball auf dem Boden aufschlägt muss die y-Komponente des Positionsvektors <Tex math={"\\vec{\\mathbf{x}}"}/> null sein.
            Mit dieser Information kannst du die Zeit des Aufpralles <Tex math={"t_{Aufprall}"}/> in Abhängigkeit von <Tex math={"g, v_0"}/> und <Tex math={"\\alpha"}/>  berechnen.
        </Tip>
        <Tip title='Schritt 2'>
            Setze nun die Zeit des Aufpralles <Tex math={"t_{Aufprall}"}/> in die Gleichung der x-Komponenten ein.
            Nun haben wir das Problem in ein Optimierungsproblem umgeformt. Wir müssen also das <Tex math={"\\alpha"}/> finden,
            für das die x-Komponente maximiert wird.
        </Tip>
        <Tip title='Schritt 3'>
            Berechne nun die Ableitung der x-Komponente nach dem Wurfwinkel  <Tex math={"\\alpha"}/>. Um das Maximum zu finden muss die Ableitung null betragen.
        </Tip>
        <Tip title='Schritt 4'>
            Für das Auflösen der Gleichung der Ableitung hilft dir die geometrische Identität <Tex math={"sin(\\alpha)^2 + cos(\\alpha)^2 = 1"}/> (trigonometrischer Pythagoras).
        </Tip>
    </Exercise>
</Layout>
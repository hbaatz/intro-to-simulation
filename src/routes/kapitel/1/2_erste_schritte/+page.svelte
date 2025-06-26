<script>
    import Layout from './Layout.svelte';
    import Tip from '$lib/Tip.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Code from '$lib/CodeViewer.svelte';
    import Icon from '$lib/Icon.svelte';
    import { StepForward, RotateCcw, Check } from '@lucide/svelte';
</script>

<Layout
    codeTitle={'Schrittfunktion'}
    codeTemplate={
`def step(x):
    # TODO: Aufgabe 2
    x[0] = x[0] + 1
    return x`
    }
    referenceCode={
`def step(x):
    x[0] = x[0] + 2
    x[1] = x[1] + 1
    return x`
    }
    initialState={[[0, 0]]}
    constants={[]}
    validationSteps={1}
    showTicks={true}
    cameraFocus={[-5, 5]}
>
    <p>Fangen wir ganz einfach und physikalisch inkorrekt an. Wir können Pluto im XY-Weltall-Koordinatensystem bewegen, indem wir ihn Schritt für Schritt um einen kleinen Vektor verschieben.</p>

    <p>Wie du in der letzten Aufgabe bereits gesehen hast, kannst du die aktuelle Position von Pluto anzeigen, indem du auf ihn mit der Maus klickst. Anstelle der in der Physik üblichen vertikal geschriebenen Vektoren benutzen wir eine normale Python-Liste um die Position <code>x = [0.0, 0.0]</code> darzustellen, wobei das erste Element die X-Koordinate und das zweite die Y-Koordinate ist.</p>

    <p>Wie bewegen wir nun Pluto? Bei physikalischen Simulationen macht man von sogenannten <em>Schrittfunktionen</em> Gebrauch, um den alten Zustand eines Objektes auf einen neuen zu aktualisieren. In unserem Fall ist der Zustand einfach die Position <code>x</code> von Pluto. 
        
    <p>Die Schrittfunktion <code>step</code> im rechten Fenster nimmt die alte Position <code>x</code> als Argument, berechnet dann die aktualisierte Position im Körper der Funktion indem sie zur X-koordinate <code>1</code> addiert, und gibt die neue Position am Ende zurück.</p> 
    
    <p>Der Knopf <Icon icon={StepForward}/> führt die Schrittfunktion einmal aus und aktualisiert mit dem Rückgabewert die Position von Pluto.</p>

    <Exercise title={'Codeinterpretation'} number={'1'}>
        Führe die Funktion ein paar mal aus, und beschreibe in deinen eigenen Worten, wie sich Pluto bewegt.<br/>

        Du kannst <Icon icon={RotateCcw}/> benutzen, um Pluto zum Ursprungszustand zurückzusetzen.
    </Exercise>
    
    <p>So weit so gut. Nun ist es deine Aufgabe, die Bewegung zu verändern:</p>

    <Exercise title={'Schritt für Schritt'} number={'2'}>
        Passe den Code im rechten Fenster so an, dass Pluto sich in jedem Schritt neu um den Vektor <code>[2,1]</code> bewegt. 
        Drücke dann auf <Icon icon={StepForward}/> um deine Implementation zu testen.<br/>
 
        Wenn du sicher bist, das sie richtig funktioniert, drücke auf <Icon icon={Check}/>, um zu überprüfen, ob deine Implementierung mit der Lösung übereinstimmt.
    </Exercise>

    <Exercise title={'Geschwindigkeit'} number={'3'}>
        Wenn du <Icon icon={StepForward}/> fünf mal pro Sekunde drückst, mit welchem Geschwindigkeitsvektor bewegt sich Pluto dann?
    </Exercise>

    <p>Hat alles geklappt? Dann auf zum nächsten Level!</p>
</Layout>
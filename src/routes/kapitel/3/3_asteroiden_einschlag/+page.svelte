<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Tex from '$lib/Tex.svelte'
    import Exercise from '$lib/Exercise.svelte';
    import Icon from '$lib/Icon.svelte';
    import { Play } from '@lucide/svelte';
    import Tip from '$lib/Tip.svelte';
    let initialState = $state([[-20, 10], [10, 0]]);
    let currentState = $state();
    let positionHistory = $state();
    let timeStep = 0.01
    let mass = 10
    let earthRotation = $state(4)

    function onUpdateScene(delta)
    {
        earthRotation -= 0.001
    }

    function stopCondition(state)
    {
        let norm = Math.sqrt(state[0][0]**2 + state[0][1]**2)
        if(norm < 5)
        {
            return true;
        }
        return false;
    }
</script>

<Layout 
    title={'Level ?: Asteroiden Einschlag'}
    codeTitle={'Asteroiden Einschlag'}
    codeTemplate={
`import math

def getAirDensity(x):
    atmposhere_height = 10 #m
    earth_radius = 5 #m
    x_sun = [0.0, 0.0]
    # TODO: Aufgabe 3 & 4
    rho_0 = 1.2 #kg/m^3 (air density at see level)
    k2 = 4.2441
    return rho_0

def calculateDragForce(x, v):
    rho = getAirDensity(x) #kg/m^3
    Cd = 0.47 #Drag coefficent for a sphere
    # TODO: Aufgabe 1
    A = 0.0 #m^2 (Cross sectional area of body)
    # TODO: Aufgabe 2
    return [0, 0]

def calculateGravityForce(x, m):
    x_sun = [0.0, 0.0]
    m_sun = 1.5e13
    G = 6.674e-11
    r = [x_sun[0] -x[0], x_sun[1] - x[1]]
    r_squared = r[0]**2 + r[1]**2
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
    return x, v`
    }
    referenceCode={
`import math

def getAirDensity(x):
  atmposhere_height = 10 #m
  earth_radius = 5 #m
  rho_0 = 1.2 #kg/m^3 (air density at see level)
  k2 = 4.2441
  x_sun = [0.0, 0.0]
  r = [x_sun[0] -x[0], x_sun[1] - x[1]]
  r_squared = (r[0])**2 + (r[1])**2
  r_norm = math.sqrt(r_squared)
  if( r_norm >= earth_radius + atmposhere_height ):
    return 0.0
  return rho_0 * (1 - (r_norm-earth_radius) / atmposhere_height)**k2

def calculateDragForce(x, v):
  rho = getAirDensity(x)
  #rho = 1.2 #kg/m^3 (air density at see level)
  Cd = 0.47 #Drag coefficent for a sphere
  A = 0.5**2 * 3.1415 #Cross sectional area
  v_squared = v[0]**2 + v[1]**2
  v_norm = math.sqrt(v_squared)
  v_normalized = [v[0] / v_norm, v[1] / v_norm]
  Fd = 1/2 * rho * v_squared * Cd * A
  return [-Fd * v_normalized[0], -Fd * v_normalized[1]]

def calculateGravityForce(x, m):
    x_sun = [0.0, 0.0]
    m_sun = 1.5e13
    G = 6.674e-11
    r = [x_sun[0] -x[0], x_sun[1] - x[1]]
    r_squared = r[0]**2 + r[1]**2
    r_norm = math.sqrt(r_squared)
    r_normalized = [(r[0]) / r_norm, (r[1]) / r_norm]
    F_norm = G * m * m_sun / r_squared
    return [r_normalized[0] * F_norm, r_normalized[1] * F_norm]

def step(x, v, m, dt):
    Fgrav = calculateGravityForce(x, m)
    Fdrag = calculateDragForce(x, v)
    Ftot = [0, 0]
    Ftot[0] = Fgrav[0] + Fdrag[0]
    Ftot[1] = Fgrav[1] + Fdrag[1]
    a = [0, 0]
    a[0] = Ftot[0] / m
    a[1] = Ftot[1] / m
    v[0] += a[0]*dt
    v[1] += a[1]*dt
    x[0] += v[0]*dt
    x[1] += v[1]*dt
    return x, v`
    }
    bind:initialState
    constants={[mass, timeStep]}
    bind:currentState
    cameraFocus={[-22, 16]}
    cameraZoom={25}
    model={{modelName : 'asteroid'}}
    showTrace={true}
    showArrows={true}
    showTicks={true}
    stopCondition={stopCondition}
    additionalModels = {[
        {modelName : "earth", scale : 5, rotation : [-3.1415 / 2, 0, 0]}
    ]}
    additionalModelParameters = {[
        {position : [0, 0, 0], rotation : [0, 0, earthRotation], scale : 1}
    ]}
    onUpdateScene = {onUpdateScene}
    prevPage={'/Levels/Chapter3/GeneralGravity'}
    nextPage={null}
    labels={['x', 'v']}
>   
    <p>
        Ein Asteroid nähert sich der Erde. Wir wollen in diesem Level herausfinden, wo der Asteroid auf der Erde einschlagen wird.
        Dafür wird die Gravitationskraft, welche wir in der letzten Aufgabe berechnet haben nützlich sein.
        Jedoch reicht die Gravitationskraft alleine noch nicht aus.
        Die Erde besitzt eine Atmosphere und die Partikel in der Atmosphere üben eine Luftwiderstandskraft auf den 
        Asteroiden aus, welche den Asteroiden zusätzlich abbremst.
    </p>
    <p>
        Die Formel für die Luftwiderstandskraft lautet
        <Tex display={`F_{drag} = -\\frac{1}{2} \\rho |\\vec{\\mathbf{v}}|^2 C_D A`}/>
        wobei <Tex math={`\\rho`}/> die Dichte des Mediums ist (in unserem Fall die Luft in der Atmosphere).
        Die Dichte wird in <Tex math={`\\frac{kg}{m^3}`}/> gemessen, also die Masse von Luft in einem Kubikmeter.
        <Tex math={`\\vec{\\mathbf{v}}`}/> ist die Geschwindigkeit des Asteroiden und <Tex math={`C_D`}/> ist der Luftwiderstandskoeffizient.
        Der Luftwiderstandskoeffizient <Tex math={`C_D`}/> beschreibt dabei, wie aerodynamisch eine bestimmte geometrische Form ist.
        Der Luftwiderstandskoeffizient einer perfekten Sphere liegt bei <Tex math={`0.47`}/> und es ist derjenige, welchen wir 
        für den Asteroiden annehmen. Im Gegensatz liegt z.B. der Luftwiderstandskoeffizient eines Flugzeugflügels bei lediglich <Tex math={`0.04`}/>.
        Zu guter Letzt ist <Tex math={`A`}/> die Querschnittsfläche des Asteroiden. Da wir annehmen, dass der Asteroid eine perfekte Sphäre ist, 
        ist die Querschnittsfläche ein perfekter Kreis.
    </p>
    <Exercise title={'Querschnittsfläche'} number={'1'}>
        Berechne zuerst die Querschnittsfläche des Asteroiden innerhalb der Funktion <code>calculateDragForce</code>.
        Der Radius des Asteroiden beträgt <Tex math={`0.5m`}/>.
    </Exercise>
    <Exercise title={'Luftwiderstandskraft'} number={'2'}>
        Berechne als nächstes die Luftwiderstandskraft mithilfe der Formel von oben.
        Die Luftwiderstandskraft ist dabei immer in die entgegengesetzte Richtung des Geschwindigkeitsvektors gerichtet.
        Nutze dazu dasselbe Prinzip wie bei der Gravitationskraft um den Betrag und die Richtung des Geschwindigkeitsvektors zu isolieren.
    </Exercise>
    <p>
        Bisher haben wir angenommen, dass die Atmosphäre der Erde im ganzen Weltraum überall genau gleich gross ist.
        In der Realität ist das jedoch nicht der Fall und die Atmosphäre ist auf der Erdoberfläche auf Meeresebene am höchsten.
        Sobald man einen höheren Berg besteigt, nimmt die Dichte der Atmosphäre ab. Das kennt man im Alltag aus zwei verschiedenen Phänomenen.
        Zum einen Teil nimmt durch die abnehmende Dichte auch die Dichte des Sauerstoffes ab und deshalb haben die meisten Extremsportler, welche
        Berge wie der Everest besteigen zusätzliche Sauerstoffflaschen dabei. Zum anderen Teil nimmt auch der Siedepunkt von Wasser ab, je 
        höher man in die Berge geht. Deshalb muss man dann auch Teigwaren und Gemüse länger kochen.
    </p>
    <p>
        Die Dichte der Atmosphäre lässt sich mit dieser Formel als Funktion der Höhe über der Erdatmosphäre approximieren
        <Tex display={`\\rho (h) = \\rho_0 (1 - \\frac{r_e - h}{h_{a}})^{k_2}`}/>
        , wobei <Tex math={`r_e`}/> der Radius der Erde ist, <Tex math={`h`}/> der Abstand zwischen dem Mittelpunkt der Erde und des Asteroiden ist
        und <Tex math={`h_a`}/> die Höhe der Atmosphäre gemessen von der Erdatmosphäre ist.
        <Tex math={`k_2`}/> ist dabei eine Konstante, welche den Abfall der Atmosphärendichte bestimmt.
    </p>
    <Exercise title={'Rand der Atmosphäre'} number={'3'}>
        Ausserhalb der Atmosphäre nehmen wir an, dass sich der Asteroid ungestoppt fortbewegen kann.
        Verändere die Funktion <code>getAirDensity</code> so, dass die Funktion eine Kraft von Null zurückgibt, falls sich der Asteroid ausserhalb
        der Atmosphäre befindet (also <Tex math={`h > h_a + r_e`}/>).
    </Exercise>
    <Exercise title={'Variable Atmosphärendichte'} number={'4'}>
        Versuche nun als nächstes die Formel der Atmosphärendichte von oben zu implementieren. 
        Die Atmosphäre ist am dichtesten, wenn der Asteroid sich direkt auf der Erdoberfläche befindet und nimmt exponentiell ab je weiter 
        er sich von der Erdatmosphäre entfernt befindet. Welchen Einfluss hat die verbesserte Approximation der Erdatmosphäre auf die Simulation?
    </Exercise>
</Layout>
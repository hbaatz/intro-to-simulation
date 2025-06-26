<script>
    import Layout from '$lib/SplitLayout.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Tip from '$lib/Tip.svelte';
    import Code from '$lib/CodeViewer.svelte';
    import LogSlider from '$lib/LogSlider.svelte';
    import Tex from '$lib/Tex.svelte';
    import { EyeOff } from '@lucide/svelte';

    let timeStep = $state(0.05);
    let currentTime = $state();
</script>

<Layout
    prevPage={'/'}
    codeTitle={'Schrittfunktion'}
    codeTemplate={
`def step(y_0, v_0, a, dt):
    v_1 = [0,0]
    v_1[0] = v_0[0] + a[0] * dt
    v_1[1] = v_0[1] + a[1] * dt
        
    y_1 = [0,0]
    y_1[0] = y_0[0] + v_1[0] * dt
    y_1[1] = y_0[1] + v_1[1] * dt

    return y_1, v_1, a`
    }
    referenceCode={
`def step(y_0, v_0, a, dt):
    v_1 = [0,0]
    v_1[0] = v_0[0] + a[0] * dt
    v_1[1] = v_0[1] + a[1] * dt
        
    y_1 = [0,0]
    y_1[0] = y_0[0] + v_1[0] * dt
    y_1[1] = y_0[1] + v_1[1] * dt

    return y_1, v_1, a`
        }
    initialState={[[0, 0], [5, 10], [0, -5]]}
    constants={[timeStep]}
    bind:currentTime
    showArrows={true}
    cameraFocus={[-5, 10]}
    readout={currentTime?.toFixed(2) + 's'}
>
    <p>Example for latex-like display math rendering:</p>
    <Tex display={`f(x) = x^2 + \\frac{1}{x}`}/>
    <p>Inline math looks like this: <Tex math={`f(x) = x^2 + \\frac{1}{x}`}/></p>
    <p>A changable parameter works like this:</p>
    <LogSlider title='Zeitschritt' bind:value={timeStep} prefix='dt = ' postfix='s', fromMagnitude={-3} toMagnitude={0}/>
    <p>An exercise box looks like this:</p>
    <Exercise number={1} title={'Title'}>
        Difficult exercise.
    </Exercise>
    <p>A tip box looks like this:</p>
    <Tip>
        Collapse this box by clicking on <EyeOff size=14 style='margin-bottom: -1px'/>.
    </Tip>
    <p>A code box looks like this:</p>    
    <Code title='Test Code' code={`def test():
    # Increadibly useful test code
    pass`}/>
</Layout>
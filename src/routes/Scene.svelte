<script>
    import { base } from '$app/paths';
    import { T, useTask } from '@threlte/core'
    import { interactivity, OrbitControls, GLTF, useDraco, Grid } from '@threlte/extras'
    import { MeshBasicMaterial } from 'three'
    import { Spring } from 'svelte/motion'
    import { goto } from '$app/navigation';
    import { Clock10 } from '@lucide/svelte';
    import { math } from 'mathlifier';

    let { link, scale=$bindable() } = $props()
    
    interactivity();
    scale = new Spring(1);

    let rotation = $state(4);
    useTask((delta) => {
        rotation += delta * 0.5;
    })

    const dracoLoader = useDraco();

    let clicked = $state(false);
</script>

<T.AmbientLight 
    intensity={2}
/>

<T.DirectionalLight
    position={[10, 10, 10]}
    intensity={3}
/>

<Grid 
    cellColor="#333344"
    sectionColor="#2255aa"
    sectionThickness={1}
    gridSize={20}
    cellSize={0.5}
    sectionSize={2.5}
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -1]}
/>

<T.Group
    position={[0, 0, 0]}
    scale={scale.current}
    rotation={[0, rotation, 0]}
    onpointerenter={(event) => {
        if (!clicked) scale.target = 1.15
        event.stopPropagation();
    }}
    onpointerleave={(event) => {
        if (!clicked) scale.target = 1
        event.stopPropagation();
    }}
    onclick={(event) => {
        scale.target = 0
        clicked = true
        window.setTimeout(() => {
            goto(link)
        }, 500)
        event.stopPropagation();
    }}
>
    <GLTF
        url={base + '/models/planetli.glb'}
        dracoLoader={dracoLoader}
        rotation={[0.5, 3.14, 0]}
        scale={1.5}
    />
</T.Group>

<T.Group
    rotation.z={-0.2}
>
    <T.Group
        rotation.y={rotation * 1.5}
    >
        <GLTF
            url={base + '/models/asteroid.glb'}
            dracoLoader={dracoLoader}
            scale={Math.min(1, scale.current) * 0.35}
            rotation.z={rotation}
            position={[0, 0, -2.06]}
        />
    </T.Group>
</T.Group>
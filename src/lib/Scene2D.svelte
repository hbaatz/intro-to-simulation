<script>
    import { base } from '$app/paths';
    import { T, useTask, useThrelte } from '@threlte/core'
    import { interactivity, Grid, OrbitControls, MeshLineGeometry, MeshLineMaterial, Text, GLTF, useDraco } from '@threlte/extras'
    import { Controls, OrthographicCamera, Vector3 } from 'three'
    import { Spring } from 'svelte/motion'
    import { MOUSE } from 'three'
    import Arrows from '$lib/Arrows.svelte'
    import FlatShader from '$lib/flatFragment.glsl?raw'
    
    let {
        points = [],
        directions = [],
        labels = ['x'],
        referencePoints = null,
        showTrace = false,
        showArrows = false,
        showTicks = false,
        cameraFocus = [0, 0],
        cameraZoom = 50,
        model = { modelName : 'planetli' },
        additionalModels = [],
        additionalModelParameters = [],
        onUpdateScene = null,
        pointerDown = $bindable(),
        pointerPosition = $bindable()
    } = $props()

    const eps = 0.01;

    // Convert from 2D coordinates to three.js Vector3 with inverted z-axis
    function point2DToVector3(point) {
        return new Vector3(point[0], eps, -point[1])
    }
    function array2DToVector3(array2D) {
        return array2D.map(point2DToVector3);
    }

    function hexToRgb(hex) {
        var bigint = 0;
        if (hex.startsWith('#')) {
            bigint = parseInt(hex.slice(1), 16);
        } else {
            bigint = parseInt(hex, 16);
        }
        return [(bigint >> 16 & 255) / 255, (bigint >> 8 & 255) / 255, (bigint & 255) / 255];
    }

    let position = $derived(point2DToVector3(points.at(-1)));
    const pointsBufferSize = 300;
    let points3D = $derived(showTrace ? array2DToVector3(points.slice(-pointsBufferSize).concat(Array(Math.max(pointsBufferSize - points.length, 0)).fill(points.at(-1)))) : []);
    let directions3D = $derived(array2DToVector3(directions));
    
    const nTicks = 10;
    const ticks = [...Array(2 * nTicks + 1).keys()].map(i => (i - nTicks) * 5);

    const camera = new OrthographicCamera();

    const dracoLoader = useDraco();

    interactivity();
    let zoom = $state(cameraZoom);
    const overlayTransition = new Spring(0);
    let overlayLocked = false;
    const traceColor = model.modelName == 'planetli' ? '#9c83df' : '#eeeeee';
    pointerDown = false;

    let rotation = $state(4);
    useTask((delta) => {
        rotation += delta * 0.5;
        if (onUpdateScene) onUpdateScene(delta);
    })
</script>

<T
    is={camera}
    position={[cameraFocus[0], 20, -cameraFocus[1]]}
    zoom={cameraZoom}
    oncreate={(ref) => {
      ref.up = new Vector3(0, 0, -1)
      ref.lookAt(cameraFocus[0], 0, -cameraFocus[1])
    }}
    makeDefault
>
    <OrbitControls
        target={[cameraFocus[0], 0, -cameraFocus[1]]}
        enableRotate={false}
        mouseButtons = {{
            LEFT: MOUSE.PAN,
            MIDDLE: null,
            RIGHT: null
        }}
        onchange={() => {
            zoom = camera.zoom
        }}
    />
</T>

<T.AmbientLight 
    intensity={2}
/>

<T.DirectionalLight
    position={[10, 20, -10]}
    intensity={3}
/>

<Grid 
    cellColor="#333344"
    sectionColor="#2255aa"
    sectionThickness={1}
    gridSize={nTicks * 10}
    cellSize={1}
    sectionSize={5}
/>

{#snippet tickLabel(tick, position)}
    <Text 
        text={tick}
        position={position}
        color="#2255aa"
        fontSize={15 / zoom}
        rotation={[-Math.PI/2, 0, 0]}
    />
{/snippet}
{#if showTicks}
    {#each ticks as tick}
        {@render tickLabel(tick, [tick + 0.1, eps, 0])}
        {#if tick != 0}       
            {@render tickLabel(tick, [0.1, eps, -tick])}
        {/if}
    {/each}
{/if}

<T.Group
    position={position.toArray()}
    scale={overlayTransition.current + 1}
    rotation={model.rotation || [0, 0.4, -rotation]}
    onpointerenter={(event) => {
        overlayTransition.target = 1;
        event.stopPropagation();
    }}
    onpointerleave={(event) => {
        if (!overlayLocked) {
            overlayTransition.target = 0;
        }
        else {
            overlayTransition.target = 1;
        }
        event.stopPropagation();
    }}
    onpointerdown={(event) => {
        overlayLocked = !overlayLocked;
        overlayTransition.target = 1.1;
        event.stopPropagation();
    }}
    onpointerup={(event) => {
        if (!overlayLocked) {
            overlayTransition.target = 0;
        }
        else {
            overlayTransition.target = 1;
        }
        event.stopPropagation();
    }}
>
    <GLTF
        url={base + `/models/${model.modelName}.glb`}
        dracoLoader={dracoLoader}
        rotation={model.modelStaticRotation || [-1.1, 3.14, 0]}
        scale={model.modelStaticScale || 0.5}
    />
</T.Group>

{#each additionalModels as additionalModel, i}
    <T.Group
        position={ additionalModelParameters.length < i + 1 ? [0, 0, 0] : additionalModelParameters[i].position }
        scale={ additionalModelParameters.length < i + 1 ? 1 : additionalModelParameters[i].scale}
        rotation={additionalModelParameters.length < i + 1 ? [0, 0, -rotation] : additionalModelParameters[i].rotation}
    >
    <GLTF
        position = { additionalModel.position || [0, 0, 0]}
        url={base + `/models/${additionalModel.modelName}.glb`}
        scale={additionalModel.scale}
        dracoLoader={dracoLoader}
        rotation={additionalModel.rotation}
    />
    </T.Group>
{/each}

{#snippet overlay(value, pos, color, alpha=1, prefix='', offset=1.2)}
    <Text 
        text={prefix + (Array.isArray(value) ? `[${value.map(v => v.toFixed(1)).join(', ')}]` : value)}
        position={[pos[0] + offset * overlayTransition.current, eps * 5, pos[2]]}
        fontSize={17 / zoom * overlayTransition.current}
        rotation={[-Math.PI/2, 0, 0]}
        anchorY='top'
    >
        <T.ShaderMaterial 
            uniforms={{ color: { value: hexToRgb(color) }, alpha: { value: 0 } }}
            uniforms.alpha.value={alpha}
            fragmentShader={FlatShader} 
        />
    </Text>
{/snippet}
{#if overlayTransition.current > 0}
    {@const pos = position.toArray()}
    {@render overlay([pos[0], -pos[2]], pos, traceColor, 1, labels[0] + ' = ')}
{/if}

{#if showTrace}
    <T.Mesh>
        <MeshLineGeometry points={points3D} />
        <MeshLineMaterial
            width={0.003}
            color={traceColor}
        />
    </T.Mesh>
{/if}

{#if referencePoints}
    <T.Mesh>
        <MeshLineGeometry points={array2DToVector3(referencePoints)} />
        <MeshLineMaterial
            width={0.003}
            color={'#3ba843'}
        />
    </T.Mesh>
{/if}

{#if showArrows}
    <Arrows
        origin={position}
        {zoom}
        {overlay}
        {overlayTransition}
        directions={directions3D}
        labels={labels.slice(1)}
        visible={showArrows}
    />
{/if}

<T.Mesh
  visible={false}
  onpointermove={(event) => {
    pointerPosition = [event.point.x, -event.point.z]
  }}
  onpointerdown={() => {
    pointerDown = true
  }}
  onpointerup={() => {
    pointerDown = false
  }}
  position.y={-0.1}
  rotation.x={-Math.PI/2}
  scale={100}
>
  <T.PlaneGeometry />
</T.Mesh>
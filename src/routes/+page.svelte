<script>
    import { base } from '$app/paths';
    import { Canvas } from '@threlte/core';
    import Scene from './Scene.svelte';

    let scale = $state();
</script>

<div class="title">
    Physikalische Simulationen von Newtonscher Mechanik
</div>
<div class="floatingText">
    Los gehts!
</div>
<div class="sceneView">
    <Canvas>
        <Scene link={base + '/kapitel/1/1_hello_space'} {scale}/>
    </Canvas>
</div>

<link href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" rel="stylesheet">

<style>
    .title {
        justify-content: center;
        padding-top: 10vh;
        width: 100%;
        font-family: 'Boldonse', sans-serif;
        font-size: 2em;
        text-transform: uppercase;
        text-align: center;
        color: #ffffff;
    }

    .floatingText {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        font-family: 'Boldonse', sans-serif;
        font-size: 1.5em;
        text-transform: uppercase;
        text-align: center;
        color: #1a1f24;
    }

    .sceneView {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: #1a1f24;
    }
</style>
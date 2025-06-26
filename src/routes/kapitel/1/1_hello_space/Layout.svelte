<script>
    import { Canvas } from '@threlte/core';
    import Scene from '$lib/Scene2D.svelte';
    import Button from '$lib/Button.svelte';
    import Menu from '$lib/Menu.svelte';

    let {
        children
    } = $props();
</script>

<div class="contentBox">
    <div class="textBox">
        <div class="textHeader">
            <Menu />
        </div>
        <div class="textBody">
            {@render children()}
        </div>
    </div>
</div>
<div class="sceneView">
    <Canvas>
        <Scene points={[[0,0]]} cameraFocus={[-4, 0]} cameraZoom={80}/>
    </Canvas>
</div>

<style>
    .contentBox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
    }

    .sceneView {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: #1a1f24;
    }

    .textBox {
        position: absolute;
        top: 14px;
        left: 14px;
        width: calc(50% - 14px);
        max-height: calc(100% - 28px);
        background: white;
        color: #282c34;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 10px 5px rgb(0 0 0 / 0.15);
        z-index: 1;
        border-radius: 7px;
    }

    .textHeader {
        padding: 20px 29px 8px 29px;
        overflow: visible;
    }

    .textBody {
        font-family: 'Abel', sans-serif;
        padding: 0px 29px 7px 29px;
        overflow-y: auto;
    }
</style>
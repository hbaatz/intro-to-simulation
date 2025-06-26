<script>
    import { Canvas } from '@threlte/core';
    import Simulation from './Simulation.svelte';
    import Scene from '$lib/Scene2D.svelte';
    import Button from '$lib/Button.svelte';
    import CodeEditor from '$lib/CodeEditor.svelte';
    import CodeEval from '$lib/CodeEval.svelte';
    import Validation from '$lib/Validation.svelte';
    import Readout from '$lib/Readout.svelte';
    import Menu from '$lib/Menu.svelte';
    import { MousePointer, Waypoints, Spline, ArrowUp10 } from '@lucide/svelte';

    let {
        // Content
        children,
        // Code config
        codeTitle,
        codeTemplate,
        referenceCode = null,
        // Validation config
        validationSteps = 100,
        // Simulation state
        initialState = [[0, 0]],
        constants = [0.01],
        currentState = $bindable(),
        // Scene config
        showTicks = false,
        target = null,
        cameraFocus = [-15, 13],
        cameraZoom = 25
    } = $props();

    // State that is not passed up
    let stepFuncCode = $state();
    let stepFunc = $state();
    let referenceFunc = $state();
    let errorMsg = $state();
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
    <div class="simulationBox">
        <div class="codeBox">
            <CodeEditor title={codeTitle} {codeTemplate} bind:stepFuncCode/>
            <CodeEval {stepFuncCode} {referenceCode} {currentState} {constants} bind:stepFunc bind:referenceFunc bind:errorMsg/>
        </div>
        <div class="spacer"></div>
        <div class="simControls">
            <div style="display: flex;">
                <div class="buttonGroup">
                    <Simulation {stepFunc} {initialState} {constants} bind:currentState active={!errorMsg}/>
                </div>
                {#if referenceCode}            
                    <div class="spacer"></div>           
                    <div class="buttonGroup">
                        <Validation {stepFunc} {referenceFunc} {initialState} {constants} active={!errorMsg}/>
                    </div>
                {/if}
            </div>
            <div class="spacer"></div>
            <div class="buttonGroup">
                <Button icon={ArrowUp10} bind:value={showTicks}/>
            </div>
        </div>
    </div>
</div>
<div class="sceneView">
    <Canvas>
        <Scene points={currentState} {showTicks} {target} {cameraFocus} {cameraZoom}/>
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

    .simulationBox {
        position: absolute;
        left: calc(50%);
        width: calc(50% - 28px);
        z-index: 1;
        padding: 14px 14px 0 14px;
        min-width: 357px;
    }

    .codeBox {
        border-radius: 7px;
        box-shadow: 0px 0px 10px 5px rgb(0 0 0 / 0.15);
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

    .simControls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .buttonGroup {
        display: flex;
        background: #282c34;
        box-shadow: 0px 0px 10px 5px rgb(0 0 0 / 0.15);
        border-radius: 7px;
        overflow: hidden;
    }

    .spacer {
        min-width: 7px;
        min-height: 7px;
    }
</style>
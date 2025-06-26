<script>
    import { untrack } from 'svelte';
    import Button from '$lib/Button.svelte';
    import { Play, Pause, Rabbit, Turtle, StepForward, SkipForward, RotateCcw } from '@lucide/svelte';

    let {
        stepFunc,
        initialState,
        constants,
        currentState = $bindable(),
        positionHistory = $bindable(),
        currentTime = $bindable(),
        stopAtZero = false,
        active=true
    } = $props()

    let timeStep = $derived(constants.at(-1));
    currentState = initialState;
    positionHistory = [initialState[0]];
    currentTime = 0;

    let interval = $derived(timeStep * 1000);
    let playbackFactor = $state(1);
    let timer = $state(0);
    let isPlaying = $state(false);
    
    function step() {
        if (stopAtZero && currentState[0][1] < 0)
        {
            isPlaying = false;
            clearInterval(timer);
            return;
        }
        currentState = stepFunc(currentState, constants);
        positionHistory.push(currentState[0]);
        currentTime += timeStep;
    }

    function play() { 
        timer = setInterval(() => {
            step();
        }, interval / playbackFactor);
        isPlaying = true;
    }

    function pause() {
        clearInterval(timer);
        isPlaying = false;
    }

    function resetState() {
        pause();
        currentState = initialState;
        positionHistory = [initialState[0]];
        currentTime = 0;
    }

    const normalSpeed = 1;
    const slowSpeed = 0.1;
    function setPlaybackSpeed(factor=1) {
        playbackFactor = factor;
        if (isPlaying) {
            pause();
            play();
        }
    }

    $effect(() => {
        if (!active) {
            pause();
        }
    })

    $effect(() => {
        if (initialState && timeStep) untrack(resetState);
    })
</script>

<Button icon={Play} iconOff={Pause} background='#ffa000' backgroundOff='#ffa000' value={!isPlaying} onclick={play} onclickOff={pause} {active}/>
<Button icon={StepForward} background='#ffa000' onclick={step} {active}/>
<Button icon={RotateCcw} background='#f44336' onclick={resetState}/>
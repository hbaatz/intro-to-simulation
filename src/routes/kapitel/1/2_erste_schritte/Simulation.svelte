<script>
    import Button from '$lib/Button.svelte';
    import { StepForward, RotateCcw } from '@lucide/svelte';

    let {
        stepFunc,
        initialState,
        constants,
        currentState = $bindable(),
        active=true
    } = $props()

    currentState = initialState;
    
    function step() {
        currentState = stepFunc(currentState, constants);
    }

    function resetState() {
        currentState = initialState;
    }
</script>

<Button icon={StepForward} background='#ffa000' onclick={step} {active}/>
<Button icon={RotateCcw} background='#f44336' onclick={resetState} {active}/>
<script>
    import { untrack } from 'svelte'
    import Button from '$lib/Button.svelte';
    import { Check, CheckCheck, X, Spline } from '@lucide/svelte';
    import { compute } from 'three/tsl';

    let {
        stepFunc,
        referenceFunc,
        initialState,
        constants,
        validationSteps = 100,
        active = true
    } = $props();

    let validationResult = $state(null);

    function validate() {
        const eps = 1e-5;
        let referenceState = initialState;
        let validationState = initialState;

        for (let i = 0; i < validationSteps; i++) {
            referenceState = referenceFunc(referenceState, constants);
            validationState = stepFunc(validationState, constants, false);
            
            if (Math.abs(referenceState[0][0] - validationState[0][0]) > eps || Math.abs(referenceState[0][1] - validationState[0][1]) > eps) {
                validationResult = false;
                return;
            }
        }

        validationResult = true;
    }

    $effect(() => {
        if (stepFunc) {
            validationResult = null;
        }
    });
</script>

<Button iconOff={Check} icon={validationResult ? CheckCheck : X} background={validationResult ? '#3ba843' : '#f44336'} backgroundOff='#282c34' onclick={validate} value={validationResult != null} {active}/>
<script>
	import { onMount, untrack } from 'svelte';

    let {
        stepFuncCode,
        referenceCode,
        currentState,
        constants,
        stepFunc = $bindable(),
        referenceFunc = $bindable(),
        errorMsg = $bindable()
    } = $props();

    let pyodide;
    let pyodideReady = $state(false);
    let stdoutCache = $state('');

    onMount(async () => {
        try {
            pyodide = await loadPyodide();
            pyodideReady = true;

            if (referenceCode) {
                referenceFunc = (state, consts) => evaluatePython(referenceCode, state, consts);
            }
        } catch (e) {
            throw(e);
        }
    })

    function consumeStdout(line) {
        if (stdoutCache) stdoutCache += '\n';
        stdoutCache += line;
    }

    function evaluatePython(code, state, consts, catchStdout=false) {
        // Create the step function from the user provided stepFuncCode using pyodide
        const suffix = '\nlambda state, consts: step(*state.to_py(), *consts.to_py())\n';
        try {
            // Catch stdout to allow print-debugging 
            stdoutCache = '';       
            if (catchStdout) {
                pyodide.setStdout({batched: consumeStdout});
            } else {
                pyodide.setStdout();
            }

            let ret = pyodide.runPython(code + suffix)(state, consts).toJs();

            if (state.length == 1 && !Array.isArray(ret[0])) {
                // If the state is a single value, we need to wrap it if it not already returned as list
                ret = [ret];
            }
            
            // Manual error handling for errors that are caused by the step function above but happen further down the line
            if (ret.length != state.length) {
                errorMsg = `Error: Wrong number of return values. Expected ${state.length}, got ${ret.length} instead.`;
            } else if (ret.some(e => Array.isArray(e) && e.length != 2)) { 
                errorMsg = `Return values are expected to be arrays of size 2.`
            } else {
                errorMsg = null;
            }
            return ret;
        } catch (e) {
            // "Automatic" error handling for errors that happen directly in the step function
            const stackTrace = e.toString();
            errorMsg = stackTrace.split('File "<exec>", ').at(-1);
            return state;
        }
    }

    $effect(() => {
        if (pyodideReady) {
            // Check updated step func code for errors
            evaluatePython(stepFuncCode, untrack(() => currentState), untrack(() => constants));
            // Set the step func to the updated code
            stepFunc = (state, consts, catchStdout=true) => evaluatePython(stepFuncCode, state, consts, catchStdout);
        }
    });
</script>

{#if stdoutCache}
    <div class="console">
        <span style="white-space: pre-line">{stdoutCache}</span>
    </div>
{/if}

{#if errorMsg}
    <div class="errorMsg">
        <span style="white-space: pre-line">{errorMsg}</span>
    </div>
{/if}

<style>
    .console {
        font-family: monospace;
        padding: 15px;
        color: white;
        background-color: #000000;
    }
    .errorMsg {
        font-family: monospace;
        padding: 15px;
        color: white;
        background-color: #d65b42;
    }
</style>
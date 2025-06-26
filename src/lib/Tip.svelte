<script>
    import TextBox from '$lib/TextBox.svelte';
    import { Lightbulb } from '@lucide/svelte';

    let {
        title=null,
        children
    } = $props();

    let unfold = $state(false);
</script>

<TextBox title={title ? 'Tipp: ' : 'Tipp'} subtitle={title} Icon={Lightbulb}>
    {@render children()}
</TextBox>
<script>
    import TextBox from '$lib/TextBox.svelte';
    import { Pencil } from '@lucide/svelte';

    let {
        title=null,
        number=null,
        children
    } = $props();

    let unfold = $state(false);
</script>

<TextBox title={'Aufgabe' + (number ? ' ' + number : '') + (title ? ': ' : '')} subtitle={title} Icon={Pencil} unfoldDefault={true} allowFold={false}>
    {@render children()}
</TextBox>
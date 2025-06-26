<script>
	let { icon } = $props();
</script>

{#if icon != null}
    {@const Icon = icon}
    <code><Icon size=14 style='margin-bottom: -2px'/></code>
{/if}
<script>
    import { T } from '@threlte/core'
    import { Vector3 } from 'three'
    import { MeshLineGeometry, MeshLineMaterial, Text } from '@threlte/extras'
    import { clamp } from '$lib/util.js'

    let {
        origin,
        zoom,
        overlay,
        overlayTransition,
        directions=[],
        labels=['v', 'a'],
        visible=true
    } = $props()

    const colors = ['#3895ff', '#f44336']
    const tipSize = $derived(10 / zoom);
    const eps = 0.01;

    const targets = $derived(directions.map((direction, i) => {
        let target = origin.clone().add(direction)
        target.y += eps * (i + 1)
        return target
    }))

    function rotateVector(dir, angle) {
        let x = dir.x * Math.cos(angle) - dir.z * Math.sin(angle);
        let z = dir.x * Math.sin(angle) + dir.z * Math.cos(angle);
        return new Vector3(x, 0, z);
    }
</script>

{#snippet arrowPart(points, color)}
    <T.Mesh>
        <MeshLineGeometry points={points} />
        <MeshLineMaterial
            width={0.003 + overlayTransition.current * 0.002}
            color={color}
        />
    </T.Mesh>  
{/snippet}
{#each targets as target, i}
    {@const color = colors[i%colors.length]}
    {@render arrowPart([origin, target], color)}
    {@render arrowPart([target.clone().add(rotateVector(directions[i].clone().normalize().multiplyScalar(tipSize), -Math.PI * 0.75)), target, target.clone().add(rotateVector(directions[i].clone().normalize().multiplyScalar(tipSize), Math.PI * 0.75))], color)}
    {#if overlayTransition.current > 0}
        {@render overlay([directions[i].x, -directions[i].z], target.toArray(), color, clamp(origin.distanceTo(target) / 2 - 0.1), labels[i] + ' = ', 0.3)}
    {/if}
{/each}
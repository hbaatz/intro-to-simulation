<script>
    import Layout from './Layout.svelte';
    import Exercise from '$lib/Exercise.svelte';
    import Icon from '$lib/Icon.svelte';
    import { ChevronRight } from '@lucide/svelte';
</script>

<Layout>
    <p>Zu berechnen, wie sich Gegenstände unter dem Einfluss physikalischer Kräfte bewegen kann sehr komplex sein. Das hast du wahrscheinlich schon im Physikunterricht festgestellt. Wirken nur einige wenige Kräfte wie zum Beispiel die Schwerkraft und Federkraft an einem Objekt, kann man mathematisch exakte Lösungen finden. Aber gerade wenn viele verschiedene Kräfte auf ein Objekt einwirken, stösst man schnell an die Grenzen von dem was man exakt berechnen kann.</p>
        
    <p>In dieser Unterrichtseinheit werden wir entdecken, wie wir den Computer dazu benutzen können, um solche Probleme approximativ zu Lösen. Wir teilen dafür die Bewegung in eine Folge von kleine Schritte auf, und schauen uns in jedem Schritt an, was gerade für Kräfte auf unseren Gegenstand wirken, und wo sie diesen hinziehen.</p>

    <p>Wir verwenden dazu eine Methode, die zwar einfach, aber in der Wissenschaft und Industrie weit verbreitet ist. Man findet sie überall, von der Spielentwicklung bis zur Simulation von Sternensystemen. Wir werden auch darauf eingehen, wann diese Methode fehlschlägt und was wir dagegen tun können.</p>

    <p>Wir werden uns langsam an diese Methode herantasten, indem wir die Fortbewegung vom kleinen Planeten Pluto physikalisch simulieren. Dabei fangen wir ganz einfach (und etwas physikalisch inkorrekt) an, und nähern uns dann Schritt für Schritt der physikalischen Wirklichkeit.</p>

    <p>Das Ziel ist dabei, dass du am Ende selbstständig Probleme aus dem Physikunterricht mit dem Computer nachbilden und simulieren kannst und ein besseres Verständnis dafür gewinnst, wie Gegenstände durch Kräfte beeinflusst werden.</p>

    <p>Und hier kommt schon eine erste kleine Aufgabe:</p>

    <Exercise title={'Navigation im Weltall-Koordinatensystem'} number={'1'}>
        Bewege das XY-Weltall-Koordinatensystem auf der rechten Seite, indem du es mit der Maus ziehst. Bewege den Mauszeiger auf Pluto, um seine Position anzuzeigen. Wenn du seine Position dauerhaft anzeigen willst, klicke mit der Maus auf Pluto.
    </Exercise>

    <p>Wenn du dich genug mit dem Koordinatensystem vertraut gemacht hast, drücke oben auf <Icon icon={ChevronRight}/> um zum nächsten Level zu gelangen!</p>
</Layout>
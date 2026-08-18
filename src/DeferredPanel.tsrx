import { useState } from 'octane';

export function DeferredPanel() @{
	const [clicks, setClicks] = useState(0);

	<section class="deferred-panel" data-testid="deferred-panel">
		<p data-testid="deferred-status">
			{clicks === 0
				? 'Deferred island is visible but dormant.'
				: `Deferred island activated: ${clicks} click${clicks === 1 ? '' : 's'}.`}
		</p>
		<button data-testid="deferred-button" onClick={() => setClicks(clicks + 1)}>
			Activate deferred island
		</button>
	</section>
}

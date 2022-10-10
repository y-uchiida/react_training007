import React, { FC } from 'react'

export const RenderingTestSampleComponent: FC = () => {
	return (
		<div>
			<h1>Test</h1>
			<input type="text" />
			<button>Button 1</button>
			<button>Button 2</button>
			<p>p element text</p>
			<span data-testid="sampleTestId">@react</span>
		</div>
	)
}

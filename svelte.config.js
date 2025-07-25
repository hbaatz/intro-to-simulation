import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	},
	optimizeDeps: {
        exclude: ["svelte-codemirror-editor", "codemirror", "@codemirror/language-javascript"],
    },
};

export default config;

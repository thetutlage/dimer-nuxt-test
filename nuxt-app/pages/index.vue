<template>
	<div>
		<h1> Welcome to Dimer guides </h1>
		<p> Following is the list of versions, you can read docs for </p>

		<ul>
			<li v-for="version in versions">
				<a :href="getUrl(version)">{{ version.no }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		methods: {
			getUrl (version) {
				return `/versions/${version.no}/${version.heroDoc.permalink}`
			}
		},

		asyncData ({ params, error }) {
			return axios.get('http://localhost:5000/versions.json')
			    .then((res) => {
			      return { versions: res.data }
			    })
			    .catch((e) => {
			      error({ statusCode: e.response.statusCode, message: e.response.data })
			    })
		}
	}
</script>
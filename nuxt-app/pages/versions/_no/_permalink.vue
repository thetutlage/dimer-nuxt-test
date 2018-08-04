<template>
	<div>
		<header>
			<input type="search" @keyup="search">
			<div v-if="results" class="searchResults">
				<div v-for="row in results">
					<h3><router-link :to="`/versions/${params.no}/${row.ref}`"><dimer-search-marks :marks="row.marks.title" /></router-link></h3>
					<p><dimer-search-marks :marks="row.marks.body" /></p>
				</div>
			</div>
		</header>


		<div class="flex">
			<aside>
				<div v-for="node in tree">
					<h4>{{ node.category }}</h4>
					<ul>
						<li v-for="doc in node.docs">
							<router-link :to="`/versions/${params.no}/${doc.permalink}`">{{ doc.title }}</router-link>
						</li>
					</ul>
				</div>
			</aside>

			<article>
				<h1>{{ doc.title }}</h1>
				<dimer-tree :nodes="doc.content.children" />
			</article>

			<div class="toc">
				<dimer-tree :nodes="toc" />			
			</div>
		</div>
	</div>
</template>

<style>
	header {
		height: 80px;
		width: 560px;
		margin: auto;
	}

	.searchResults {
	    position: absolute;
	    background: #fff;
	    top: 100px;
	    width: 400px;
	    border: 1px solid;
	    padding: 20px;
	}

	.flex {
		display: flex;
		max-width: 1240px;
		margin: auto;
	}

	aside {
		width: 300px;
	}

	.toc {
		width: 300px;
	}

	article {
		padding-left: 40px;
		max-width: 600px;
		flex: 1;
	}

	article img {
		max-width: 100%;
	}
</style>

<script>
	import axios from 'axios'
	import _ from 'lodash'

	function getTee (params) {
		return axios.get(`http://localhost:5000/versions/${params.no}.json`)
	    .then((res) => {
	      return res.data
	    })
	}

	function getDoc (params) {
		return axios.get(`http://localhost:5000/versions/${params.no}/${params.permalink}.json`)
	    .then((res) => {
	      return res.data
	    })
	}

	export default {
		data: function () {
			return {
				results: []
			}
		},

		created () {
			console.log('created')
		},

		methods: {
			search (e) {
				e.preventDefault()
				const value = e.target.value

				if (!value) {
					return
				}

				axios
					.get(`http://localhost:5000/search/${this.params.no}.json?query=${value}&limit=5`)
					.then((res) => {
						this.results = res.data
					})
					.catch(console.log)
			}
		},

		asyncData ({ params, error }) {
			return Promise.all([getTee(params), getDoc(params)])
				.then(([tree, doc]) => {
					const toc = _.remove(doc.content.children, (node) => node.tag === 'div' && node.props.className === 'toc-container')
					return { tree, doc, toc, params }
				})
			    .catch((e) => {
			      const statusCode = e.response ? e.response.statusCode : 500
			      const message = e.response ? e.response.data : e.message

			      error({ statusCode, message })
			    })
		}
	}
</script>
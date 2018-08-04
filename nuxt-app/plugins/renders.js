import Vue from 'vue'

function getTree (node, createElement) {
	if (node.type === 'text') {
		return node.value
	}

	if (node.tag === 'dimertitle') {
		return null
	}

	node.props.class = node.props.className
	delete node.props.className
	return createElement(node.tag, { attrs: node.props }, node.children.map((child) => getTree(child, createElement)))
}

Vue.component('dimerTree', {
  render (createElement) {
  	return createElement('div', this.nodes.map((node) => getTree(node, createElement)))
  },
  props: {
  	nodes: {
  		required: true
  	}
  }
})

Vue.component('dimerSearchMarks', {
	render (createElement) {
		return createElement('span', this.marks.map(({ type, text }) => {
			if (type === 'raw') {
				return text
			}

			if (type === 'mark') {
				return createElement('mark', text)
			}
		}))
	},

	props: {
		marks: {
			required: true
		}
	}
})
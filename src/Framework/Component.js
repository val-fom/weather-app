class Component {
	constructor(props) {
		this.props = props || {};
		this.state = {};

		this.host = null;

		this.updateState = this.updateState.bind(this);
	}

	updateState(nextState) {
		this.state = { ...this.state, ...nextState };
		this._render();
		// console.log(this.constructor.name + ': _state_ updated:', this.state);
		return this.state;
	}

	update(nextProps) {
		this.beforeUpdate(nextProps);
		this.props = { ...this.props, ...nextProps };
		// console.log(this.constructor.name + ': _props_ updated:', this.props);
		return this._render();
	}

	beforeUpdate() {}

	_render() {
		const children = this.render();
		this.host.innerHTML = '';

		if (typeof children === 'string') {
			this.host.innerHTML = children;
		} else if (Array.isArray(children)) {
			this.host.append(...children);
		} else {
			this.host.append(children);
		}

		return this.host;
	}

	render() {}
}

export default Component;

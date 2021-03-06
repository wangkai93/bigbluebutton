import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import styles from './styles.scss';

const propTypes = {
  overlayClassName: PropTypes.string.isRequired,
  portalClassName: PropTypes.string.isRequired,
  contentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  className: styles.modal,
  overlayClassName: styles.overlay,
  portalClassName: styles.portal,
  contentLabel: 'Modal',
  isOpen: true,
};

export default class ModalBase extends Component {
  render() {
    return (
      <ReactModal {...this.props}>
        {this.props.children}
      </ReactModal>
    );
  }
};

ModalBase.propTypes = propTypes;
ModalBase.defaultProps = defaultProps;

export const withModalState = (ComponentToWrap) =>
  class ModalStateWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: true,
      };

      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
    }

    hide(cb) {
      this.setState({ isOpen: false }, cb);
    }

    show(cb) {
      this.setState({ isOpen: false }, cb);
    }

    render() {
      return <ComponentToWrap
        {...this.props}
        modalHide={this.hide}
        modalShow={this.show}
        modalisOpen={this.state.isOpen}
      />;
    }
  };

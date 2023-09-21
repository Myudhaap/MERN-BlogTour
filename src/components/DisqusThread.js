import React from "react";
import PropTypes from "prop-types";

function renderDisqus() {
  if (window.DISQUS === undefined) {
    var script = document.createElement("script");
    var head = document.getElementsByTagName("head")[0];
    var body = document.getElementsByTagName("body")[0];
    script.async = true;
    script.type = "text/javascript";
    script.src =
      "https://" + process.env.REACT_APP_SHORTNAME + ".disqus.com/embed.js";

    (head || body).appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path
    );
  }

  componentDidMount() {
    renderDisqus();
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    let { id, title, path, ...other } = this.props;

    if (process.env.BROWSER) {
      window.disqus_shortname = process.env.REACT_APP_SHORTNAME;
      window.disqus_identifier = id;
      window.disqus_title = title;
      window.disqus_url = process.env.REACT_APP_WEBSITE_URL + path;
    }

    return <div {...other} id="disqus_thread" />;
  }
}

export default DisqusThread;

import processStructure from '@devoinc/applications-data-library/structures/graph';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const GraphWidget = dependencies.require('widgets').GraphWidget;

/**
 * The graph diagram is a theoretical representation of at least two columns
 * of a data table and the connections between their distinct values,
 * represented as nodes.
 * The data nodes can be servers, accounts, persons, events, locations, or
 * other categories. The links between nodes reflect how they are associated
 * to each other, which is very useful to analyze connections and weight
 * relationships.
 *
 * This chart is based on [KeyLines]{@link https://cambridge-intelligence.com/keylines/} library.
 *
 * @category Widgets
 * @module Graph
 * @see [base](module-base.html)
 * @see [collapser](module-collapser.html)
 * @see [dataSearch](module-dataSearch.html)
 * @see [download](module-download.html)
 * @see [info](module-info.html)
 * @see [lifeCycle](module-lifeCycle.html)
 * @see [listeners](module-listeners.html)
 * @see [loading](module-loading.html)
 * @see [menu](module-menu.html)
 * @see [screenshot](module-screenshot.html)
 * @see [zoom](module-zoom.html)
 * @tutorial widgets-graph
 */
function mixin(self) {
  self.settings.graphmodel = {};

  return {
    /**
     * Defines some visual aspects for each node to be represented.
     * @param {Object[]} types
     * @param {string} types[].name - Name of the node type.
     * @param {string} types[].color - Color for the node type.
     * @param {string} types[].palette - Palette of color to apply the node type. One of: <i>standard</i>, <i>pastel</i> or <i>monochrome</i>.
     * @instance
     */
    setTypes: (types) => (self.settings.graphmodel.types = types),

    /**
     * Set the nodes to be displayed.
     * @param {Object[]} nodes
     * @param {string[]} nodes[].links[] - Name of the nodes with which it will be linked.
     * @param {string} nodes[].name - Name of the node.
     * @param {string} nodes[].type - Name of the type to apply.
     * @instance
     */
    setNodes: (nodes) => (self.settings.graphmodel.nodes = nodes),

    /**
     * Set the attributes to display when the cursor is over the node.
     * @param {Object[]} attrs
     * @param {string} attrs.name - Atribute name.
     * @param {string} attrs.node - Name of the node to link the attribute.
     * @param {string} attrs.role - Name of the role. One of: <i>label</i>, <i>position</i>, <i>size</i> or <i>color</i>.
     * @instance
     */
    setAttrs: (attrs) => (self.settings.graphmodel.attrs = attrs),

    /**
     * Set the name of the columns to bind each node with its value
     * @param {string[]} link
     * @default ['count']
     * @instance
     */
    setLinkWidthDeltaColumns(link) {
      self.settings.graphmodel.LinkWidthDeltaColumns = link;
    },

    /**
     * Set the type of nodes.
     * @param {Object[]} fields
     * @param {string} fields.name - Column name.
     * @param {string} fields.type - Data type.
     * @instance
     */
    setFields(fields) {
      self.settings.graphmodel.fields = fields;
    },

    /**
     * Set initial value for node sizes.
     *
     * The following values are supported:
     * - <b>links-all-sum</b>: Sum of all links.
     * - <b>links-all-avg</b>: Average of all links.
     * - <b>links-all-max</b>: Max of all links.
     * - <b>links-all-min</b>: Min of all links.
     * - <b>links-all-flux</b>: Flux value.
     * - <b>links-incoming-sum</b>:  Sum of incoming links.
     * - <b>links-incoming-avg</b>: Average of incoming links.
     * - <b>links-incoming-max</b>: Max of incoming links.
     * - <b>links-incoming-min</b>: Min of incoming links.
     * - <b>links-outgoing-sum</b>: Sum of outgoing links.
     * - <b>links-outgoing-avg</b>: Average of outgoing links.
     * - <b>links-outgoing-max</b>: Max of outgoing links.
     * - <b>links-outgoing-min</b>: Min of outgoing links.
     * - <b>graph-betweenness</b>: Betweenness.
     * - <b>graph-closeness</b>: Closeness.
     * - <b>graph-eigenCentrality</b>: Eigencentrality.
     * - <b>graph-pageRank</b>: Page rank.
     * @param {string} attr - Initial mode of the size.
     * @instance
     */
    setNodeSizesInitialMode: (attr) =>
      (self.settings.nodeSizesInitialMode = attr),

    // Life Cycle
    // ---------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render(orig) {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign({}, self.settings);
      const children = document.createElement('div');
      children.style.width = '100%';
      children.style.height = '100%';
      self.el.querySelector('.lt-vapp-widget-graphic').append(children);
      cfg.dom = children;
      self.widget = new GraphWidget(cfg);
      let data = null;
      data = processStructure(orig, self);

      if (data) {
        self.widget.setData(data);
        self.widget.display({
          force: true,
          data: true,
        });
      } else {
        this.debugError({
          msg: 'NO DATA',
          console: {
            method: 'error',
            msg: 'No data arrive to render function',
          },
        });
      }
    },
  };
}

export default widgetFactory(mixin);

/**
 * @category Data
 * @class DataNode
 * This class stores keys-values pairs and allows to subscribe for any
 * changes of this data.
 */
class DataNode {
  // Constructor
  constructor(id, parent = null) {
    this.id = id;
    this.data = {};
    this.children = [];
    this.parent = parent;
    this.observers = {};
  }

  /**
   * Append a DataNode to this DataNode.
   * @param {DataNode} node - DataNode to append.
   */
  append(node) {
    node.parent = this;
    this.children.push(node);
    return node;
  }

  /**
   * Set property to the node.
   * @param {...args} key - It accepts 2 parameters with key and value
   * or an array with objects.
   */
  set(...args) {
    if (!Array.isArray(args[0])) {
      this._setObserver(args[0], args[1]);
    } else {
      for (let i = args[0].length; i--; ) {
        this._setObserver(args[0][i].key, args[0][i].val);
      }
    }
  }

  /**
   * Get the value for key, if not exists go to parent node to get it until
   * root node.
   * @param {string} key
   * @param {*} defaultValue - Default value.
   */
  get(key, defaultValue = null) {
    if (this.data[key] !== undefined) return this.data[key];
    else {
      if (this.parent) return this.parent.get(key);
      return defaultValue;
    }
  }

  /**
   * Find a children DataNode by the id.
   * @param {string} id - Id of the DataNode.
   */
  find(id) {
    let node = null;
    for (let child of this.children) {
      if (child.id === id) node = child;
      else node = child.find(id);
    }
    return node;
  }

  /**
   * Subscribe function to property.
   * @param {string} prop - Property to subscribe.
   * @param {function} func - Function to launch.
   */
  subscribe(prop, func) {
    if (this.observers[prop]) this.observers[prop].push(func);
    else this.observers[prop] = [func];
  }

  /**
   * Set an observer given a key and a value.
   * @param {string} key - Property name.
   * @param {*} val - Value of the property.
   */
  _setObserver(key, val) {
    const prev = this.data[key];
    this.data[key] = val;

    // Trigger all subscribed functions
    if (this.observers[key]) {
      for (let func of this.observers[key]) {
        func(val, prev, key, this);
      }
    }
  }
  // TODO unsubscribe
}

export default DataNode;

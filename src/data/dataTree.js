import DataNode from './DataNode';

/**
 * @category Data
 * @class
 * This class is a tree structure that contains in its nodes different
 * components of the application. Each node is a [DataNode](DataNode.html) class.
 */
class DataTree {
  // Constructor
  constructor() {
    this.root = new DataNode('lt-vapp');
  }

  /**
   * Get a DataNode by the id.
   * @param {string} id - Id of the DataNode.
   */
  getNode(id) {
    return this.root.find(id);
  }
}

// Singleton
export default new DataTree();

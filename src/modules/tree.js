import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    const sortedArray = this.mergeSort(array);
    this.root = this.buildTree(sortedArray);
  }

  mergeSort(array) {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);

    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else if (left[leftIndex] > right[rightIndex]) {
        result.push(right[rightIndex]);
        rightIndex++;
      } else {
        //Handle duplicates: push only one and ignore other
        result.push(left[leftIndex]);
        leftIndex++;
        rightIndex++;
      }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  includes(value, node = this.root) {
    if (node === null) {
      return false;
    }

    if (value === node.data) {
      return true;
    }

    if (value < node.data) {
      return this.includes(value, node.left);
    } else {
      return this.includes(value, node.right);
    }
  }

  insert(value, node = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    if (node === null) {
      return new Node(value);
    }

    if (value === node.data) {
      return;
    }

    if (value < node.data) {
      return this.insert(value, node.left);
    } else {
      return this.insert(value, node.right);
    }
  }

  deleteItem(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      //Node has no children or only one child
      if (node.left === null) {
        if (node === this.root) {
          this.root = node.right;
        }
        return node.right;
      } else if (node.right === null) {
        if (node === this.root) {
          this.root = node.left;
        }
        return node.left;
      }

      //Node has two children
      //Set node value to smallest value in right sub-tree
      node.data = this.#minValue(node.right);

      //Delete duplicate value from right sub-tree
      node.right = this.deleteItem(node.data, node.right);
    }

    return node;
  }

  #minValue(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }

    return min;
  }

  levelOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    if (node === null) {
      return;
    }

    let queue = [];
    queue.push(node);

    while (queue.length !== 0) {
      let current = queue.shift();
      callback(current.data);

      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    if (node === null) {
      return;
    }

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    if (node === null) {
      return;
    }

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    if (node === null) {
      return;
    }

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  height(value) {
    let current = this.root;

    while (current !== null && current.data !== value) {
      current = value < current.data ? current.left : current.right;
    }

    if (current === null) {
      return undefined;
    }

    const calculateHeight = (node) => {
      if (node === null) {
        return -1;
      }

      return (
        Math.max(calculateHeight(node.left), calculateHeight(node.right)) + 1
      );
    };

    return calculateHeight(current);
  }

  depth(value, node = this.root, count = 0) {
    if (node === null) {
      return undefined;
    }

    if (value === node.data) {
      return count;
    }

    if (value < node.data) {
      return this.depth(value, node.left, count + 1);
    } else {
      return this.depth(value, node.right, count + 1);
    }
  }

  isBalanced(node = this.root) {
    const checkHeight = (current) => {
      if (current === null) {
        return 0;
      }

      let left = checkHeight(current.left);
      //Left sub-tree is unbalanced
      if (left === -1) {
        return -1;
      }

      let right = checkHeight(current.right);
      //Right sub-tree is unbalanced
      if (right === -1) {
        return -1;
      }

      if (Math.abs(left - right > 1)) {
        //Current node is unbalanced
        return -1;
      }

      return Math.max(left, right) + 1;
    };

    return checkHeight(node) !== -1;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

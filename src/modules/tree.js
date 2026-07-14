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

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

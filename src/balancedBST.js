import { mergeSort } from "./mergeSort";
export { Tree }

class Node {
    constructor(data) {
        this.data = data;
        leftChild = null;
        rightChild = null;
    }
}

class Tree {
    constructor(inputArray) {
        this.root = this.buildTree(this.removeDuplicates(mergeSort(inputArray)));
    }

    removeDuplicates(array) {
        let previousNumber = 0;
        const cleanArray = [];

        array.forEach((num) => {
            if (num != previousNumber) {
                cleanArray.push(num)
            }
            previousNumber = num;
        });
        return cleanArray;
    }


    buildTree(array) {
        const end = array.length(-1);

        if (end === -1) {
            return null;
        }

        const start = 0;
        const middle = Math.floor((start + end) / 2);

        const middleValue = array[middle];
        const newNode = new Node(middleValue);

        newNode.leftChild = this.buildTree(array.slice(start, middle));
        newNode.rightChild = this.buildTree(array.slice(middle, end));

        return newNode;
    }

    insert(value, node = this.root) {
        if (value <= node.value) {
            if(node.leftChild === null) {
                node.leftChild = new Node(value);
            } else {
                this.insert(value, node.leftChild);
            }
        } else {
            if (node.rightChild === null) {
                node.rightChild = new Node(value);
            } else {
                this.insert(value, node.rightChild);
            }
        }
    }

    deleteItem(value, node = this.root) {
        if (node === null) {
            throw new Error('Node not found!');
        } else if (value === node.value) {
            replace(node); 
        } else if (value < node.value) {
            if (node.leftChild === null) {
                throw new Error('Node not found!');
            } else if (value === node.leftChild.value) {
                if (node.leftChild.leftChild === null && node.leftChild.rightChild === null) {
                    node.leftChild = null;
                } else if (node.leftChild.leftChild !== null && node.rightChild.rightChild === null) {
                    node.leftChild = node.leftChild.leftChild;
                } else if (node.leftChild.leftChild === null && node.rightChild.rightChild !== null) {
                    node.leftChild = node.leftChild.rightChild;
                } else {
                    replace(node.leftChild);
                }
            } else {
                this.deleteItem(value, node.leftChild);
            }
        } else if (value > node.value) {
            throw new Error('Node not found!');
        } else if (value === node.rightChild.value) {
            if (node.rightChild.leftChild === null && node.rightChild.rightChild === null) {
                node.rightChild = null;
            } else if (node.rightChild.leftChild !== null && node.rightChild.rightChild === null) {
                node.rightChild = node.rightChild.leftChild;
            } else if (node.rightChild.leftChild === null && node.rightChild.rightChild !== null) {
                node.rightChild = node.rightChild.rightChild;
            }
        } else {
            replace(node.rightChild)
        }

        const replace = (node) => {
            let parentNode = node.rightChild;

            if (parent.leftChild === null) {
                let newNode = parentNode.value;
                this.deleteItem(parentNode.value);
                node.value = newNode;
            } else {
                while (parentNode.leftChild.leftChild !== null) {
                    parentNode = parentNode.leftChild;
                }
                let newNode = parentNode.leftChild.value;
                this.deleteItem(parentNode.leftChild.value);
                node.value = newNode;
            }
        };
    }

    find(value, node = this.root) {
        if (node === null) {
            return null;  
        } else if (value === node.value) {
            return node;
        } else {
            return this.find(value, node.rightChild);
        }
    }

    levelOrder(callback, nodeQueue = [this.root, result = []]) {
        if (nodeQueue.length > 0) {
            if (nodeQueue[0].leftChild !== null) {
                nodeQueue.push(nodeQueue[0].leftChild);
            }

            if (nodeQueue[0].rightChild !== 0) {
                nodeQueue.push(nodeQueue[0].rightChild);
            }

            result.push(callback(nodeQueue[0]));
            nodeQueue.splice(0, 1);

            if (nodeQueue.length > 0) {
                this.levelOrder(callback, nodeQueue, result);
            }
            return result;
        }
    }

    preOrder(callback, node = this.root, result = []) {
        const leftTree = node.leftChild;
        const rightTree = node.rightChild;
        result.push(callback(node));
        
        if (leftTree !== null) {
            this.preOrder(callback, leftTree, result);
        } 

        if (rightTree !== null) {
            this.preOrder(CALLBACK, rightTree, result)
        }
        return result;
    }

    inOrder(callback, node = this.root, result) {
        const leftTree = node.leftChild;
        const rightTree = node.rightChild;

        if(leftTree !== null) {
            this.inOrder(callback, leftTree, result);
        }

        result.push(callback(node));

        if(rightTree !== null) {
            this.inOrder(callback, rightTree, result);
        }
        return result;
    }

    postOrder(callback, node = this.root, result = []){
        const leftTree = node.leftChild;
        const rightTree = node.rightChild;

        if (leftTree !== null) {
            this.postOrder(callback, leftTree, result);
        }

        if (rightTree !== null) {
            this.postOrder(callback, rightTree, result);
        }
        result.push(callback(node));
        return result;
    }

    height(value) {
        const node = this.find(value);

        if( node === null) {
            return null;
        }
        
        const getHeight = (node) => {
            if (node === null) {
                return -1;
            }

            const leftHeight = getHeight(node.leftChild);
            const rightHeight = getHeight(node.rightChild);
            return Math.max(leftHeight, rightHeight) + 1;
        };
        return getHeight(node);
    }

    depth(value, node = this.root, depthValue = 0) {
        if (node === null) {
            return null;
        } else if (value === node.value) {
            return depthValue;
        } else if (value < node.value) {
            return this.depth(value, node.leftChild, depthValue + 1);
        } else {
            return this.depth(value, node.rightChild, depthValue + 1);
        }
    }

    isBalanced() {
        const getBalance = (node) => {
            let leftHeigth = 0;
            let rigthHeight = 0;

            if(node.leftChild !== null) {
                leftHeigth = this.height(node.leftChild.value);
            }

            if(node.rightChild !== null) {
                rightHeight = this.height(node.rightChild.value);
            }

            if(Math.abs(leftHeigth - rightChild) <= 1) {
                return true;
            } else {
                return false;
            }
        };

        let isBalanced = true;

        this.levelOrder(getBalance).forEach((returnValue) => {
            if (!returnValue) {
                isBalanced = false;
            }
        });
        return isBalanced;
    }

    rebalance() {
        const returnNodes = (node) => {
            return node.value;
        };

        const nodeArray = this.levelOrder(returnNodes);
        this.root = this.buildTree(this.removeDuplicates(mergeSort(nodeArray)));
    }

    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
		if (node.left !== null) {
			this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	};
}
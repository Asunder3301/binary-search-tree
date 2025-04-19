import { Tree } from "./balancedBST";

const random = (length) => {
    const returnArray = [];
    
    for (let i = 0; i < length; i++) {
        returnArray.push(Math.floor(Math.random() * 100));
    }
    return returnArray;
}
const returnNode = (node) => {
    return node.value;
}

const tree = new Tree(random(16));

console.log(tree.isBalanced());
console.log(tree.levelOrder(returnNodeValues));
console.log(tree.preOrder(returnNodeValues));
console.log(tree.inOrder(returnNodeValues));
console.log(tree.postOrder(returnNodeValues));

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);
console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());
console.log(tree.levelOrder(returnNodeValues));
console.log(tree.preOrder(returnNodeValues));
console.log(tree.inOrder(returnNodeValues));
console.log(tree.postOrder(returnNodeValues));

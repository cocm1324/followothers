class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    add(data) {
        const node = this.root;
        if(node === null) {
            this.root = new Node(data);
            return;
        }
        else {
            const searchTree = function(node) {
                if(data < node.data) {
                    if(node.left === null) {
                        node.left = new Node(data);
                        return;
                    }
                    else if(node.left !== null) {
                        return searchTree(node.left);
                    }
                }
                else if (data > node.data) {
                    if(node.right === null){
                        node.right = new Node(data);
                        return;
                    }
                    else if(node.right !== null) {
                        return searchTree(node.right);
                    }
                }
                else {
                    return null;
                }
            }
            return searchTree(node);
        }
    }
    findMin() {
        let current = this.root;
        while(current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    findMax() {
        let current = this.root;
        while(current.right !== null) {
            current = current.right;
        }
        return current.data;
    }
    find(data) {
        let current = this.root;
        while(current.data !== data) {
            if(data < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
            if(current === null) {
                return null;
            }
        }
        return current;
    }
    isPresent(data) {
        let current = this.root;
        while(current) {
            if(current === data) {
                return true;
            }
            if(data < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return false;
    }
    remove(data) {
        const removeNode = function(node, data) {
            if(node == null) {
                return null;
            }
            if(data == node.data) {
                if(node.left == null && node.right == null) {
                    return null;
                }

                if(node.left == null) {
                    return node.right;
                }

                if(node.right == null) {
                    return node.left;
                }

                var tempNode = node.right;
                while(tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;
            }
            else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            }
            else {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.root = removeNode(this.root, data);
    }

    // height and traversal

    // height
    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1);
    }
    findMinHeight(node = this.root) {
        if(node == null) {
            return -1;
        }
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);

        if(left < right) {
            return left + 1;
        }
        else {
            return right + 1;
        }
    }
    findMinHeight(node = this.root) {
        if(node == null) {
            return -1;
        }
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);

        if(left > right) {
            return left + 1;
        }
        else {
            return right + 1;
        }
    }

    // traversal
    inOrder() {
        if(this.root == null) {
            return null;
        }
        else {
            var result = new Array();
            function traversInOrder(node) {
                node.left && traversInOrder(node.left); // -> &&는 short circuit evaluation 오퍼레이터이다 만약 &&것이 true이면 &&뒤의 것을 실행함
                result.push(node.data);
                node.right && traversInOrder(node.right);
            }
            traversInOrder(this.root);
            return result;
        }
    }

    preOrder() {
        if(this.root == null) {
            return null;
        }
        else {
            var result = new Array();
            function traversPreOrder(node) {
                result.push(node.data);
                node.left && traversPreOrder(node.left); // -> &&는 검사 오퍼레이터이다 만약 &&것이 true이면 &&뒤의 것을 실행함
                node.right && traversPreOrder(node.right);
            }
            traversPreOrder(this.root);
            return result;
        }
    }


    // https://youtu.be/t2CEgPsws3U?t=3005


}

const bst = new BST();

// bst.add(4);
// bst.add(2);
// bst.add(6);
// bst.add(1);
// bst.add(3);
// bst.add(5);
// bst.add(7);
// bst.remove(4);
// console.log(bst.findMin());
// console.log(bst.findMax());
// bst.remove(7);
// console.log(bst.findMax());
// console.log(bst.isPresent(4));

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);


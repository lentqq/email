var S = require('string');

exports.distributeProportionally = function(orders, value, sym){
  var totalPrice = 0;
  for (var i = 0; i < orders.length; i++) {
    totalPrice += orders[i].price;
  }
  for (var i = 0; i < orders.length; i++) {
    orders[i][sym] = value * orders[i].price / totalPrice;
  }
}

exports.getBottomNodes = function(nodes){
  var out = [];
  nodes.each(function(location){
    var node = nodes[location];
    var isBottom = true;
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {

        if('text' != node.children[i].type)
          isBottom = false;
      }
    } else { // TODO this is a bug, change and test thoroughly
      isBottom = false;
    }
    if (isBottom) {
      out.push(node);
    }
  });
  return out;
}


exports.climbUpTo = function(node, type){
  var n = node;
  while(n && n.parent && n.name != type){
    n = n.parent;
  }
  return n;
}

exports.getNext = function(node, type){
  var n = node.next;
  while(n && n.next && n.name != type){
    n = n.next;
  }
  return n;
}

exports.getChildOfType = function(node, type, id){
  var n = node;
  var childrenOfType = n.children.filter(function(tag){
    return type == tag.name;
  });
  return childrenOfType[id];
}

exports.getTextChild = function(node, id){
  var n = node;
  var childrenOfType = n.children.filter(function(tag){
    return 'text' == tag.type;
  });
  return childrenOfType[id];
}
